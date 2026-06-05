// In-memory rate limiting cache (per V8 isolate)
const ipCache = new Map();
const RATE_LIMIT_WINDOW_MS = 30000; // 30 seconds cooldown

function cleanupCache() {
  const now = Date.now();
  for (const [ip, timestamp] of ipCache.entries()) {
    if (now - timestamp > RATE_LIMIT_WINDOW_MS) {
      ipCache.delete(ip);
    }
  }
}

// Basic input sanitization (strips HTML tags to prevent XSS in email previewers)
function sanitize(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/<[^>]*>/g, '').trim();
}

// Basic email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function onRequestPost(context) {
  const { request } = context;

  // 1. Size Validation (Reject payloads > 10KB)
  const contentLength = request.headers.get("content-length");
  if (contentLength && parseInt(contentLength, 10) > 10240) {
    return new Response(
      JSON.stringify({ success: false, message: "Payload too large" }),
      { status: 413, headers: { "Content-Type": "application/json" } }
    );
  }

  const bodyText = await request.text();
  if (bodyText.length > 10240) {
    return new Response(
      JSON.stringify({ success: false, message: "Payload too large" }),
      { status: 413, headers: { "Content-Type": "application/json" } }
    );
  }

  // 2. IP Rate Limiting (Reject requests faster than 1 per 30 seconds)
  const clientIP = request.headers.get("CF-Connecting-IP") || "127.0.0.1";
  const now = Date.now();
  const lastRequestTime = ipCache.get(clientIP);

  if (lastRequestTime && now - lastRequestTime < RATE_LIMIT_WINDOW_MS) {
    return new Response(
      JSON.stringify({ success: false, message: "Too many requests. Please try again in 30 seconds." }),
      { status: 429, headers: { "Content-Type": "application/json" } }
    );
  }

  // Record request timestamp and cleanup old cache entries
  ipCache.set(clientIP, now);
  if (ipCache.size > 1000) {
    cleanupCache();
  }

  // 3. Payload Parsing
  let data;
  try {
    data = JSON.parse(bodyText);
  } catch (e) {
    return new Response(
      JSON.stringify({ success: false, message: "Invalid JSON payload" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
  // 3.5. Spam Protection Verification (Cloudflare Turnstile)
  const turnstileSecret = (context.env && context.env.TURNSTILE_SECRET_KEY) || "1x00000000000000000000000000000000AA";
  const turnstileToken = data.turnstileToken;

  if (!turnstileToken) {
    console.warn("Rejection: Turnstile token is missing from request payload.");
    return new Response(
      JSON.stringify({ success: false, message: "Turnstile token is missing" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const verifyResponse = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        secret: turnstileSecret,
        response: turnstileToken
      })
    });

    const verifyResult = await verifyResponse.json();
    if (!verifyResult.success) {
      console.error("Turnstile siteverify validation failed. Result:", verifyResult);
      return new Response(
        JSON.stringify({ success: false, message: "Turnstile verification failed" }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    console.error("Error communicating with Cloudflare Turnstile verify API:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Spam verification service error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
  // 4. Input Sanitization
  const name = sanitize(data.name);
  const email = sanitize(data.email);
  const message = sanitize(data.message);

  // 5. Input Validation
  if (!name) {
    return new Response(
      JSON.stringify({ success: false, message: "Name is required" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  if (!email || !EMAIL_REGEX.test(email)) {
    return new Response(
      JSON.stringify({ success: false, message: "A valid email address is required" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  if (!message || message.length < 20) {
    return new Response(
      JSON.stringify({ success: false, message: "Message must be at least 20 characters long" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  // 6. Resend API Keys Resolution
  // Read Resend API key from Cloudflare env variables or Node fallback process.env
  const apiKey = (context.env && context.env.RESEND_API_KEY) || (typeof process !== 'undefined' && process.env.RESEND_API_KEY);
  if (!apiKey) {
    console.error("Missing RESEND_API_KEY environment variable.");
    return new Response(
      JSON.stringify({ success: false, message: "Server configuration error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  // 7. Dispatch Email via Resend
  try {
    const receiverEmail = (context.env && context.env.CONTACT_RECEIVER_EMAIL) || "prasant@metaroy.com";

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Contact Form <onboarding@resend.dev>",
        to: receiverEmail,
        subject: `New Inquiry from ${name}`,
        reply_to: email,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      }),
    });

    if (resendResponse.ok) {
      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } else {
      const errorText = await resendResponse.text();
      console.error(`Resend API request failed with status ${resendResponse.status}:`, errorText);
      
      let errorMessage = "Unable to send message";
      try {
        const resendError = JSON.parse(errorText);
        if (resendError.message) {
          errorMessage = `Resend API: ${resendError.message}`;
        }
      } catch (e) {
        if (resendResponse.status === 403) {
          errorMessage = "Resend API: Sandbox verification limits or credentials invalid (403)";
        }
      }

      return new Response(
        JSON.stringify({ success: false, message: errorMessage }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    console.error("Error connecting to Resend API:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Unable to send message" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
