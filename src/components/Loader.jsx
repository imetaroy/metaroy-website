import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    // Lock scrolling
    document.documentElement.classList.add('lenis-stopped');
    document.body.style.overflow = 'hidden';

    // Simulated progress counter
    const obj = { val: 0 };
    const timeline = gsap.timeline({
      onComplete: () => {
        // Slide up animation for the loader
        gsap.timeline({
          onComplete: () => {
            setIsLoaded(true);
            // Unlock scrolling
            document.documentElement.classList.remove('lenis-stopped');
            document.body.style.overflow = '';
          }
        })
        .to(textRef.current, {
          y: -50,
          opacity: 0,
          duration: 0.8,
          ease: 'power4.inOut'
        })
        .to(progressRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: 'power4.inOut'
        }, '-=0.6')
        .to(containerRef.current, {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
          duration: 1.2,
          ease: 'power4.inOut'
        }, '-=0.3');
      }
    });

    timeline.to(obj, {
      val: 100,
      duration: 2.2,
      ease: 'power3.out',
      onUpdate: () => {
        setProgress(Math.floor(obj.val));
      }
    });

    // Text slide-in entrance
    gsap.fromTo(
      textRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out', delay: 0.2 }
    );

    return () => {
      document.documentElement.classList.remove('lenis-stopped');
      document.body.style.overflow = '';
    };
  }, []);

  if (isLoaded) return null;

  return (
    <div
      ref={containerRef}
      style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
      className="fixed inset-0 z-[9999] flex flex-col justify-between bg-black p-8 md:p-16 select-none"
    >
      {/* Top Header */}
      <div className="flex justify-between items-center text-xs tracking-[0.2em] text-neutral-500 uppercase">
        <span>METAROY.COM</span>
        <span>Systems // Growth // AI</span>
      </div>

      {/* Center Reveal */}
      <div className="overflow-hidden">
        <h1
          ref={textRef}
          className="text-4xl sm:text-6xl md:text-8xl font-medium tracking-tighter text-white"
        >
          PRASANT ROY
        </h1>
      </div>

      {/* Bottom Progress */}
      <div
        ref={progressRef}
        className="flex justify-between items-end border-t border-neutral-900 pt-6"
      >
        <span className="text-xs tracking-wider text-neutral-500 font-mono">
          INITIALIZING INTERACTIVE EXPERIENCE
        </span>
        <span className="text-5xl sm:text-7xl font-light font-mono text-neutral-400 tracking-tighter">
          {progress.toString().padStart(3, '0')}%
        </span>
      </div>
    </div>
  );
}
