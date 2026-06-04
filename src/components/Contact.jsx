import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const COLLAB_CARDS = [
  {
    title: 'Growth Systems',
    desc: 'Build scalable acquisition, retention, and monetization engines.',
    icon: '🚀',
    topics: ['Performance Marketing', 'GTM Strategy', 'Growth Analytics', 'CRO']
  },
  {
    title: 'AI & Automation',
    desc: 'Design workflows that remove friction and multiply output.',
    icon: '🤖',
    topics: ['AI Agents', 'Marketing Automation', 'Internal Tools', 'Process Optimization']
  },
  {
    title: 'Product & Innovation',
    desc: 'Explore products, MVPs, experiments, and new ventures.',
    icon: '🛠',
    topics: ['SaaS Ideas', 'Product Strategy', 'Validation', 'Growth Loops']
  },
  {
    title: 'Advisory & Leadership',
    desc: 'Partner on growth, transformation, and team development.',
    icon: '📈',
    topics: ['Fractional Leadership', 'Strategic Planning', 'Team Building', 'Business Growth']
  }
];

// Single Social Link Component with underline and arrow reveal
function SocialLink({ name, url }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative text-[10px] sm:text-xs tracking-widest uppercase text-neutral-500 hover:text-white transition-colors duration-300 py-2 flex items-center gap-1.5 group select-none font-mono"
    >
      <span>{name}</span>
      
      {/* Sliding/Rotating diagonal arrow */}
      <span className="inline-block relative overflow-hidden w-3 h-3">
        <motion.span
          animate={isHovered ? { y: 0, x: 0, opacity: 1 } : { y: 8, x: -8, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 text-[10px] font-mono"
        >
          ↗
        </motion.span>
      </span>

      {/* Animating Underline bar */}
      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-neutral-900" />
      <motion.span
        initial={{ scaleX: 0 }}
        animate={isHovered ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-0 left-0 w-full h-[1px] bg-white origin-left"
        style={{
          boxShadow: '0 0 6px #ffffff'
        }}
      />
    </a>
  );
}

// Interactive Collab Card with hover states
function CollaborationCard({ title, desc, icon, topics, idx }) {
  const [isHovered, setIsHovered] = useState(false);
  const emailAddress = 'prasant@metaroy.com';
  
  // Dynamic subject line depending on path
  const mailToUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(`Collaboration: ${title.trim()}`)}`;

  return (
    <motion.a
      href={mailToUrl}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="glass-panel p-8 rounded-2xl border border-neutral-900 bg-neutral-950/20 transition-all duration-500 hover:border-neutral-800 hover:-translate-y-2 hover:bg-neutral-950/40 flex flex-col justify-between min-h-[250px] relative overflow-hidden group shadow-[0_4px_30px_rgba(0,0,0,0.45)]"
      style={{
        boxShadow: isHovered ? '0 12px 40px rgba(255,255,255,0.015)' : 'none'
      }}
    >
      {/* Subtle hover background radial glow */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle 180px at 50% 50%, rgba(255,255,255,0.06), transparent 100%)'
        }}
      />

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <motion.span 
            animate={isHovered ? { scale: 1.15, rotate: [0, -10, 10, 0] } : { scale: 1, rotate: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl select-none block"
          >
            {icon}
          </motion.span>
        </div>

        <h3 className="text-sm font-semibold text-white mb-2">
          {title}
        </h3>
        
        <p className="text-xs text-neutral-400 font-light leading-relaxed mb-4">
          {desc}
        </p>

        {/* Topics badges */}
        <div className="flex flex-wrap gap-1.5">
          {topics.map((topic) => (
            <span 
              key={topic} 
              className="text-[9px] font-mono text-neutral-500 border border-neutral-900 bg-neutral-950/40 px-2 py-0.5 rounded select-none"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>

      {/* Sliding slide-up CTA reveal */}
      <div className="relative z-10 mt-6 overflow-hidden h-5 flex items-center">
        <motion.div
          animate={isHovered ? { y: 0, opacity: 1 } : { y: 16, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="text-[10px] font-semibold text-white tracking-widest uppercase flex items-center gap-1 font-mono select-none"
        >
          Let's Discuss <span className="text-[9px] group-hover:translate-x-1 transition-transform duration-300">→</span>
        </motion.div>
      </div>
    </motion.a>
  );
}

// Manifesto Section with scroll-triggered staggered reveal
function Manifesto() {
  const lines = [
    "Engineer.",
    "Growth Strategist.",
    "AI Builder.",
    "Continuous Learner."
  ];

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <div ref={containerRef} className="mt-32 md:mt-48 text-center select-none max-w-4xl mx-auto">
      <div className="space-y-4 md:space-y-6">
        {lines.map((line, idx) => (
          <motion.div
            key={line}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: idx * 0.2, ease: [0.16, 1, 0.3, 1] }}
            className={`text-3xl sm:text-5xl md:text-6xl font-light tracking-tight leading-none ${
              idx === 3 
                ? 'text-gradient-silver font-medium' 
                : 'text-neutral-500'
            }`}
          >
            {line}
          </motion.div>
        ))}
      </div>

      {/* Subtext reveal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.0, delay: lines.length * 0.2 + 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="mt-12 text-xs sm:text-sm font-light text-neutral-400 max-w-xl mx-auto leading-relaxed"
      >
        "Building systems that scale people, products, and possibilities."
      </motion.div>
    </div>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="relative min-h-screen py-24 md:py-32 px-6 border-b border-neutral-900/60 z-10 overflow-hidden">
      
      {/* Background radial highlight glow */}
      <div className="absolute bottom-[20%] left-[50%] -translate-x-1/2 w-[600px] h-[300px] bg-neutral-900/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full flex flex-col justify-between min-h-[calc(100vh-120px)]">
        
        <div>
          {/* Section Header */}
          <div className="mb-16 select-none max-w-3xl">
            <span className="text-[10px] tracking-[0.35em] text-neutral-500 uppercase font-semibold block mb-3">
              06 // Connection
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white mb-6">
              Let's Build <span className="text-gradient-silver font-medium">Something Beyond</span>.
            </h2>
            <p className="text-neutral-400 font-light text-sm sm:text-base leading-relaxed">
              Whether you're scaling growth, implementing AI, building a product, or exploring new opportunities, I'm always interested in ambitious ideas and meaningful conversations.
            </p>
          </div>

          {/* Stage 1: Collaboration Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
            {COLLAB_CARDS.map((card, idx) => (
              <CollaborationCard
                key={card.title}
                title={card.title}
                desc={card.desc}
                icon={card.icon}
                topics={card.topics}
                idx={idx}
              />
            ))}
          </div>
        </div>

        {/* Stage 2: Manifesto block */}
        <Manifesto />

        {/* Social Layer Minimalist Footer */}
        <div className="mt-32 pt-12 border-t border-neutral-950 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="text-[9px] font-mono text-neutral-600 uppercase tracking-widest select-none">
            Digital coordinates
          </div>
          
          <div className="flex items-center space-x-6 sm:space-x-10">
            <SocialLink name="LinkedIn" url="https://www.linkedin.com/in/prasant-roy" />
            <SocialLink name="GitHub" url="https://github.com/imetaroy" />
            <SocialLink name="X / Twitter" url="https://x.com/iamprasantroy" />
          </div>
        </div>

      </div>
    </section>
  );
}
