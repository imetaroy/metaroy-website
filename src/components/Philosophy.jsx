import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, AnimatePresence, useScroll, useTransform } from 'framer-motion';

const CORE_BELIEFS = [
  {
    num: '01',
    title: 'Systems Create Outcomes',
    quote: 'Great results are rarely created by individual tactics. They emerge from systems that continuously learn, improve, and compound.',
    body: 'Whether designing a customer acquisition funnel, a reporting framework, or an AI workflow, I focus on building systems that generate predictable outcomes long after the initial work is complete.',
    keywords: ['Systems Thinking', 'Scale', 'Compounding', 'Automation']
  },
  {
    num: '02',
    title: 'Data Before Opinions',
    quote: 'Assumptions are cheap. Evidence is leverage.',
    body: 'The most effective decisions come from observation, experimentation, and measurement. I trust data not because it is perfect, but because it provides a better starting point than intuition alone.',
    keywords: ['Analytics', 'Experimentation', 'Attribution', 'Decision Science']
  },
  {
    num: '03',
    title: 'Technology Is a Force Multiplier',
    quote: 'Every repetitive process is an opportunity for automation.',
    body: 'My engineering background taught me that software scales effort. AI expands that principle further by scaling thinking, research, execution, and decision support.',
    keywords: ['AI', 'Automation', 'Engineering', 'Efficiency']
  },
  {
    num: '04',
    title: 'Curiosity Creates Opportunity',
    quote: 'The most valuable insights often exist between disciplines.',
    body: 'My career moved from software engineering to marketing, analytics, product thinking, and AI. The ability to connect ideas across domains creates advantages that specialists often miss.',
    keywords: ['Learning', 'Exploration', 'Innovation', 'Adaptability']
  },
  {
    num: '05',
    title: 'Build What You Wish Existed',
    quote: 'The best way to understand a problem is to build a solution for it.',
    body: 'Whether launching new acquisition programs, creating internal tools, building AI applications, or experimenting with SaaS ideas, I learn by creating.\n\nThis philosophy is the foundation of MetaRoy: pushing beyond existing limits through experimentation and execution.',
    keywords: ['Builder Mindset', 'Entrepreneurship', 'Product Thinking', 'Execution']
  }
];

