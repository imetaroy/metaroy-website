import React from 'react';
import { motion } from 'framer-motion';

const EXPERIENCES = [
  {
    role: 'Senior Manager – Digital Marketing',
    company: 'Pearl.com (JustAnswer)',
    period: '2019 – Present',
    description: 'Built a data-driven growth engine combining performance marketing, AI, experimentation, and customer lifecycle optimization managing $30M+ in annual spends. Led cross-functional initiatives spanning acquisition, retention, monetization, and 0→1 new business initiatives.',
    metrics: [
      { label: 'Contribution Margin (CM1) Generated', value: '$50M+' },
      { label: 'Y-O-Y CM1 Growth', value: '29%' },
      { label: 'ARR Generated from 0→1 Initiatives', value: '$1M+' },
      { label: 'Higher LTV/User', value: '68%' }
    ],
    skills: ['Performance Marketing', 'AI-Powered Growth', 'LTV Optimization', 'Revenue Operations']
  },
  {
    role: 'Executive MBA',
    company: 'XLRI Jamshedpur',
    period: '2018 – 2019',
    description: 'Completed an Executive MBA in General Management from XLRI Jamshedpur, strengthening my understanding of strategy, finance, operations, organizational behavior, and leadership. The program helped bridge my technical and marketing background with broader business decision-making, creating the foundation for future leadership roles in growth, revenue, and digital transformation. Alongside academics, actively contributed to student leadership initiatives and institutional branding activities.',
    badge: 'Education & Leadership',
    isEducation: true,
    highlights: [
      { title: 'General Secretary — Branding Committee', desc: 'Led branding and communication initiatives for student-led programs, events, and community engagement activities.' },
      { title: 'Business Leadership Foundation', desc: 'Built expertise across Strategy, Finance, Operations, Marketing, and Organizational Leadership, developing a holistic understanding of how businesses scale and operate.' },
      { title: 'Stakeholder Management', desc: 'Collaborated with faculty, peers, alumni, and industry participants to drive committee initiatives and strengthen community engagement.' },
      { title: 'Career Transformation Milestone', desc: 'Used the MBA experience to evolve from a marketing practitioner into a growth and business leader capable of operating across technology, strategy, and commercial functions.' }
    ],
    skills: ['General Management', 'Business Strategy', 'Leadership', 'Brand Management']
  },
  {
    role: 'Marketing Manager',
    company: '7EDGE',
    period: '2017 – 2018',
    description: 'Built and scaled the digital marketing practice for a fast-growing technology consulting firm. Led go-to-market initiatives for B2B SaaS and enterprise clients, implemented marketing automation systems, and drove demand generation programs that improved lead quality and pipeline velocity.',
    metrics: [
      { label: 'Higher Lead Quality', value: '43%' },
      { label: 'Stronger Brand Engagement', value: '41%' },
      { label: 'Successful Projects Delivered', value: '10+' },
      { label: 'Growth Channels Optimized', value: '4+' }
    ],
    skills: ['GTM Strategy', 'Marketing Automation', 'HubSpot', 'Website Transformation']
  },
  {
    role: 'Software Engineer',
    company: 'Misys (Now Finastra)',
    period: '2014 – 2017',
    description: 'Built and enhanced enterprise lending software used by global financial institutions. Developed backend services, database components, and product features while collaborating with cross-functional teams in an agile delivery environment. This experience established the technical foundation that later enabled my work in marketing automation, analytics, AI, and growth engineering.',
    metrics: [
      { label: 'Major Product Enhancements Delivered', value: '5+' },
      { label: 'L3 Defects Resolved', value: '100+' },
      { label: 'SPOT Awards received', value: '3' }
    ],
    skills: ['Software Engineering', 'Enterprise Applications', 'SQL & Databases', 'API Development']
  }
];

