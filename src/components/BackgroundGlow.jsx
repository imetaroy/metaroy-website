import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function BackgroundGlow() {
  const glowRef = useRef(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    // Track mouse position
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { x: mouse.x, y: mouse.y };
    
    // Default drift animation variables
    let angle = 0;
    const radius = 80;
    let isMouseMoving = false;
    let idleTimeout = null;

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      isMouseMoving = true;

      // Clear previous timeout and set new one
      if (idleTimeout) clearTimeout(idleTimeout);
      idleTimeout = setTimeout(() => {
        isMouseMoving = false;
      }, 3000);
    };

    window.addEventListener('mousemove', onMouseMove);

    // Render loop for smooth cursor lag (inertia)
    const quickX = gsap.quickTo(glow, 'x', { duration: 1.5, ease: 'power3.out' });
    const quickY = gsap.quickTo(glow, 'y', { duration: 1.5, ease: 'power3.out' });

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

      // Offset by half of the glow width/height to center it
      quickX(pos.x - 250);
      quickY(pos.y - 250);

      requestAnimationFrame(tick);
    };

    const animId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animId);
      if (idleTimeout) clearTimeout(idleTimeout);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Primary Interactive Radial Glow */}
      <div
        ref={glowRef}
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.12] blur-[80px]"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.6) 0%, rgba(59, 130, 246, 0.3) 50%, transparent 100%)',
          willChange: 'transform',
        }}
      />

      {/* Static ambient points for depth */}
      <div 
        className="absolute top-[20%] right-[10%] w-[600px] h-[600px] rounded-full opacity-[0.06] blur-[120px] animate-pulse-slow"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, transparent 80%)',
        }}
      />
      <div 
        className="absolute bottom-[10%] left-[5%] w-[500px] h-[500px] rounded-full opacity-[0.05] blur-[100px]"
        style={{
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 70%)',
        }}
      />
    </div>
  );
}
