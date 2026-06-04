import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Custom CSS animation style injection for blinking cursor
const TerminalCursorStyle = () => (
  <style dangerouslySetInnerHTML={{__html: `
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
    .cursor-blink {
      animation: blink 1s step-end infinite;
    }
  `}} />
);

// Single Project Card Component
function ProjectCard({ project, idx }) {
  const [isHovered, setIsHovered] = useState(false);

  // Large/Featured cards span 2 columns on desktop
  const isWide = project.isFeatured || project.isWide;

  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`glass-card rounded-2xl border border-neutral-900 bg-neutral-950/20 overflow-hidden flex flex-col justify-between transition-all duration-500 hover:border-neutral-800 hover:-translate-y-2 hover:bg-neutral-950/40 relative group ${
        isWide ? 'lg:col-span-2' : 'lg:col-span-1'
      }`}
      style={{
        boxShadow: isHovered ? '0 12px 40px rgba(255,255,255,0.015)' : 'none'
      }}
    >
      {/* Dynamic layout split for wide desktop cards */}
      <div className={`flex flex-col h-full ${isWide ? 'lg:flex-row' : 'flex-col'}`}>
        
        {/* Content Details Area */}
        <div className={`p-8 flex flex-col justify-between flex-1 ${isWide ? 'lg:w-[55%]' : 'w-full'}`}>
          <div>
            {/* Badges row */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest">
                {project.category}
              </span>
              <div className="flex items-center space-x-2">
                {isHovered && (
                  <span className="text-[8px] font-mono text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Open Project //
                  </span>
                )}
                <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${
                  project.badge === 'Featured'
                    ? 'border-yellow-500/20 bg-yellow-950/30 text-yellow-400 font-semibold shadow-[0_0_10px_rgba(234,179,8,0.08)]'
                    : project.badge === 'Live'
                      ? 'border-emerald-500/20 bg-emerald-950/30 text-emerald-400'
                      : project.badge === 'Beta'
                        ? 'border-indigo-500/20 bg-indigo-950/30 text-indigo-400'
                        : 'border-neutral-800 bg-neutral-900/60 text-neutral-400'
                }`}>
                  {project.badge}
                </span>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-neutral-200 transition-colors">
              {project.title}
            </h3>

            <p className="text-xs text-neutral-400 font-light leading-relaxed mb-6 whitespace-pre-line">
              {project.desc}
            </p>

            {/* Metrics display block (Only for Card 1 Portfolio) */}
            {project.metrics && (
              <div className="grid grid-cols-2 gap-4 my-6 p-4 rounded-xl border border-neutral-900/60 bg-neutral-950/40">
                {project.metrics.map((m) => (
                  <div key={m.label} className="flex flex-col">
                    <span className="text-sm font-semibold text-white font-sans">{m.val}</span>
                    <span className="text-[9px] font-mono text-neutral-500 mt-0.5">{m.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            {/* Tech stack listing */}
            {project.tech && (
              <div className="flex flex-wrap gap-2 mb-6 pt-4 border-t border-neutral-900/40">
                {project.tech.map((t) => (
                  <span key={t} className="text-[9px] font-mono text-neutral-500 select-none">
                    #{t}
                  </span>
                ))}
              </div>
            )}

            {/* Dynamic arrow sliding CTA */}
            <div className="flex items-center text-xs font-semibold text-white tracking-widest uppercase font-mono mt-2 select-none">
              <span>{project.cta}</span>
              <motion.span 
                animate={isHovered ? { x: 5 } : { x: 0 }}
                transition={{ duration: 0.3 }}
                className="ml-1.5"
              >
                →
              </motion.span>
            </div>
          </div>
        </div>

        {/* Visual Mockup Showcase Area */}
        <div className={`bg-neutral-900/10 p-6 flex items-center justify-center border-t border-neutral-900/40 ${
          isWide 
            ? 'lg:w-[45%] lg:border-t-0 lg:border-l lg:border-neutral-900/40 min-h-[280px]' 
            : 'w-full h-56'
        }`}>
          <div className="w-full h-full">
            {project.mockup}
          </div>
        </div>

      </div>
    </motion.a>
  );
}

export default function Projects() {
  const PROJECTS_LIST = [
    {
      title: 'Growth, AI & Digital Transformation Portfolio',
      desc: 'A comprehensive showcase of my career across software engineering, marketing transformation, performance marketing leadership, AI-powered growth systems, and revenue optimization.\n\nExplore professional achievements, business outcomes, technical capabilities, leadership experience, and selected projects built throughout my journey.',
      category: 'Professional Portfolio',
      badge: 'Featured',
      cta: 'View Portfolio',
      url: 'https://shorturl.at/xpDkB',
      isFeatured: true,
      metrics: [
        { val: '$15.7M', label: 'ARR Growth' },
        { val: '68%', label: 'LTV Increase' },
        { val: '$1.5M+/Mo', label: 'Ad Spend Managed' },
        { val: '30%', label: 'Churn Reduction' }
      ],
      mockup: (
        <div className="relative w-full h-full bg-[#050505] rounded-xl border border-neutral-900 p-4 flex flex-col justify-between font-mono text-[9px] text-neutral-500 overflow-hidden shadow-inner">
          <div className="flex items-center justify-between border-b border-neutral-900 pb-2 text-[8px]">
            <div className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-neutral-400">METAROY EXEC DASHBOARD // ACTIVE</span>
            </div>
            <span className="text-neutral-500">v1.0.4</span>
          </div>

          <div className="flex-1 flex flex-col justify-center space-y-3 my-2">
            {/* Mocked mini line chart */}
            <div className="flex justify-between items-end h-12 px-2 border-b border-neutral-900 pb-1">
              <div className="w-[12%] h-[20%] bg-neutral-900 rounded-sm" />
              <div className="w-[12%] h-[35%] bg-neutral-900 rounded-sm" />
              <div className="w-[12%] h-[50%] bg-neutral-900 rounded-sm" />
              <div className="w-[12%] h-[75%] bg-neutral-900 rounded-sm animate-pulse" />
              <div className="w-[12%] h-[90%] bg-gradient-to-t from-blue-600 to-cyan-500 rounded-sm" />
            </div>

            {/* Sparkline and logs */}
            <div className="flex justify-between items-center text-[8px] bg-neutral-950 p-1.5 rounded border border-neutral-900/60">
              <span className="text-neutral-400">ARR PERFORMANCE:</span>
              <span className="text-emerald-400 font-semibold">+18.4% MoM LIFT</span>
            </div>
            
            <div className="text-[7px] text-neutral-600 space-y-1">
              <div>&gt; INSIGHT: High LTV opportunity detected in organic loops.</div>
              <div>&gt; STATUS: Automating GTM allocation updates... COMPLETE.</div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'AdIntel AI',
      desc: 'An AI-powered campaign intelligence platform that transforms Google Ads exports into actionable optimization recommendations.\n\nAnalyzes performance trends, identifies inefficiencies, highlights growth opportunities, and generates strategic recommendations using large language models.',
      category: 'AI Marketing Intelligence',
      badge: 'Live',
      tech: ['Python', 'Gemini API', 'Streamlit', 'Google Ads'],
      cta: 'View Repository',
      url: 'https://github.com/imetaroy/adintel-ai',
      mockup: (
        <div className="relative w-full h-full bg-[#050505] rounded-xl border border-neutral-900 p-4 flex flex-col justify-between font-mono text-[9px] text-neutral-500 overflow-hidden shadow-inner">
          <div className="flex items-center justify-between border-b border-neutral-900 pb-2 text-[8px]">
            <span className="text-neutral-400">ADINTEL AI // CAMPAIGN INSPECTOR</span>
            <span className="text-neutral-500">gemini-1.5-pro</span>
          </div>

          <div className="flex-1 flex flex-col justify-center space-y-2.5 my-2">
            {/* File drop simulation */}
            <div className="border border-dashed border-neutral-800 p-2 rounded text-center text-[7px] text-neutral-400 bg-neutral-950/40">
              📁 google_ads_q2_export.csv (Loaded)
            </div>

            {/* AI suggestion output box */}
            <div className="bg-neutral-950 p-2 rounded border border-neutral-900 text-[7px] space-y-1 leading-normal">
              <span className="text-violet-400 font-semibold block">GEMINI RECOMMENDATION:</span>
              <span className="text-neutral-300 block">"Shift 15% budget from 'Competitor_Intent' (ROAS &lt; 1.0) to 'Brand_Core' ad group."</span>
            </div>

            <div className="flex justify-between items-center text-[7px] pt-1">
              <span className="text-neutral-600">CONFIDENCE LEVEL:</span>
              <span className="text-emerald-400">94% CONFIDENT</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Career Intelligence Engine',
      desc: 'An intelligent career optimization platform that analyzes job opportunities, identifies skill gaps, and generates role-specific resumes optimized for ATS systems.\n\nBuilt to help professionals align their experience with market demand and improve interview opportunities.',
      category: 'AI Career Systems',
      badge: 'Beta',
      tech: ['Python', 'Gemini API', 'NLP', 'Resume Parsing'],
      cta: 'View Repository',
      url: 'https://github.com/imetaroy/career-intelligence-engine',
      mockup: (
        <div className="relative w-full h-full bg-[#050505] rounded-xl border border-neutral-900 p-4 flex flex-col justify-between font-mono text-[9px] text-neutral-500 overflow-hidden shadow-inner">
          <div className="flex items-center justify-between border-b border-neutral-900 pb-2 text-[8px]">
            <span className="text-neutral-400">ATS ANALYZER // RESUME_OPTIMIZER</span>
            <span className="text-neutral-500">READY</span>
          </div>

          <div className="flex-1 flex flex-col justify-center space-y-2.5 my-2">
            {/* Score Ring simulation */}
            <div className="flex items-center justify-between bg-neutral-950 p-2 rounded border border-neutral-900">
              <span className="text-neutral-300">ATS Match Rating:</span>
              <span className="text-xs text-cyan-400 font-semibold">85 / 100</span>
            </div>

            {/* Resume gaps info */}
            <div className="space-y-1 text-[7px] leading-relaxed">
              <div className="flex items-center space-x-1.5 text-neutral-400">
                <span className="w-1 h-1 rounded-full bg-rose-500" />
                <span>Missing Keyword: "LTV Modeling"</span>
              </div>
              <div className="flex items-center space-x-1.5 text-neutral-400">
                <span className="w-1 h-1 rounded-full bg-rose-500" />
                <span>Missing Keyword: "Python Automation"</span>
              </div>
              <div className="flex items-center space-x-1.5 text-neutral-400">
                <span className="w-1 h-1 rounded-full bg-emerald-500" />
                <span>Found Keyword: "GTM Systems"</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Open Source Experiments',
      desc: 'A collection of experiments exploring AI, automation, analytics, growth systems, APIs, developer tools, and workflow optimization.\n\nBuilt as a continuous learning laboratory for testing ideas and transforming concepts into usable products.',
      category: 'Open Source Lab',
      badge: 'Active',
      cta: 'Explore GitHub',
      url: 'https://github.com/imetaroy',
      isWide: true,
      mockup: (
        <div className="relative w-full h-full bg-[#050505] rounded-xl border border-neutral-900 p-4 flex flex-col justify-between font-mono text-[9px] text-neutral-500 overflow-hidden shadow-inner">
          <TerminalCursorStyle />
          
          <div className="flex items-center justify-between border-b border-neutral-900 pb-2 text-[8px] mb-2 select-none">
            <span className="text-neutral-400">imetaroy@metaroy-os:~$ python run_lab.py</span>
            <span className="text-neutral-600">bash // shell</span>
          </div>

          <div className="flex-1 flex flex-col space-y-1.5 justify-center font-mono text-neutral-400 leading-normal text-[8px]">
            <div>&gt; Loading repositories... [OK]</div>
            <div className="pl-3 text-neutral-500">
              - imetaroy/adintel-ai (main) // active<br/>
              - imetaroy/career-intelligence-engine (dev) // 92% match<br/>
              - imetaroy/landing-page-cro-analyzer // optimization<br/>
              - imetaroy/marketing-utilities // script-suite<br/>
              - imetaroy/ai-agent-experiments // multi-agent
            </div>
            <div className="text-white flex items-center gap-0.5">
              <span>&gt; initializing continuous-learning-lab</span>
              <span className="w-1 h-3.5 bg-white inline-block cursor-blink" />
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <section id="projects" className="relative min-h-screen py-24 md:py-32 px-6 border-b border-neutral-900/60 z-10 overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute right-0 top-[30%] w-[350px] h-[350px] rounded-full bg-cyan-500/3 blur-[100px] pointer-events-none" />
      <div className="absolute left-0 bottom-[10%] w-[400px] h-[400px] rounded-full bg-indigo-500/3 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20">
          <div className="max-w-xl select-none">
            <span className="text-[10px] tracking-[0.35em] text-neutral-500 uppercase font-semibold block mb-3">
              03 // Showcase
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white mb-4">
              Products & <span className="text-gradient-silver font-medium">Systems</span>.
            </h2>
          </div>
          <p className="text-neutral-400 max-w-lg mt-4 md:mt-0 font-light text-sm sm:text-base leading-relaxed">
            Real-world tools, experiments, and platforms built at the intersection of growth, AI, automation, and engineering.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {PROJECTS_LIST.map((project, idx) => (
            <ProjectCard
              key={project.title}
              project={project}
              idx={idx}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