export default function Experience() {
  return (
    <section id="experience" className="relative min-h-screen py-24 md:py-32 px-6 border-b border-neutral-200 dark:border-neutral-900/60 z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Title */}
        <div className="mb-20">
          <span className="text-[10px] tracking-[0.35em] text-neutral-500 uppercase font-semibold block mb-3">02 // Experience</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-neutral-900 dark:text-white">
            Professional <span className="text-gradient-silver font-medium">Trajectory</span>.
          </h2>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Timeline */}
          <div className="lg:col-span-8 relative border-l border-neutral-200 dark:border-neutral-900 pl-6 sm:pl-10 space-y-16">
            {EXPERIENCES.map((exp, idx) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative group"
              >
                {/* Timeline Indicator Node (Supports unique gold highlights for MBA milestones) */}
                <div className={`absolute -left-[31px] sm:-left-[47px] top-1.5 w-[11px] h-[11px] rounded-full border transition-all duration-300 ${
                  exp.isEducation 
                    ? 'border-yellow-500/80 bg-yellow-500/15 dark:bg-yellow-950/40 shadow-[0_0_8px_rgba(234,179,8,0.4)] group-hover:bg-yellow-400 group-hover:scale-125'
                    : 'border-neutral-300 dark:border-neutral-800 bg-white dark:bg-black group-hover:bg-neutral-900 dark:group-hover:bg-white group-hover:scale-125'
                }`} />

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6">
                  
                  {/* Meta details (Role/Company/Period) */}
                  <div className="sm:col-span-4">
                    <span className="text-xs font-mono text-neutral-500 block mb-2">{exp.period}</span>
                    
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className={`text-base sm:text-lg font-medium transition-colors ${
                        exp.isEducation 
                          ? 'text-yellow-500/90 group-hover:text-yellow-400' 
                          : 'text-neutral-900 dark:text-white group-hover:text-neutral-600 dark:group-hover:text-neutral-300'
                      }`}>
                        {exp.role}
                      </h3>
                      {exp.isEducation && (
                        <svg className="w-3.5 h-3.5 text-yellow-500 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.25L2.25 9.15l9.75 4.9 9.75-4.9L12 4.25z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12v5c0 1.5 2.7 2.75 6 2.75s6-1.25 6-2.75v-5" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 9.15v5.85a.75.75 0 01-.75.75h-.75" />
                        </svg>
                      )}
                    </div>

                    <span className="text-sm text-neutral-500 dark:text-neutral-400 font-light block mt-1">{exp.company}</span>
                    
                    {/* Badge details */}
                    {exp.badge && (
                      <span className={`inline-block text-[9px] font-mono px-2 py-0.5 rounded border mt-2.5 ${
                        exp.isEducation 
                          ? 'border-yellow-500/20 bg-yellow-950/30 text-yellow-400 shadow-[0_0_10px_rgba(234,179,8,0.08)]'
                          : 'border-neutral-200 dark:border-neutral-800 bg-neutral-100/50 dark:bg-neutral-950/40 text-neutral-600 dark:text-neutral-400'
                      }`}>
                        {exp.badge}
                      </span>
                    )}

                    {/* Skill Badges */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {exp.skills.map(skill => (
                        <span key={skill} className="text-[10px] px-2.5 py-1 rounded bg-neutral-100/50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-900 text-neutral-600 dark:text-neutral-400 font-mono">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>                    {/* Content and stats */}
                  <div className="sm:col-span-8">
                    <p className="text-neutral-600 dark:text-neutral-400 font-light text-sm sm:text-base leading-relaxed mb-6 whitespace-pre-line">
                      {exp.description}
                    </p>

                    {/* Highlights Panel (Education) or Impact Grid (Jobs) */}
                    {exp.isEducation ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-yellow-500/5 dark:bg-yellow-950/10 border border-yellow-500/10 dark:border-yellow-900/20 p-5 rounded-2xl">
                        {exp.highlights.map(h => (
                          <div key={h.title} className="flex flex-col">
                            <span className="text-[10px] font-semibold text-yellow-600 dark:text-yellow-400 tracking-tight mb-1 font-sans">
                              {h.title}
                            </span>
                            <span className="text-[10px] text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                              {h.desc}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 bg-white/40 dark:bg-neutral-950/40 border border-neutral-200 dark:border-neutral-900/60 p-4 sm:p-6 rounded-2xl">
                        {exp.metrics.map(metric => (
                          <div key={metric.label} className="flex flex-col">
                            <span className="text-xl sm:text-2xl font-mono font-medium text-neutral-900 dark:text-white">
                              {metric.value}
                            </span>
                            <span className="text-[10px] text-neutral-500 dark:text-neutral-500 tracking-wider uppercase mt-1 font-medium leading-tight">
                              {metric.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Column: Sticky polished landscape photo & CV Download */}
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card p-2 rounded-2xl border border-neutral-200 dark:border-neutral-900 bg-white/40 dark:bg-neutral-950/20"
            >
              <div className="aspect-square overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-900/60 relative">
                <img
                  src="/assets/prasant-experience.png"
                  alt="Prasant Roy Portrait"
                  className="w-full h-full object-cover object-top filter grayscale contrast-110 brightness-95 hover:filter-none transition-all duration-750 ease-out select-none pointer-events-none"
                />
                <div className="absolute inset-0 bg-neutral-950/15 mix-blend-overlay pointer-events-none" />
              </div>
              <div className="p-3 text-center">
                <span className="text-[9px] font-mono text-neutral-500 tracking-widest uppercase">
                  SCALE & OUTCOME // DIGITAL GROWTH
                </span>
              </div>
            </motion.div>

            {/* Standalone CV Download Button */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 w-full flex justify-center"
            >
              <a
                href="https://drive.google.com/file/d/1NGY9ayHGpGD3R4lGvvnA2-2DngvlsCK7/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center text-xs font-semibold tracking-[0.15em] uppercase border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-500 bg-white dark:bg-neutral-950 py-4 rounded-full transition-all duration-300 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white shadow-sm dark:shadow-none"
              >
                Download My CV
              </a>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
