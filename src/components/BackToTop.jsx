import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button when user scrolls past 80% of the viewport height (past the Hero/Header section)
      if (window.scrollY > window.innerHeight * 0.8) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount to handle initial scroll state
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    // Scroll to top smoothly - Lenis will intercept and animate this automatically
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 10 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 p-3.5 rounded-full border border-neutral-200 dark:border-neutral-800/80 bg-white/70 dark:bg-neutral-950/60 backdrop-blur-md text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white shadow-lg shadow-neutral-950/5 dark:shadow-none hover:border-neutral-400 dark:hover:border-neutral-600 hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none cursor-pointer group"
          aria-label="Back to top"
        >
          {/* Subtle glowing ring behind icon on hover */}
          <div className="absolute inset-0 rounded-full bg-neutral-950/5 dark:bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          
          <ArrowUp className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