// Single Belief Card (Desktop Scroll Spotlight version)
function BeliefCard({ belief, idx, activeIdx, setActiveIdx }) {
  const cardRef = useRef(null);
  // Viewport margin focuses on the center strip of the screen
  const isInView = useInView(cardRef, { margin: "-45% 0px -45% 0px" });
  
  useEffect(() => {
    if (isInView) {
      setActiveIdx(idx);
    }
  }, [isInView, idx, setActiveIdx]);

  const isActive = activeIdx === idx;

  return (
    <motion.div
      ref={cardRef}
      animate={{
        opacity: isActive ? 1 : 0.2,
        scale: isActive ? 1.02 : 0.98,
      }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`glass-panel p-8 sm:p-10 rounded-2xl border transition-colors duration-500 relative overflow-hidden flex flex-col justify-between min-h-[300px] ${
        isActive ? 'border-neutral-800 bg-neutral-950/40' : 'border-neutral-900/40 bg-neutral-950/10'
      }`}
    >
      {/* Left connection line segment */}
      <div 
        className={`absolute left-[-24px] w-[2px] hidden lg:block select-none pointer-events-none ${
          idx === 0 
            ? 'top-[36px] bottom-0' 
            : idx === 4 
              ? 'top-0 h-[36px]' 
              : 'top-0 bottom-0'
        }`}
      >
        {/* Background line segment */}
        <div className="absolute inset-0 bg-neutral-900/40" />
        
        {/* Glowing active line segment */}
        <motion.div 
          className="absolute top-0 bottom-0 w-full bg-gradient-to-b from-indigo-500 to-violet-500 origin-top"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: isActive ? 1 : 0 }}
          transition={{ duration: 0.6 }}
        />
      </div>

      {/* Connection Node Dot */}
      <div 
        className="absolute left-[-29px] top-[32px] w-3 h-3 rounded-full border-2 border-neutral-950 z-20 hidden lg:block transition-all duration-500"
        style={{
          backgroundColor: isActive ? '#8b5cf6' : '#171717',
          boxShadow: isActive ? '0 0 10px rgba(139, 92, 246, 0.6)' : 'none',
        }}
      />

      <div className="relative z-10">
        <div className="flex justify-between items-center mb-4 font-mono">
          <span className="text-[10px] tracking-widest text-neutral-500 uppercase">
            Belief {belief.num}
          </span>
          <span className={`text-[11px] font-medium transition-colors duration-300 ${isActive ? 'text-neutral-400' : 'text-neutral-700'}`}>
            // {belief.num}
          </span>
        </div>

        <h3 className={`text-xl sm:text-2xl font-semibold mb-4 transition-colors duration-300 ${isActive ? 'text-white' : 'text-neutral-400'}`}>
          {belief.title}
        </h3>

        <blockquote className={`text-sm sm:text-base italic border-l-2 border-neutral-800 pl-4 mb-4 transition-colors duration-300 ${isActive ? 'text-neutral-200' : 'text-neutral-500'}`}>
          "{belief.quote}"
        </blockquote>

        <p className={`text-xs sm:text-sm font-light leading-relaxed mb-6 transition-colors duration-300 ${isActive ? 'text-neutral-400' : 'text-neutral-600'}`}>
          {belief.body}
        </p>
      </div>

      {/* Keywords Badges */}
      <div className="flex flex-wrap gap-2 mt-auto relative z-10">
        {belief.keywords.map((kw) => (
          <span
            key={kw}
            className={`text-[9px] font-mono px-2 py-0.5 rounded border transition-all duration-300 select-none ${
              isActive 
                ? 'border-neutral-800 bg-neutral-900/40 text-neutral-300' 
                : 'border-neutral-950 bg-neutral-950/40 text-neutral-600'
            }`}
          >
            {kw}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Philosophy() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [expandedIdx, setExpandedIdx] = useState(0); // For Mobile Accordion

  // Scroll target for reacting the background grid to scroll progress
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const gridY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const gridOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.08, 0.22, 0.08]);

  return (
    <section ref={sectionRef} id="philosophy" className="relative min-h-screen py-24 md:py-32 px-6 border-b border-neutral-900/60 z-10">
      
      {/* Scroll Reacting Background Grid */}
      <motion.div 
        className="absolute inset-0 bg-grid-pattern pointer-events-none"
        style={{
          y: gridY,
          opacity: gridOpacity,
        }}
      />

      {/* Ambient backgrounds */}
      <div className="absolute right-0 top-[20%] w-[450px] h-[450px] rounded-full bg-violet-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute left-0 bottom-[20%] w-[380px] h-[380px] rounded-full bg-cyan-500/3 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Sticky Desktop & Stacking Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Sticky Left Column (Header details) */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 lg:h-[calc(100vh-220px)] lg:self-start flex flex-col justify-between py-2 select-none">
            <div>
              <span className="text-[10px] tracking-[0.35em] text-neutral-500 uppercase font-semibold block mb-3">
                05 // Philosophy
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white mb-6">
                Principles That <span className="text-gradient-silver font-medium">Guide My Work</span>.
              </h2>
              <p className="text-neutral-400 font-light text-sm sm:text-base leading-relaxed max-w-lg">
                A framework shaped by software engineering, growth marketing, systems thinking, and artificial intelligence.
              </p>
            </div>

            {/* Scrolling Navigation Tracker for Desktop */}
            <div className="hidden lg:flex flex-col space-y-3 font-mono text-[10px] text-neutral-500 mt-12">
              {CORE_BELIEFS.map((b, idx) => (
                <div 
                  key={b.num} 
                  className={`flex items-center gap-3 transition-colors duration-300 ${activeIdx === idx ? 'text-white' : 'text-neutral-600'}`}
                >
                  <span className={`h-[1px] transition-all duration-300 ${activeIdx === idx ? 'w-6 bg-white' : 'w-2 bg-neutral-800'}`} />
                  <span>{b.num} // {b.title.toUpperCase()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Scrolling Right Column (Belief stack) */}
          <div className="lg:col-span-7 relative pl-0 lg:pl-10">
            
            {/* Desktop Scrolling Stack */}
            <div className="hidden lg:flex flex-col space-y-16 py-12">
              {CORE_BELIEFS.map((belief, idx) => (
                <BeliefCard 
                  key={belief.num} 
                  belief={belief} 
                  idx={idx} 
                  activeIdx={activeIdx} 
                  setActiveIdx={setActiveIdx} 
                />
              ))}
            </div>

            {/* Mobile Accordion Layout */}
            <div className="lg:hidden flex flex-col space-y-4">
              {CORE_BELIEFS.map((belief, idx) => {
                const isExpanded = expandedIdx === idx;
                return (
                  <div
                    key={belief.num}
                    className={`glass-panel rounded-xl border overflow-hidden transition-all duration-300 ${
                      isExpanded ? 'border-neutral-800 bg-neutral-950/40' : 'border-neutral-900/60 bg-neutral-950/20'
                    }`}
                  >
                    {/* Header bar */}
                    <button
                      onClick={() => setExpandedIdx(isExpanded ? -1 : idx)}
                      className="w-full p-5 text-left flex justify-between items-center select-none"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[10px] text-neutral-500">0{idx + 1}</span>
                        <span className={`text-[13px] font-semibold tracking-tight transition-colors duration-300 ${
                          isExpanded ? 'text-white' : 'text-neutral-300'
                        }`}>
                          {belief.title}
                        </span>
                      </div>
                      <span className="text-neutral-500 font-mono text-[10px]">
                        {isExpanded ? '[-]' : '[+]'}
                      </span>
                    </button>

                    {/* Accordion Content */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                          <div className="px-5 pb-5 pt-1 border-t border-neutral-900/30">
                            <blockquote className="text-xs sm:text-sm italic text-neutral-200 border-l border-neutral-800 pl-3 mb-3">
                              "{belief.quote}"
                            </blockquote>
                            <p className="text-xs text-neutral-400 font-light leading-relaxed mb-4">
                              {belief.body}
                            </p>

                            {/* Keywords Badges */}
                            <div className="flex flex-wrap gap-1.5 mt-2">
                              {belief.keywords.map((kw) => (
                                <span
                                  key={kw}
                                  className="text-[9px] font-mono px-2 py-0.5 rounded border border-neutral-800 bg-neutral-900/40 text-neutral-300"
                                >
                                  {kw}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
