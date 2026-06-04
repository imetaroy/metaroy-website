import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Philosophy', href: '#philosophy' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      // Toggle dark glass background on scroll
      setIsScrolled(window.scrollY > 20);

      // Calculate scroll progress percentage
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }

      // Track active section
      const scrollPosition = window.scrollY + 200; // Offset for tracking boundary
      
      for (const item of NAV_ITEMS) {
        const id = item.href.replace('#', '');
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
        isScrolled
          ? 'py-4 bg-white/70 dark:bg-black/60 backdrop-blur-md border-neutral-200/80 dark:border-neutral-900/80'
          : 'py-6 bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo Link */}
        <a
          href="#home"
          className="text-base sm:text-lg font-semibold tracking-[0.25em] uppercase text-neutral-900 dark:text-white hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
        >
          PRASANT ROY
        </a>

        {/* Navigation Items (Desktop) */}
        <nav className="hidden md:flex items-center space-x-8">
          {NAV_ITEMS.map((item) => {
            const id = item.href.replace('#', '');
            const isActive = activeSection === id;
            return (
              <a
                key={item.href}
                href={item.href}
                className={`text-xs tracking-wider uppercase transition-colors relative py-1 ${
                  isActive 
                    ? 'text-neutral-900 dark:text-white' 
                    : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-neutral-900 dark:bg-white rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* CTA (Header Button) & Theme Toggle */}
        <div className="flex items-center space-x-4">
          <AnimatePresence mode="wait">
            <button
              onClick={toggleTheme}
              className="w-8 h-8 rounded-full flex items-center justify-center border border-neutral-200 dark:border-neutral-800/60 hover:border-neutral-400 dark:hover:border-neutral-500 bg-white/80 dark:bg-neutral-950/40 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-all duration-300 focus:outline-none relative overflow-hidden"
              aria-label="Toggle theme"
            >
              <motion.div
                key={theme}
                initial={{ y: 12, opacity: 0, rotate: 45 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                exit={{ y: -12, opacity: 0, rotate: -45 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center"
              >
                {theme === 'dark' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
                )}
              </motion.div>
            </button>
          </AnimatePresence>

          <a
            href="#contact"
            className="text-xs font-semibold tracking-wider uppercase border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-500 bg-white dark:bg-neutral-950 px-4 py-2 rounded-full transition-all duration-300 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white"
          >
            Let's Talk
          </a>
        </div>
      </div>

      {/* Scroll Progress Line */}
      <div
        className="absolute bottom-0 left-0 h-[1.5px] bg-gradient-to-r from-neutral-300 via-neutral-900 to-neutral-300 dark:from-neutral-800 dark:via-neutral-400 dark:to-neutral-800 transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />
    </header>
  );
}
