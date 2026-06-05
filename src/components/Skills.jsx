import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';

// Single Skill Row with Animated Bar and Synchronized Counter
function SkillBar({ name, score, barColorClass, glowColor, idx, isInView }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    const formatted = latest % 1 === 0 ? latest.toFixed(0) : latest.toFixed(1);
    return `${formatted}/10`;
  });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, score, {
        duration: 1.5,
        ease: [0.16, 1, 0.3, 1],
        delay: idx * 0.05
      });
      return controls.stop;
    } else {
      count.set(0);
    }
  }, [isInView, score, idx]);

  return (
    <div className="space-y-1.5 group/row select-none">
      {/* Skill Name */}
      <div className="text-[11px] text-neutral-500 group-hover/row:text-neutral-900 dark:text-neutral-400 dark:group-hover/row:text-white transition-colors duration-300 font-medium">
        {name}
      </div>
      
      {/* Progress Bar and Score */}
      <div className="flex items-center gap-3">
        {/* Skill Bar Container */}
        <div className="h-[6px] flex-1 bg-neutral-250 dark:bg-neutral-900 rounded-full overflow-hidden border border-neutral-300 dark:border-neutral-950 relative group-hover/row:border-neutral-400 dark:group-hover/row:border-neutral-800 transition-colors duration-300">
          <motion.div
            initial={{ width: '0%' }}
            animate={isInView ? { width: `${(score / 10) * 100}%` } : { width: '0%' }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: idx * 0.05 }}
            className={`h-full rounded-full ${barColorClass} transition-all duration-300 group-hover/row:brightness-110`}
            style={{
              boxShadow: `0 0 12px ${glowColor}22`
            }}
          />
        </div>
        
        {/* Score Counter */}
        <span className="font-mono text-[10px] text-neutral-500 min-w-[45px] text-right font-medium group-hover/row:text-neutral-800 dark:group-hover/row:text-neutral-200 transition-colors duration-300">
          <motion.span>{rounded}</motion.span>
        </span>
      </div>
    </div>
  );
}

