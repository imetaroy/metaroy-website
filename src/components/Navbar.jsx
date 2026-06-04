import React, { useState, useEffect } from 'react';

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
          ? 'py-4 bg-black/60 backdrop-blur-md border-neutral-900/80'
          : 'py-6 bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo Link */}
        <a
          href="#home"
          className="text-base sm:text-lg font-semibold tracking-[0.25em] uppercase text-white hover:text-neutral-300 transition-colors"
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
                  isActive ? 'text-white' : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-white rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* CTA (Header Button) */}
        <div className="flex items-center space-x-4">
          <a
            href="#contact"
            className="text-xs font-semibold tracking-wider uppercase border border-neutral-800 hover:border-neutral-400 bg-neutral-950 px-4 py-2 rounded-full transition-all duration-300 text-neutral-300 hover:text-white"
          >
            Let's Talk
          </a>
        </div>
      </div>

      {/* Scroll Progress Line */}
      <div
        className="absolute bottom-0 left-0 h-[1.5px] bg-gradient-to-r from-neutral-800 via-neutral-400 to-neutral-800 transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />
    </header>
  );
}
