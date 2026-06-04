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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
          {/* Apple-style segmented theme slider (Desktop-only) */}
          <div className="hidden md:flex h-8 w-32 bg-neutral-100/85 dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800/80 p-0.5 rounded-full relative select-none transition-colors duration-500">
            {/* Sliding Indicator */}
            <motion.div
              className="absolute top-0.5 bottom-0.5 left-0.5 rounded-full bg-white dark:bg-neutral-800 shadow-sm dark:shadow-none"
              initial={false}
              animate={{
                x: theme === 'light' ? '0%' : '100%',
              }}
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              style={{
                width: 'calc(50% - 2px)',
              }}
            />

            {/* Light Segment */}
            <button
              onClick={() => {
                setTheme('light');
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
              }}
              className={`flex-1 z-10 flex items-center justify-center text-[9px] font-mono tracking-wider uppercase font-semibold transition-colors duration-300 focus:outline-none cursor-pointer ${
                theme === 'light'
                  ? 'text-neutral-950'
                  : 'text-neutral-500 hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-300'
              }`}
            >
              Light
            </button>

            {/* Dark Segment */}
            <button
              onClick={() => {
                setTheme('dark');
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
              }}
              className={`flex-1 z-10 flex items-center justify-center text-[9px] font-mono tracking-wider uppercase font-semibold transition-colors duration-300 focus:outline-none cursor-pointer ${
                theme === 'dark'
                  ? 'text-white'
                  : 'text-neutral-500 hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-300'
              }`}
            >
              Dark
            </button>
          </div>

          <a
            href="#contact"
            className="text-xs font-semibold tracking-wider uppercase border border-neutral-800 dark:border-neutral-200 hover:border-neutral-700 dark:hover:border-neutral-400 bg-neutral-950 dark:bg-white px-4 py-2 rounded-full transition-all duration-300 text-neutral-300 dark:text-neutral-800 hover:text-white dark:hover:text-black"
          >
            Let's Talk
          </a>

          {/* Hamburger Menu Toggle (Mobile-only) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex items-center justify-center p-2 rounded-full border border-neutral-200 dark:border-neutral-800/60 text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors focus:outline-none cursor-pointer"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Navigation Overlay & Sun/Moon theme toggles) */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/30 dark:bg-black/50 backdrop-blur-sm md:hidden"
            />

            {/* Slide-out Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-[280px] bg-white dark:bg-neutral-950 border-l border-neutral-200 dark:border-neutral-900 p-6 flex flex-col justify-between md:hidden shadow-2xl"
            >
              <div className="flex flex-col space-y-8">
                {/* Header inside Mobile Menu */}
                <div className="flex items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-900">
                  <span className="text-xs font-mono tracking-widest text-neutral-500 uppercase">
                    Navigation
                  </span>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-1 rounded-full text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors focus:outline-none cursor-pointer"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col space-y-4">
                  {NAV_ITEMS.map((item) => {
                    const id = item.href.replace('#', '');
                    const isActive = activeSection === id;
                    return (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`text-sm tracking-wider uppercase py-1.5 px-3 rounded-lg transition-all duration-300 font-medium ${
                          isActive
                            ? 'text-neutral-950 dark:text-white bg-neutral-100 dark:bg-neutral-900'
                            : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-900/50'
                        }`}
                      >
                        {item.label}
                      </a>
                    );
                  })}
                </nav>
              </div>

              {/* Theme Toggle (Sun and Moon buttons inside mobile menu) */}
              <div className="pt-6 border-t border-neutral-100 dark:border-neutral-900 flex flex-col space-y-3">
                <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">
                  Theme System
                </span>
                <div className="flex gap-2">
                  {/* Light Button */}
                  <button
                    onClick={() => {
                      setTheme('light');
                      document.documentElement.classList.remove('dark');
                      localStorage.setItem('theme', 'light');
                    }}
                    className={`flex-1 py-2 px-3 rounded-lg border flex items-center justify-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                      theme === 'light'
                        ? 'bg-neutral-100 dark:bg-white text-neutral-950 border-neutral-300 dark:border-neutral-200'
                        : 'border-neutral-200 dark:border-neutral-800 bg-transparent text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728L19 12a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Light
                  </button>

                  {/* Dark Button */}
                  <button
                    onClick={() => {
                      setTheme('dark');
                      document.documentElement.classList.add('dark');
                      localStorage.setItem('theme', 'dark');
                    }}
                    className={`flex-1 py-2 px-3 rounded-lg border flex items-center justify-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                      theme === 'dark'
                        ? 'bg-neutral-900 dark:bg-neutral-800 text-white border-neutral-800 dark:border-neutral-700'
                        : 'border-neutral-200 dark:border-neutral-800 bg-transparent text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                    Dark
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Scroll Progress Line */}
      <div
        className="absolute bottom-0 left-0 h-[1.5px] bg-gradient-to-r from-neutral-300 via-neutral-900 to-neutral-300 dark:from-neutral-800 dark:via-neutral-400 dark:to-neutral-800 transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />
    </header>
  );
}
