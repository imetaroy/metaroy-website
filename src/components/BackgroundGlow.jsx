import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function BackgroundGlow() {
  const glowRef = useRef(null);
  const ambient1Ref = useRef(null);
  const ambient2Ref = useRef(null);
  const ambient3Ref = useRef(null);
  const ambient4Ref = useRef(null);

  useEffect(() => {
    console.log("BackgroundGlow: Mount hook triggered");
    const glow = glowRef.current;
    const ambient1 = ambient1Ref.current;
    const ambient2 = ambient2Ref.current;
    const ambient3 = ambient3Ref.current;
    const ambient4 = ambient4Ref.current;
    if (!glow) {
      console.warn("BackgroundGlow: glowRef.current is null on mount!");
      return;
    }

    // Track mouse position
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { x: mouse.x, y: mouse.y };
    
    // Default drift animation variables
    let angle = 0;
    const radius = 80;
    let isMouseMoving = false;
    let idleTimeout = null;
    let moveEventCount = 0;

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      isMouseMoving = true;

      if (moveEventCount < 5) {
        console.log(`BackgroundGlow: MouseMove event #${moveEventCount} captured at coordinates (${e.clientX}, ${e.clientY})`);
        moveEventCount++;
      }

      // Clear previous timeout and set new one
      if (idleTimeout) clearTimeout(idleTimeout);
      idleTimeout = setTimeout(() => {
        isMouseMoving = false;
      }, 3000);
    };

    window.addEventListener('mousemove', onMouseMove);
    console.log("BackgroundGlow: MouseMove listener registered on window");

    // Render loop for smooth cursor lag (inertia) and scroll parallax
    let quickX, quickY;
    let quickAmbient1Y, quickAmbient2Y, quickAmbient3Y, quickAmbient4Y;
    try {
      console.log("BackgroundGlow: Initializing GSAP quickTo hooks on elements");
      quickX = gsap.quickTo(glow, 'x', { duration: 1.5, ease: 'power3.out' });
      quickY = gsap.quickTo(glow, 'y', { duration: 1.5, ease: 'power3.out' });
      
      if (ambient1) quickAmbient1Y = gsap.quickTo(ambient1, 'y', { duration: 1.2, ease: 'power2.out' });
      if (ambient2) quickAmbient2Y = gsap.quickTo(ambient2, 'y', { duration: 1.2, ease: 'power2.out' });
      if (ambient3) quickAmbient3Y = gsap.quickTo(ambient3, 'y', { duration: 1.2, ease: 'power2.out' });
      if (ambient4) quickAmbient4Y = gsap.quickTo(ambient4, 'y', { duration: 1.2, ease: 'power2.out' });
      console.log("BackgroundGlow: GSAP quickTo hooks created successfully");
    } catch (err) {
      console.error("BackgroundGlow: GSAP quickTo initialization failed!", err);
    }

    let tickCount = 0;
    const tick = () => {
      if (!isMouseMoving) {
        // Idle drift in a slow circle
        angle += 0.005;
        const targetX = (window.innerWidth / 2) + Math.cos(angle) * radius;
        const targetY = (window.innerHeight / 2) + Math.sin(angle) * radius;
        
        pos.x += (targetX - pos.x) * 0.05;
        pos.y += (targetY - pos.y) * 0.05;
      } else {
        // Follow mouse
        pos.x += (mouse.x - pos.x) * 0.08;
        pos.y += (mouse.y - pos.y) * 0.08;
      }

      // Offset by half of the glow width/height (500px) to center it
      if (quickX && quickY) {
        quickX(pos.x - 250);
        quickY(pos.y - 250);
      }

      // Smooth scroll parallax for background ambient points
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      if (quickAmbient1Y) quickAmbient1Y(scrollY * 0.15); // moves at 15% scroll speed
      if (quickAmbient2Y) quickAmbient2Y(scrollY * 0.1);  // moves at 10% scroll speed
      if (quickAmbient3Y) quickAmbient3Y(scrollY * 0.22); // moves at 22% scroll speed
      if (quickAmbient4Y) quickAmbient4Y(scrollY * -0.05); // moves at -5% scroll speed (stays in same place)

      if (tickCount < 5) {
        console.log(`BackgroundGlow: Tick #${tickCount} executed. Target position: (${pos.x - 250}, ${pos.y - 250}), ScrollY: ${scrollY}`);
        tickCount++;
      }

      requestAnimationFrame(tick);
    };

    console.log("BackgroundGlow: Starting animation frame tick loop");
    const animId = requestAnimationFrame(tick);

    return () => {
      console.log("BackgroundGlow: Unmount hook triggered, cleaning up listeners");
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animId);
      if (idleTimeout) clearTimeout(idleTimeout);
    };
  }, []);

  return (
    <div className="hidden dark:block fixed inset-0 pointer-events-none z-[-1] overflow-hidden select-none">
      {/* Static ambient points for depth (rendered behind content panels with scroll parallax) */}
      {/* Top Right Ambient Glow - Positioned behind the Hero Portrait */}
      <div 
        ref={ambient1Ref}
        className="absolute top-[15%] right-[5%] w-[1100px] h-[1100px] rounded-full opacity-[0.32] blur-[160px] will-change-transform animate-pulse-slow"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.55) 0%, rgba(59, 130, 246, 0.25) 50%, transparent 100%)',
        }}
      />
      {/* Bottom Left Ambient Glow - Subtle balanced counterpart */}
      <div 
        ref={ambient2Ref}
        className="absolute bottom-[5%] left-[2%] w-[900px] h-[900px] rounded-full opacity-[0.22] blur-[140px] will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.45) 0%, rgba(59, 130, 246, 0.2) 50%, transparent 100%)',
        }}
      />
      {/* Middle Left Ambient Glow - Adds layering and scrolls at a different speed for 3D parallax depth */}
      <div 
        ref={ambient3Ref}
        className="absolute top-[45%] left-[5%] w-[1000px] h-[1000px] rounded-full opacity-[0.2] blur-[150px] will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.45) 0%, rgba(6, 182, 212, 0.25) 50%, transparent 100%)',
        }}
      />
      {/* Lower Right Ambient Glow - Subtle static glow that stays in place with a very slow parallax scroll */}
      <div 
        ref={ambient4Ref}
        className="absolute top-[70%] right-[3%] w-[900px] h-[900px] rounded-full opacity-[0.18] blur-[140px] will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(139, 92, 246, 0.2) 50%, transparent 100%)',
        }}
      />

      {/* Primary Interactive Radial Glow (follows cursor, rendered behind content panels and images) */}
      <div
        ref={glowRef}
        className="absolute top-0 left-0 w-[500px] h-[500px] will-change-transform opacity-[0.45]"
      >
        <div
          className="w-full h-full rounded-full blur-[80px] animate-pulse-slow"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.95) 0%, rgba(59, 130, 246, 0.65) 50%, rgba(6, 182, 212, 0.35) 75%, transparent 100%)',
          }}
        />
      </div>
    </div>
  );
}