// Career Trajectory Path Component
function ProgressionTrack({ activeDomain, setActiveDomain, onPhaseClick }) {
  const phases = [
    { label: 'Software Engineer', domainIdx: 2, subtitle: 'Engineering Foundation' },
    { label: 'Marketing Transformation Consultant', domainIdx: 2, subtitle: 'Digital Transformation' },
    { label: 'Performance Marketing Leader', domainIdx: 0, subtitle: 'Growth & Revenue' },
    { label: 'AI Builder', domainIdx: 1, subtitle: 'AI & Automation Systems' },
  ];

  return (
    <div className="mb-16 select-none max-w-5xl">
      <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-4">
        Career Trajectory Mapping
      </div>
      
      <div className="flex flex-wrap sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 relative">
        {phases.map((phase, idx) => {
          const isHighlighted = activeDomain === phase.domainIdx;
          
          return (
            <div
              key={phase.label}
              onMouseEnter={() => setActiveDomain(phase.domainIdx)}
              onMouseLeave={() => setActiveDomain(null)}
              onClick={() => onPhaseClick && onPhaseClick(phase.domainIdx)}
              className={`relative cursor-pointer transition-all duration-300 flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11px] sm:flex-col sm:items-start sm:p-4 sm:rounded-xl sm:gap-0 ${
                isHighlighted
                  ? `sm:border-neutral-400 dark:sm:border-neutral-700 sm:bg-white/60 dark:sm:bg-neutral-900/30 sm:shadow-sm dark:sm:shadow-[0_0_20px_rgba(255,255,255,0.02)] ${
                      phase.domainIdx === 0
                        ? 'border-blue-500/45 bg-blue-500/5 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400'
                        : phase.domainIdx === 1
                          ? 'border-violet-500/45 bg-violet-500/5 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400'
                          : 'border-cyan-500/45 bg-cyan-500/5 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400'
                    }`
                  : 'border-neutral-250 dark:border-neutral-900/60 bg-neutral-100/10 dark:bg-neutral-950/20 text-neutral-600 dark:text-neutral-400 hover:border-neutral-300 dark:hover:border-neutral-800'
              }`}
            >
              {/* Connective arrows for larger screen layouts */}
              {idx < phases.length - 1 && (
                <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-20 text-neutral-400 dark:text-neutral-700 font-mono text-xs">
                  →
                </div>
              )}
              
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-mono text-[9px] text-neutral-500">0{idx + 1}</span>
                <span className={`font-medium tracking-tight transition-colors duration-300 ${
                  isHighlighted 
                    ? 'sm:text-neutral-900 dark:sm:text-white' 
                    : 'text-neutral-600 dark:text-neutral-300'
                }`}>
                  {phase.label}
                </span>
              </div>
              <span className="hidden sm:block text-[9px] text-neutral-500 dark:text-neutral-500 font-light mt-1 pl-4">
                {phase.subtitle}
              </span>

              {/* Glowing active line below phase */}
              <div className={`hidden sm:block h-[2px] absolute bottom-0 left-4 right-4 rounded-full transition-all duration-500 ${
                isHighlighted 
                  ? phase.domainIdx === 0 
                    ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]'
                    : phase.domainIdx === 1
                      ? 'bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.5)]'
                      : 'bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]'
                  : 'bg-transparent'
              }`} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Domain Card Component
function DomainCard({ domain, domainIdx, activeDomain, setActiveDomain }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const averageScore = (domain.skills.reduce((acc, curr) => acc + curr.score, 0) / domain.skills.length).toFixed(1);
  const isHighlighted = isHovered || activeDomain === domainIdx;

  return (
    <div className="flex flex-col">
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: domainIdx * 0.1, ease: [0.16, 1, 0.3, 1] }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => {
          setIsHovered(true);
          setActiveDomain(domainIdx);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          setActiveDomain(null);
        }}
        className={`glass-panel p-8 rounded-2xl flex flex-col border transition-all duration-500 min-h-[560px] relative group overflow-hidden ${
          isHighlighted 
            ? `${domain.borderHighlight} bg-white/40 dark:bg-neutral-950/40` 
            : 'border-neutral-250 dark:border-neutral-900 bg-neutral-50/20 dark:bg-neutral-950/20'
        }`}
        style={{
          boxShadow: isHighlighted ? `0 0 40px ${domain.glowColor}14` : 'none'
        }}
      >
        {/* Animated dot grid masked to cursor spotlight */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"
          style={{
            background: `radial-gradient(circle 220px at ${mousePos.x}px ${mousePos.y}px, ${domain.spotlightColor}, transparent 80%)`,
            WebkitMaskImage: 'radial-gradient(circle, black 1px, transparent 1.2px)',
            WebkitMaskSize: '20px 20px',
          }}
        />

        {/* Dynamic ambient card glow follow */}
        <div 
          className="absolute inset-0 opacity-10 group-hover:opacity-25 transition-opacity duration-700 pointer-events-none z-0"
          style={{
            background: `radial-gradient(circle 350px at ${mousePos.x}px ${mousePos.y}px, ${domain.glowColor}10, transparent 80%)`,
          }}
        />

        <div className="relative z-10 flex-1 flex flex-col justify-between">
          {/* Header */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest">
                Domain 04.{domainIdx + 1}
              </span>
              <span className={`text-[9px] px-2 py-0.5 rounded-full border transition-all duration-300 ${
                isHighlighted 
                  ? `${domain.averageBadgeBorder} ${domain.averageBadgeBg} ${domain.averageBadgeText} font-mono font-semibold`
                  : 'border-neutral-200 dark:border-neutral-800 bg-white/60 dark:bg-neutral-950/60 text-neutral-500 dark:text-neutral-400 font-mono font-medium'
              }`}>
                AVG: {averageScore}/10
              </span>
            </div>
            
            <h3 className={`text-lg font-semibold transition-colors duration-300 ${
              isHighlighted ? 'text-neutral-950 dark:text-white' : 'text-neutral-800 dark:text-neutral-200'
            }`}>
              {domain.category}
            </h3>
            
            <p className="text-xs text-neutral-600 dark:text-neutral-400 font-light leading-relaxed mb-6">
              {domain.desc}
            </p>
          </div>

          {/* Skill List Stack */}
          <div className="space-y-4.5 flex-1 justify-end flex flex-col">
            {domain.skills.map((skill, skillIdx) => (
              <SkillBar
                key={skill.name}
                name={skill.name}
                score={skill.score}
                barColorClass={domain.barColor}
                glowColor={domain.glowColor}
                idx={skillIdx}
                isInView={isInView}
              />
            ))}
          </div>
        </div>
      </motion.div>
      
      {/* Under-card label */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 + domainIdx * 0.1 }}
        className={`text-center mt-4 text-[10px] font-mono tracking-[0.25em] uppercase select-none font-medium transition-colors duration-300 ${
          isHighlighted ? 'text-neutral-700 dark:text-neutral-300' : 'text-neutral-400 dark:text-neutral-500'
        }`}
      >
        {domain.label}
      </motion.div>
    </div>
  );
}

const SKILL_DOMAINS = [
  {
    category: 'Growth & Revenue Systems',
    desc: 'Building scalable customer acquisition and monetization engines through data-driven experimentation and performance marketing.',
    label: '10+ Years',
    glowColor: '#3b82f6',
    spotlightColor: 'rgba(59, 130, 246, 0.15)',
    borderHighlight: 'border-blue-500/30',
    barColor: 'bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-400',
    averageBadgeBorder: 'border-blue-500/20',
    averageBadgeBg: 'bg-blue-500/10 dark:bg-blue-950/40',
    averageBadgeText: 'text-blue-600 dark:text-blue-400',
    skills: [
      { name: 'Performance Marketing', score: 10.0 },
      { name: 'Google Ads', score: 10.0 },
      { name: 'GTM Strategy', score: 9.5 },
      { name: 'Growth Analytics', score: 9.5 },
      { name: 'CRO & Experimentation', score: 9.0 },
      { name: 'Customer Lifecycle Optimization', score: 9.0 },
      { name: 'Stakeholder Management', score: 9.5 },
      { name: 'Team Leadership', score: 9.0 }
    ]
  },
  {
    category: 'AI & Automation',
    desc: 'Designing AI-powered workflows, automation systems, and intelligent decision-support tools that improve business efficiency and marketing performance.',
    label: 'Emerging Focus',
    glowColor: '#8b5cf6',
    spotlightColor: 'rgba(139, 92, 246, 0.15)',
    borderHighlight: 'border-violet-500/30',
    barColor: 'bg-gradient-to-r from-purple-700 via-violet-500 to-pink-500',
    averageBadgeBorder: 'border-violet-500/20',
    averageBadgeBg: 'bg-violet-500/10 dark:bg-violet-950/40',
    averageBadgeText: 'text-violet-600 dark:text-violet-400',
    skills: [
      { name: 'AI Workflow Design', score: 8.5 },
      { name: 'Prompt Engineering', score: 9.0 },
      { name: 'AI Agent Systems', score: 8.0 },
      { name: 'Marketing Automation', score: 9.0 },
      { name: 'Process Automation', score: 8.5 },
      { name: 'AI-Assisted Analytics', score: 8.5 },
      { name: 'LLM Application Development', score: 8.0 },
      { name: 'No-Code / Low-Code Systems', score: 8.0 }
    ]
  },
  {
    category: 'Data & Engineering',
    desc: 'Combining an engineering foundation with modern analytics to transform data into actionable business decisions.',
    label: 'Technical Foundation',
    glowColor: '#06b6d4',
    spotlightColor: 'rgba(6, 182, 212, 0.15)',
    borderHighlight: 'border-cyan-500/30',
    barColor: 'bg-gradient-to-r from-teal-600 via-cyan-500 to-blue-400',
    averageBadgeBorder: 'border-cyan-500/20',
    averageBadgeBg: 'bg-cyan-500/10 dark:bg-cyan-950/40',
    averageBadgeText: 'text-cyan-600 dark:text-cyan-400',
    skills: [
      { name: 'SQL', score: 9.0 },
      { name: 'Data Analysis', score: 9.0 },
      { name: 'Python', score: 7.5 },
      { name: 'Looker Studio', score: 9.0 },
      { name: 'Power BI', score: 8.0 },
      { name: 'Attribution & Measurement', score: 9.0 },
      { name: 'Data Architecture', score: 7.5 },
      { name: 'Product Thinking', score: 8.5 }
    ]
  }
];

export default function Skills() {
  const [activeDomain, setActiveDomain] = useState(null);
  const scrollContainerRef = useRef(null);
  const cardRefs = [useRef(null), useRef(null), useRef(null)];

  const handleScroll = () => {
    if (window.innerWidth >= 1024) return;
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const containerCenter = container.scrollLeft + container.clientWidth / 2;

    let closestIdx = 0;
    let minDistance = Infinity;

    cardRefs.forEach((ref, idx) => {
      const el = ref.current;
      if (el) {
        const cardCenter = el.offsetLeft + el.clientWidth / 2;
        const distance = Math.abs(containerCenter - cardCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestIdx = idx;
        }
      }
    });

    setActiveDomain(closestIdx);
  };

  const handlePhaseClick = (domainIdx) => {
    setActiveDomain(domainIdx);
    if (window.innerWidth < 1024) {
      const cardEl = cardRefs[domainIdx]?.current;
      if (cardEl) {
        cardEl.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <section id="skills" className="relative min-h-screen py-24 md:py-32 px-6 border-b border-neutral-200 dark:border-neutral-900/60 z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Title */}
        <div className="mb-16 max-w-4xl select-none">
          <span className="text-[10px] tracking-[0.35em] text-neutral-500 uppercase font-semibold block mb-3">04 // Competencies</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-neutral-900 dark:text-white mb-6">
            Core Skill <span className="text-gradient-silver font-medium">Spectrum</span>.
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400 font-light text-sm sm:text-base leading-relaxed max-w-3xl">
            A unique blend of growth strategy, AI systems thinking, and technical execution developed across software engineering, digital transformation consulting, and global performance marketing leadership.
          </p>
        </div>

        {/* Career Trajectory Mapping */}
        <ProgressionTrack 
          activeDomain={activeDomain} 
          setActiveDomain={setActiveDomain} 
          onPhaseClick={handlePhaseClick}
        />

        {/* Hide scrollbars style utility */}
        <style dangerouslySetInnerHTML={{__html: `
          .scrollbar-none::-webkit-scrollbar {
            display: none;
          }
        `}} />

        {/* Domains Grid */}
        <div 
          ref={scrollContainerRef}
          className="flex lg:grid overflow-x-auto lg:overflow-x-visible snap-x snap-mandatory lg:snap-none scrollbar-none lg:grid-cols-3 gap-6 lg:gap-8 pb-6 lg:pb-0 px-6 lg:px-0 -mx-6 lg:mx-0"
          style={{
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}
        >
          {SKILL_DOMAINS.map((domain, domainIdx) => (
            <div
              key={domain.category}
              ref={cardRefs[domainIdx]}
              className="snap-center shrink-0 w-[80vw] sm:w-[70vw] md:w-[55vw] lg:w-auto lg:shrink"
            >
              <DomainCard
                domain={domain}
                domainIdx={domainIdx}
                activeDomain={activeDomain}
                setActiveDomain={setActiveDomain}
              />
            </div>
          ))}
        </div>

        {/* Pagination Dots (Mobile/Tablet only) */}
        <div className="flex lg:hidden justify-center items-center gap-2 mt-6 select-none">
          {SKILL_DOMAINS.map((_, idx) => {
            const isActive = activeDomain === idx || (activeDomain === null && idx === 0);
            return (
              <button
                key={idx}
                onClick={() => handlePhaseClick(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  isActive 
                    ? 'w-6 bg-neutral-900 dark:bg-white' 
                    : 'w-1.5 bg-neutral-300 dark:bg-neutral-800'
                }`}
                aria-label={`Go to skill domain ${idx + 1}`}
              />
            );
          })}
        </div>

      </div>
    </section>
  );
}
