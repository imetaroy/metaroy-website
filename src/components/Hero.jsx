import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center items-center px-6 md:px-12 overflow-hidden z-10 pt-28 pb-16"
    >
      {/* Background glowing blurred radial orbs */}
      <div className="absolute top-[30%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-neutral-800/10 via-neutral-200/5 to-neutral-800/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Main Content Wrapper */}
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column: Headline and CTAs */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left select-none order-2 lg:order-1">
          
          {/* Intro Badge (Explaining metaroy: meta = beyond) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="inline-flex items-center space-x-2 border border-neutral-800/60 bg-neutral-950/40 backdrop-blur-md px-3.5 py-2 rounded-full mb-8 text-neutral-400 text-[10px] sm:text-xs tracking-[0.2em] uppercase font-mono"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
            <span>METAROY // META = BEYOND CONVENTIONAL GTM</span>
          </motion.div>

          {/* Big Name Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-5xl sm:text-7xl md:text-8xl font-semibold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-400/90 leading-[1.1] py-3 px-4 -mx-4 select-none mb-6"
          >
            PRASANT ROY
          </motion.h1>

          {/* Sub-headline / Positioning Statement */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="text-base sm:text-xl font-light tracking-wide text-neutral-400 max-w-2xl leading-relaxed mb-12 select-none"
          >
            Building <span className="text-white font-medium">intelligent growth systems</span> at the intersection of AI, marketing, and product.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 justify-center lg:justify-start items-center w-full"
          >
            <a
              href="#about"
              className="w-full sm:w-auto text-center text-xs font-semibold tracking-[0.15em] uppercase bg-white text-black hover:bg-neutral-200 px-8 py-4 rounded-full transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.08)] hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]"
            >
              Know More About Me
            </a>
            <a
              href="#experience"
              className="w-full sm:w-auto text-center text-xs font-semibold tracking-[0.15em] uppercase border border-neutral-800 hover:border-neutral-600 bg-black/40 backdrop-blur px-8 py-4 rounded-full transition-all duration-300 text-neutral-300 hover:text-white"
            >
              View My Professional Experience
            </a>
          </motion.div>

        </div>

        {/* Right Column: Enlarged Polished Grayscale Portrait without Box */}
        <div className="lg:col-span-5 flex justify-center items-center order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="relative w-full max-w-[360px] sm:max-w-[440px] lg:max-w-[500px] aspect-square overflow-hidden"
          >
            {/* Background ambient lighting directly behind the image */}
            <div className="absolute inset-0 bg-radial from-neutral-800/20 via-transparent to-transparent opacity-60 blur-3xl pointer-events-none" />
            
            <img
              src="/assets/prasant-hero-polished.png"
              alt="Prasant Roy Portrait"
              className="w-full h-full object-cover filter grayscale contrast-105 brightness-95 hover:filter-none transition-all duration-700 ease-out select-none pointer-events-none"
              style={{
                maskImage: 'radial-gradient(circle, black 50%, transparent 100%)',
                WebkitMaskImage: 'radial-gradient(circle, black 50%, transparent 100%)',
              }}
            />
          </motion.div>
        </div>

      </div>

      {/* Floating Animated Scroll Down Mouse Icon */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1.2, duration: 1.0 }}
        className="absolute bottom-6 flex flex-col items-center space-y-2 pointer-events-none select-none hidden lg:flex"
      >
        <div className="w-5 h-8 border-2 border-neutral-700 rounded-full flex justify-center p-1.5">
          <motion.div
            animate={{
              y: [0, 8, 0],
            }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-1.5 h-1.5 rounded-full bg-neutral-400"
          />
        </div>
        <span className="text-[10px] tracking-[0.35em] text-neutral-600 uppercase font-medium">SCROLL</span>
      </motion.div>
    </section>
  );
}
