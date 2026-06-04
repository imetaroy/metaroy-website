import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence, useScroll, useTransform } from 'framer-motion';

// Universal Stat Counter Component supporting prefix/suffix/decimals
function StatCounter({ value, duration = 1.6, suffix = "", prefix = "", decimals = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const end = parseFloat(value);
    if (isNaN(end)) return;

    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easedProgress = progress * (2 - progress);
      const current = easedProgress * end;
      
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(end);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  const formatted = decimals > 0 ? displayValue.toFixed(decimals) : Math.floor(displayValue).toString();

  return (
    <span ref={ref} className="font-mono text-3xl sm:text-4xl font-light text-neutral-900 dark:text-white tracking-tighter">
      {prefix}{formatted}{suffix}
    </span>
  );
}

const METRICS_LIST = [
  {
    value: '13',
    suffix: '+',
    label: 'Years of Experience',
  },
  {
    value: '50',
    prefix: '$',
    suffix: 'M+',
    label: 'Contribution Margin Impact',
  },
  {
    value: 'B2B & Consumer Internet',
    label: 'Growth Systems at Scale',
    isStatic: true
  }
];

export default function About() {
  const containerRef = useRef(null);

  return (
    <section ref={containerRef} id="about" className="relative py-16 md:py-24 px-6 border-b border-neutral-200 dark:border-neutral-900/60 z-10 overflow-hidden bg-white dark:bg-black/30">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Identity & Smiling Portrait */}
          <div className="lg:col-span-4 flex flex-col items-center text-center select-none lg:sticky lg:top-24">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-[280px] sm:max-w-[320px] aspect-square rounded-2xl overflow-hidden relative shadow-sm dark:shadow-[0_0_50px_rgba(139,92,246,0.12)] border border-neutral-100 dark:border-neutral-900 bg-neutral-50/50 dark:bg-neutral-950/10 mb-6 p-4"
            >
              <img
                src="/assets/prasant-hero-polished.png"
                alt="Prasant Roy Profile"
                className="w-full h-full object-cover filter grayscale contrast-[1.05] brightness-95 hover:filter-none transition-all duration-700 ease-out select-none pointer-events-none rounded-xl"
              />
            </motion.div>
            
            <div className="space-y-1.5 mt-2">
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white tracking-widest uppercase">
                PRASANT ROY
              </h3>
              <p className="text-xs font-mono text-neutral-500 tracking-wider">
                Growth Systems Architect
              </p>
              <p className="text-xs font-mono text-neutral-400 dark:text-neutral-500">
                Bangalore, India
              </p>
              <p className="text-xs font-mono text-neutral-600 dark:text-neutral-400 pt-2.5 border-t border-neutral-200 dark:border-neutral-900 mt-2.5">
                Engineer &rarr; Growth Leader &rarr; AI Builder
              </p>
              
              <div className="flex items-center justify-center gap-2 mt-4 pt-2 text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>Available for Strategic Opportunities</span>
              </div>
            </div>
          </div>

          {/* Right Column: Executive Presentation */}
          <div className="lg:col-span-8 flex flex-col justify-center">
            {/* Section Label */}
            <span className="text-[10px] tracking-[0.35em] text-neutral-500 uppercase font-semibold block mb-3 select-none">
              01 // PROFILE
            </span>
            
            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-neutral-900 dark:text-white mb-6">
              Building Growth <span className="text-gradient-silver font-medium">Systems That Scale</span>.
            </h2>
            
            {/* Positioning Statement */}
            <div className="text-neutral-600 dark:text-neutral-400 font-light text-sm sm:text-base leading-relaxed space-y-4 mb-8">
              <p>
                I combine engineering, growth strategy, and AI to build systems that acquire customers, increase retention, and drive sustainable revenue growth.
              </p>
              <p>
                Over the last 13+ years, I have worked across software engineering, digital transformation, B2B SaaS, and consumer internet businesses, helping organizations scale through data-driven decision making and automation.
              </p>
            </div>
            
            {/* Impact Metrics (No descriptions beneath) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-6 border-t border-b border-neutral-200 dark:border-neutral-900 mb-8 select-none">
              {METRICS_LIST.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col justify-center sm:justify-start"
                >
                  {stat.isStatic ? (
                    <span className="text-xl sm:text-2xl font-semibold text-neutral-900 dark:text-white tracking-tight py-1 font-sans leading-none">
                      {stat.value}
                    </span>
                  ) : (
                    <StatCounter 
                      value={stat.value} 
                      suffix={stat.suffix} 
                      prefix={stat.prefix} 
                    />
                  )}
                  <span className="text-[10px] tracking-wider uppercase text-neutral-600 dark:text-neutral-400 font-semibold mt-1 font-mono">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
            
            {/* Mini Expertise Strip */}
            <div className="flex flex-wrap gap-2 mb-8 select-none">
              {['Growth Marketing', 'Google Ads', 'AI Automation', 'GTM Strategy', 'Python', 'SQL', 'Analytics', 'Product Thinking', 'Leadership'].map(badge => (
                <span
                  key={badge}
                  className="text-[10px] sm:text-xs font-mono text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-900 bg-neutral-50 dark:bg-neutral-950/20 px-3.5 py-1 rounded-full"
                >
                  {badge}
                </span>
              ))}
            </div>
            
            {/* Single CTA to Experience */}
            <div className="flex">
              <a
                href="#experience"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 text-sm font-medium hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-all duration-300 shadow-sm"
              >
                View Professional Journey
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
