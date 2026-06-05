import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { trackEvent } from '../utils/analytics';

const TOPICS = [
  { id: 'Growth Systems', icon: '🚀', label: 'Growth Systems' },
  { id: 'AI & Automation', icon: '🤖', label: 'AI & Automation' },
  { id: 'Product & Innovation', icon: '🛠', label: 'Product & Innovation' },
  { id: 'Advisory & Leadership', icon: '📈', label: 'Advisory & Leadership' }
];

// Single Social Link Component with underline and arrow reveal
function SocialLink({ name, url }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <a
      href={url}
      onClick={() => trackEvent('social_click', { social_platform: name, url: url })}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative text-[10px] sm:text-xs tracking-widest uppercase text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors duration-300 py-2 flex items-center gap-1.5 group select-none font-mono"
    >
      <span>{name}</span>
      
      {/* Sliding/Rotating diagonal arrow */}
      <span className="inline-block relative overflow-hidden w-3 h-3">
        <motion.span
          animate={isHovered ? { y: 0, x: 0, opacity: 1 } : { y: 8, x: -8, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 text-[10px] font-mono"
        >
          ↗
        </motion.span>
      </span>

      {/* Animating Underline bar */}
      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-neutral-200 dark:bg-neutral-900" />
      <motion.span
        initial={{ scaleX: 0 }}
        animate={isHovered ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 left-0 w-full h-[1px] bg-neutral-900 dark:bg-white origin-left"
        style={{
          boxShadow: '0 0 6px var(--social-underline-glow, #ffffff)'
        }}
      />
    </a>
  );
}

// Manifesto Section with scroll-triggered staggered reveal
function Manifesto() {
  const lines = [
    "Engineer.",
    "Growth Strategist.",
    "AI Builder.",
    "Continuous Learner."
  ];

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <div ref={containerRef} className="mt-32 md:mt-48 text-center select-none max-w-4xl mx-auto">
      <div className="space-y-4 md:space-y-6">
        {lines.map((line, idx) => (
          <motion.div
            key={line}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: idx * 0.2, ease: [0.16, 1, 0.3, 1] }}
            className={`text-3xl sm:text-5xl md:text-6xl font-light tracking-tight leading-none ${
              idx === 3 
                ? 'text-gradient-silver font-medium' 
                : 'text-neutral-400 dark:text-neutral-500'
            }`}
          >
            {line}
          </motion.div>
        ))}
      </div>

      {/* Subtext reveal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.0, delay: lines.length * 0.2 + 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="mt-12 text-xs sm:text-sm font-light text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto leading-relaxed"
      >
        "Building systems that scale people, products, and possibilities."
      </motion.div>
    </div>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    topic: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'success'
  });

  // Auto-dismiss toast notification after 5 seconds
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast(prev => ({ ...prev, show: false }));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  // Handles pre-populating a clean "Subject line" in the message box when a topic is chosen
  const handleSelectTopic = (topicId) => {
    setFormData(prev => {
      let currentMessage = prev.message;
      
      // Regular expression to strip any previous auto-generated subject line
      const subjectPattern = /^Subject: Collaboration for [^\n]+\n\n/;
      currentMessage = currentMessage.replace(subjectPattern, '');

      // Prepends the new subject line to the message field if a topic is selected
      const newSubjectLine = topicId ? `Subject: Collaboration for ${topicId}\n\n` : '';
      
      return {
        ...prev,
        topic: topicId,
        message: `${newSubjectLine}${currentMessage}`
      };
    });
  };

  const validateForm = () => {
    const tempErrors = {};
    if (!formData.name.trim()) {
      tempErrors.name = 'Full Name is required';
    }
    
    if (!formData.email.trim()) {
      tempErrors.email = 'Email Address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      tempErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      tempErrors.message = 'Message content is required';
    } else if (formData.message.replace(/^Subject: Collaboration for [^\n]+\n\n/, '').trim().length < 20) {
      tempErrors.message = 'Message must be at least 20 characters';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim()
        })
      });

      let result = {};
      try {
        result = await response.json();
      } catch (e) {
        // Fallback for HTML parsing errors (like a 500/530 error page from Cloudflare)
      }

      if (response.ok && result.success) {
        setToast({
          show: true,
          message: "Thank you for reaching out. I'll get back to you shortly.",
          type: 'success'
        });
        setFormData({ name: '', email: '', topic: '', message: '' });
        setErrors({});
        trackEvent('contact_form_submit', { success: true, topic: formData.topic || 'General' });
      } else {
        setToast({
          show: true,
          message: result.message || "Unable to send message",
          type: 'error'
        });
        trackEvent('contact_form_submit', { success: false, error: result.message || 'Submission failure' });
      }
    } catch (error) {
      setToast({
        show: true,
        message: "Unable to send message",
        type: 'error'
      });
      trackEvent('contact_form_submit', { success: false, error: 'Network error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative min-h-screen py-24 md:py-32 px-6 border-b border-neutral-200 dark:border-neutral-900/60 z-10 overflow-hidden">
      
      {/* Background radial highlight glow */}
      <div className="absolute bottom-[20%] left-[50%] -translate-x-1/2 w-[600px] h-[300px] bg-neutral-300/10 dark:bg-neutral-900/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Floating Alert Toast Notification */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed bottom-8 right-6 md:right-12 z-[100] px-6 py-4 rounded-2xl shadow-2xl border backdrop-blur-md flex items-center gap-4 max-w-sm ${
              toast.type === 'success'
                ? 'bg-neutral-900/95 dark:bg-white/95 border-neutral-800 dark:border-neutral-200 text-white dark:text-neutral-900'
                : 'bg-red-50/95 dark:bg-red-950/90 border-red-200/60 dark:border-red-900/50 text-red-900 dark:text-red-200'
            }`}
          >
            <div className="flex-1 flex flex-col gap-0.5">
              <span className="text-xs font-semibold tracking-wider uppercase font-mono opacity-60">
                {toast.type === 'success' ? 'Success' : 'Alert'}
              </span>
              <p className="text-xs font-light leading-relaxed">{toast.message}</p>
            </div>
            <button
              onClick={() => setToast(prev => ({ ...prev, show: false }))}
              className="text-[10px] font-mono uppercase tracking-widest font-semibold opacity-60 hover:opacity-100 transition-opacity ml-2 self-start pt-0.5 cursor-pointer"
            >
              [Dismiss]
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto w-full flex flex-col justify-between min-h-[calc(100vh-120px)]">
        
        {/* Responsive Grid: side-by-side on desktop, vertical stacked on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center w-full">
          
          {/* Left Column: Header (Headline & Description) */}
          <div className="lg:col-span-6 select-none w-full mb-8 lg:mb-0">
            <span className="text-[10px] tracking-[0.35em] text-neutral-500 uppercase font-semibold block mb-3">
              06 // Connection
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-neutral-900 dark:text-white mb-6 leading-tight">
              Let's Build <span className="text-gradient-silver font-medium block sm:inline lg:inline">Something Beyond.</span>
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 font-light text-sm sm:text-base leading-relaxed">
              Whether you're scaling growth, implementing AI, building a product, or exploring new opportunities, send a message to start a conversation.
            </p>
          </div>

          {/* Right Column: Contact Form */}
          <div id="contact-form" className="lg:col-span-6 w-full">
            <form 
              onSubmit={handleSubmit}
              className="glass-panel p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border border-neutral-200 dark:border-neutral-900 bg-white/20 dark:bg-neutral-950/20 backdrop-blur-md shadow-lg flex flex-col gap-5"
            >
              {/* Form Header */}
              <div className="border-b border-neutral-200 dark:border-neutral-900 pb-3 mb-1 select-none">
                <h3 className="text-base font-medium text-neutral-950 dark:text-white">
                  Send a Message
                </h3>
              </div>

              {/* Grid: Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase select-none">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    disabled={isSubmitting}
                    placeholder="Your name"
                    className="w-full bg-neutral-100/50 dark:bg-neutral-955/40 border border-neutral-200 dark:border-neutral-900 focus:border-neutral-500 dark:focus:border-neutral-400 rounded-xl px-4 py-2.5 text-xs sm:text-sm transition-all outline-none text-neutral-955 dark:text-white font-light placeholder:text-neutral-400 dark:placeholder:text-neutral-600"
                  />
                  {errors.name && (
                    <span className="text-[9px] text-red-500 font-mono mt-0.5">{errors.name}</span>
                  )}
                </div>

                {/* Email Address */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase select-none">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    disabled={isSubmitting}
                    placeholder="E.g., name@domain.com"
                    className="w-full bg-neutral-100/50 dark:bg-neutral-955/40 border border-neutral-200 dark:border-neutral-900 focus:border-neutral-500 dark:focus:border-neutral-400 rounded-xl px-4 py-2.5 text-xs sm:text-sm transition-all outline-none text-neutral-955 dark:text-white font-light placeholder:text-neutral-400 dark:placeholder:text-neutral-600"
                  />
                  {errors.email && (
                    <span className="text-[9px] text-red-500 font-mono mt-0.5">{errors.email}</span>
                  )}
                </div>
              </div>

              {/* Inquiry Topic Selector Pills */}
              <div className="flex flex-col gap-2.5">
                <label className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase select-none">
                  Inquiry Topic (Optional)
                </label>
                <div className="flex flex-wrap gap-2">
                  {TOPICS.map((topic) => {
                    const isSelected = formData.topic === topic.id;
                    return (
                      <button
                        key={topic.id}
                        type="button"
                        disabled={isSubmitting}
                        onClick={() => handleSelectTopic(isSelected ? '' : topic.id)}
                        className={`text-[10px] sm:text-xs px-3.5 py-1.5 rounded-full border transition-all duration-300 cursor-pointer select-none font-mono font-medium ${
                          isSelected
                            ? 'bg-neutral-950 text-white border-neutral-950 dark:bg-white dark:text-neutral-950 dark:border-white shadow-sm'
                            : 'border-neutral-200 dark:border-neutral-900 text-neutral-500 hover:text-neutral-900 dark:hover:text-white bg-transparent'
                        }`}
                      >
                        <span className="text-sm">{topic.icon}</span>
                        <span className="ml-1">{topic.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Message Content */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center select-none">
                  <label className="text-[9px] font-mono tracking-widest text-neutral-500 uppercase">
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <span className={`text-[9px] font-mono ${
                    formData.message.replace(/^Subject: Collaboration for [^\n]+\n\n/, '').trim().length < 20 ? 'text-neutral-500' : 'text-emerald-500 font-semibold'
                  }`}>
                    {formData.message.replace(/^Subject: Collaboration for [^\n]+\n\n/, '').trim().length} / 20 chars min
                  </span>
                </div>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  disabled={isSubmitting}
                  placeholder="Tell me about your project, timelines, and ideas..."
                  rows={4}
                  className="w-full bg-neutral-100/50 dark:bg-neutral-955/40 border border-neutral-200 dark:border-neutral-900 focus:border-neutral-500 dark:focus:border-neutral-400 rounded-xl px-4 py-2.5 text-xs sm:text-sm transition-all outline-none text-neutral-950 dark:text-white font-light placeholder:text-neutral-400 dark:placeholder:text-neutral-600 resize-y"
                />
                {errors.message && (
                  <span className="text-[9px] text-red-500 font-mono mt-0.5">{errors.message}</span>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 font-semibold tracking-widest uppercase text-[10px] hover:opacity-90 active:scale-[0.985] transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 cursor-pointer shadow-md dark:shadow-none"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-3.5 w-3.5 text-white dark:text-neutral-950" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending Message...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Stage 2: Manifesto block */}
        <Manifesto />

        {/* Social Layer Minimalist Footer */}
        <div className="mt-32 pt-12 border-t border-neutral-200 dark:border-neutral-950 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="text-[9px] font-mono text-neutral-500 dark:text-neutral-600 uppercase tracking-widest select-none">
            Digital coordinates
          </div>
          
          <div className="flex items-center space-x-6 sm:space-x-10">
            <SocialLink name="LinkedIn" url="https://www.linkedin.com/in/prasant-roy" />
            <SocialLink name="GitHub" url="https://github.com/imetaroy" />
            <SocialLink name="X / Twitter" url="https://x.com/iamprasantroy" />
          </div>
        </div>

      </div>
    </section>
  );
}
