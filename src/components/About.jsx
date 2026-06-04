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
    <span ref={ref} className="font-mono text-3xl sm:text-4xl font-light text-white tracking-tighter">
      {prefix}{formatted}{suffix}
    </span>
  );
}

const ROTATING_HEADLINES = [
  "Engineer → Growth Leader → AI Builder",
  "Where Engineering Meets Revenue",
  "Building Systems, Not Campaigns",
  "Scaling Businesses Through Data, Automation & AI"
];

const CAPABILITIES = [
  {
    title: 'Revenue Growth',
    desc: 'Designing acquisition systems that create sustainable business growth.',
    highlights: ['Performance Marketing', 'Customer Acquisition', 'LTV Optimization', 'CRO & Experimentation'],
    icon: (
      <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.94" />
      </svg>
    )
  },
  {
    title: 'GTM & Strategy',
    desc: 'Helping products and businesses find scalable paths to market.',
    highlights: ['GTM Strategy', 'Product Positioning', 'Growth Analytics', 'Stakeholder Leadership'],
    icon: (
      <svg className="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L12 12l-2.25 2.25 2.25-2.25L14.25 9.75z" />
      </svg>
    )
  },
  {
    title: 'AI & Automation',
    desc: 'Building intelligent workflows that multiply operational output.',
    highlights: ['AI Agents', 'Automation Systems', 'Prompt Engineering', 'Workflow Design'],
    icon: (
      <svg className="w-5 h-5 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <circle cx="12" cy="5" r="2" />
        <circle cx="5" cy="12" r="2" />
        <circle cx="19" cy="12" r="2" />
        <circle cx="12" cy="19" r="2" />
        <line x1="12" y1="7" x2="5" y2="10" />
        <line x1="12" y1="7" x2="19" y2="10" />
        <line x1="5" y1="14" x2="12" y2="17" />
        <line x1="19" y1="14" x2="12" y2="17" />
        <line x1="12" y1="7" x2="12" y2="17" />
      </svg>
    )
  },
  {
    title: 'Technical Foundation',
    desc: 'Leveraging engineering principles to solve business problems.',
    highlights: ['Software Engineering', 'SQL & Analytics', 'Python', 'Data Systems'],
    icon: (
      <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    )
  }
];

const METRICS_LIST = [
  {
    value: '13',
    suffix: '+',
    label: 'Years of Experience',
    supportingLabel: 'Engineer • Growth Leader • AI Builder',
    desc: 'Building technology, growth systems, and business outcomes across software engineering, digital transformation, performance marketing, and artificial intelligence.'
  },
  {
    value: '50',
    prefix: '$',
    suffix: 'M+',
    label: 'Contribution Margin Impact',
    supportingLabel: 'Revenue Growth at Scale',
    desc: 'Led acquisition, retention, monetization, and optimization initiatives across global markets, contributing to significant business growth.'
  },
  {
    value: 'B2B & Consumer Internet',
    label: 'Growth Systems at Scale',
    supportingLabel: 'Acquisition • Retention • Monetization',
    desc: 'Experience spanning B2B SaaS, digital services, subscription businesses, and consumer internet platforms across the entire customer lifecycle.',
    isStatic: true
  }
];

const TIMELINE_PHASES = [
  { label: 'Software Engineering', years: '2013–2017' },
  { label: 'Digital Transformation', years: '2017–2018' },
  { label: 'MBA', years: '2018–2019' },
  { label: 'Growth Leadership', years: '2019–Present' },
  { label: 'AI Systems Builder', years: '2024–Present' }
];

export default function About() {
  const [headlineIdx, setHeadlineIdx] = useState(0);
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Animated line progress variables
  const timelineProgress = useTransform(scrollYProgress, [0.15, 0.65], ["0%", "100%"]);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeadlineIdx((prev) => (prev + 1) % ROTATING_HEADLINES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section ref={containerRef} id="about" className="relative min-h-screen py-24 md:py-32 px-6 border-b border-neutral-900/60 z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading & Intro */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-12 mb-20 select-none">
          <div className="max-w-2xl lg:w-2/3">
            <span className="text-[10px] tracking-[0.35em] text-neutral-500 uppercase font-semibold block mb-3">
              01 // Profile
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white mb-4">
              Building Growth Systems <span className="text-gradient-silver font-medium block md:inline">That Scale.</span>
            </h2>
            
            {/* Smooth Rotating Headline reel */}
            <div className="h-6 overflow-hidden relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={headlineIdx}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="text-xs sm:text-sm font-mono text-neutral-400 tracking-wider font-semibold"
                >
                  {ROTATING_HEADLINES[headlineIdx]}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <p className="text-neutral-400 max-w-xl font-light text-sm sm:text-base leading-relaxed lg:w-1/3">
            For more than 13 years, I've operated at the intersection of technology, growth, and business strategy.<br/><br/>
            My career began in software engineering, evolved into digital transformation consulting, and expanded into leading large-scale customer acquisition programs generating millions in annual revenue.<br/><br/>
            Today, I focus on building intelligent systems that combine performance marketing, automation, analytics, and AI to create scalable growth.
          </p>
        </div>

        {/* Layout Core Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
          
          {/* Left Column: Portrait & Details */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card p-2.5 rounded-2xl border border-neutral-900 bg-neutral-950/20 group relative overflow-hidden text-center"
            >
              <div className="aspect-[4/5] overflow-hidden rounded-xl border border-neutral-900/60 relative">
                <motion.img
                  src="/assets/prasant-about.png"
                  alt="Prasant Roy Profile"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.6 }}
                  className="w-full h-full object-cover filter grayscale contrast-110 brightness-95 hover:filter-none transition-all duration-750 ease-out select-none pointer-events-none"
                />
                <div className="absolute inset-0 bg-neutral-950/10 mix-blend-overlay pointer-events-none" />
              </div>
              
              <div className="p-4 space-y-1">
                <span className="text-[11px] font-semibold text-white tracking-widest uppercase block">
                  PRASANT ROY
                </span>
                <span className="text-[9px] font-mono text-neutral-500 tracking-wider block">
                  Growth Systems Architect
                </span>
                <span className="text-[9px] font-mono text-neutral-500 block">
                  Bangalore, India
                </span>
                <span className="text-[8px] font-mono text-neutral-600 block pt-1 border-t border-neutral-950 mt-1">
                  Engineer → Marketer → AI Builder
                </span>
                
                {/* Blinking open indicator */}
                <div className="flex items-center justify-center gap-2 mt-4 pt-2 text-[9px] font-mono text-neutral-400">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span>Open to Strategic Conversations</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Middle Column: Capabilities Pillars */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            {CAPABILITIES.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="glass-card p-6 rounded-2xl flex flex-col justify-between group hover:border-neutral-800 transition-all duration-500"
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs text-neutral-500 font-mono">01.{idx + 1}</span>
                    <span className="opacity-80 group-hover:opacity-100 transition-opacity">
                      {item.icon}
                    </span>
                  </div>
                  
                  <h3 className="text-base font-semibold text-white mb-2 group-hover:text-neutral-300 transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-neutral-400 text-xs font-light leading-relaxed mb-4">
                    {item.desc}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-neutral-900/60 mt-2">
                  {item.highlights.map(h => (
                    <span key={h} className="text-[8px] font-mono text-neutral-500 border border-neutral-955 bg-neutral-950/40 px-2 py-0.5 rounded select-none">
                      {h}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Column: Flagship Metrics Panel */}
          <div className="lg:col-span-4 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-neutral-900 pt-12 lg:pt-0 lg:pl-10">
            <div className="flex flex-col space-y-10">
              {METRICS_LIST.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col select-none"
                >
                  {stat.isStatic ? (
                    <span className="text-lg sm:text-xl font-semibold text-white tracking-tight font-sans mb-1 py-1">
                      {stat.value}
                    </span>
                  ) : (
                    <StatCounter 
                      value={stat.value} 
                      suffix={stat.suffix} 
                      prefix={stat.prefix} 
                      decimals={stat.decimals || 0} 
                    />
                  )}
                  
                  <span className="text-[10px] tracking-wider uppercase text-neutral-400 font-semibold mt-1.5">
                    {stat.label}
                  </span>
                  
                  <span className="text-[9px] font-mono text-neutral-500 mt-1 block tracking-wider uppercase">
                    {stat.supportingLabel}
                  </span>
                  
                  <p className="text-neutral-500 text-[11px] font-light leading-relaxed mt-2.5">
                    {stat.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

        {/* Career Timeline Strip */}
        <div className="mt-16 pt-12 border-t border-neutral-900 relative">
          <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-10 select-none text-center md:text-left">
            Professional Evolution
          </div>

          {/* Desktop Horizontal Timeline Track */}
          <div className="hidden md:block relative pb-8 select-none">
            {/* Background line */}
            <div className="absolute top-2.5 left-2 right-2 h-[1px] bg-neutral-900/60" />
            {/* Scrolling glow line overlay */}
            <motion.div 
              className="absolute top-2.5 left-2 h-[1px] bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-500 origin-left"
              style={{ width: timelineProgress }}
            />

            <div className="grid grid-cols-5 gap-4 relative z-10">
              {TIMELINE_PHASES.map((phase, idx) => (
                <div key={phase.label} className="flex flex-col items-center text-center px-2">
                  {/* Timeline dot marker */}
                  <div className="w-5 h-5 rounded-full border border-neutral-950 bg-neutral-950 flex items-center justify-center relative">
                    <div className="w-1.5 h-1.5 rounded-full bg-neutral-800 group-hover:bg-neutral-600 transition-colors" />
                  </div>
                  
                  <span className="text-[11px] font-semibold text-white tracking-tight mt-5">
                    {phase.label}
                  </span>
                  <span className="text-[9px] font-mono text-neutral-500 mt-1">
                    {phase.years}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Vertical Timeline Track */}
          <div className="md:hidden relative pl-6 pb-6 select-none">
            {/* Background vertical line */}
            <div className="absolute top-2 bottom-2 left-2.5 w-[1px] bg-neutral-900/60" />
            {/* Scrolling height indicator line */}
            <motion.div 
              className="absolute top-2 left-2.5 w-[1px] bg-gradient-to-b from-blue-500 via-violet-500 to-cyan-500 origin-top"
              style={{ height: timelineProgress }}
            />

            <div className="space-y-8 relative z-10">
              {TIMELINE_PHASES.map((phase, idx) => (
                <div key={phase.label} className="flex gap-4 items-start">
                  {/* Node Dot */}
                  <div className="w-4 h-4 rounded-full border border-neutral-950 bg-neutral-950 flex items-center justify-center -translate-x-[22px] mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-neutral-800" />
                  </div>
                  
                  <div className="-ml-4 flex flex-col">
                    <span className="text-[11px] font-semibold text-white tracking-tight">
                      {phase.label}
                    </span>
                    <span className="text-[9px] font-mono text-neutral-500 mt-0.5">
                      {phase.years}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
