import React from 'react';
import { motion } from 'framer-motion';
import {
  Rocket,
  Code2,
  Cpu,
  Layers,
  Database,
  ShieldCheck,
  Zap,
  Award,
  CheckCircle2,
  ArrowRight,
  Clock,
  Sparkles,
  TrendingUp,
  Workflow,
  Globe,
  Terminal,
} from 'lucide-react';
import Container from '../components/common/Container';
import SectionHeading from '../components/common/SectionHeading';
import CTASection from '../components/common/CTASection';
import SEO from '../components/common/SEO';

export const About = () => {
  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About NovaStack — Engineering Timeline & Milestones',
    description: 'Explore NovaStack timeline, journey, architectural philosophy, and engineering milestones in MERN stack development.',
    url: 'https://novastack.dev/about',
  };

  const timelineMilestones = [
    {
      period: '2023',
      phase: 'Phase 1: Inception & Core Vision',
      title: 'Founded on Pure Engineering Principles',
      icon: Rocket,
      badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      iconClass: 'bg-indigo-600 text-white shadow-indigo-500/30',
      tagline: 'Eliminating bloated agency layers to connect clients directly with lead full-stack engineers.',
      achievements: [
        'Built first-principles JavaScript/TypeScript architecture standard',
        'Standardized pure MERN stack patterns for sub-second page performance',
        'Delivered first 10 custom production web applications with 100% on-time record',
      ],
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'TailwindCSS'],
      metric: { label: 'Initial Deployments', value: '10+' },
    },
    {
      period: '2024',
      phase: 'Phase 2: Scalable Architecture',
      title: 'Enterprise MERN & Real-Time Systems',
      icon: Cpu,
      badgeClass: 'bg-blue-50 text-blue-700 border-blue-200',
      iconClass: 'bg-blue-600 text-white shadow-blue-500/30',
      tagline: 'Expanding into high-concurrency architectures, enterprise security, and multi-tenant systems.',
      achievements: [
        'Implemented enterprise-grade JWT, RBAC authorization, and Helmet security suites',
        'Architected real-time WebSocket pipelines handling 10k+ concurrent connections',
        'Built automated database indexing pipelines cutting average query times by 65%',
      ],
      technologies: ['MongoDB Atlas', 'Redis', 'WebSockets', 'Docker', 'JWT Auth'],
      metric: { label: 'Average Query Speed', value: '< 25ms' },
    },
    {
      period: '2025',
      phase: 'Phase 3: High-Performance Products',
      title: 'Microservices & Mission-Critical Cloud Apps',
      icon: TrendingUp,
      badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      iconClass: 'bg-emerald-600 text-white shadow-emerald-500/30',
      tagline: 'Scaling production client products to millions of requests with 99.9% guaranteed uptime.',
      achievements: [
        'Reached 50+ launched production projects across FinTech, SaaS, and E-commerce',
        'Introduced automated cost estimator algorithms with live currency calculations',
        'Standardized automated continuous testing and zero-downtime deployment workflows',
      ],
      technologies: ['Vite', 'React 18', 'Node Cluster', 'REST APIs', 'Cloudflare CDN'],
      metric: { label: 'Uptime Standard', value: '99.9%' },
    },
    {
      period: '2026 & Beyond',
      phase: 'Phase 4: Next-Gen AI & Modern Web',
      title: 'AI-Augmented Full-Stack & Ultra-Fast Web',
      icon: Sparkles,
      badgeClass: 'bg-purple-50 text-purple-700 border-purple-200',
      iconClass: 'bg-purple-600 text-white shadow-purple-500/30',
      tagline: 'Integrating intelligent backend pipelines, real-time analytics, and modern mobile-first experiences.',
      achievements: [
        'Native AI and vector search integration with MongoDB Atlas Vector Search',
        'Modern responsive app shells with native app-like mobile bottom navigation',
        'Dedicated customer portal with self-service project tracking and direct developer access',
      ],
      technologies: ['AI Pipelines', 'Vector DB', 'Modern PWA', 'Edge Functions', 'Next-Gen MERN'],
      metric: { label: 'Client Satisfaction', value: '100%' },
    },
  ];

  const stats = [
    { value: '50+', label: 'Projects Delivered', sub: 'Across diverse industries', color: 'text-indigo-600' },
    { value: '99.9%', label: 'Uptime Reliability', sub: 'Production cloud SLAs', color: 'text-blue-600' },
    { value: '100%', label: 'MERN Focused', sub: 'Zero context switching', color: 'text-emerald-600' },
    { value: '< 24h', label: 'Response Guarantee', sub: 'Engineer-to-client', color: 'text-purple-600' },
  ];

  const corePillars = [
    {
      icon: Zap,
      title: 'Sub-Second Performance',
      description: 'Zero bloated libraries. We hand-craft optimized React frontends and Node/Express backends for maximum Core Web Vitals score.',
    },
    {
      icon: ShieldCheck,
      title: 'Rock-Solid Security',
      description: 'Enterprise-grade authentication, sanitization, strict CORS, rate limiting, and bcrypt hashing built into the foundation.',
    },
    {
      icon: Workflow,
      title: 'Direct Engineer Access',
      description: 'No middle managers or lost-in-translation requirements. You collaborate directly with experienced full-stack engineers.',
    },
    {
      icon: Globe,
      title: 'Production-Ready Scale',
      description: 'Clean modular codebases designed from day one to handle traffic spikes, database scaling, and growing business complexity.',
    },
  ];

  return (
    <>
      <SEO
        title="About NovaStack — Company Timeline & Journey"
        description="Discover the NovaStack story and timeline. From foundations to enterprise full-stack engineering, see how we build software that lasts."
        schema={aboutSchema}
      />

      <section className="pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <SectionHeading
              badge="Company Timeline & Journey"
              title="How NovaStack"
              highlight="Evolved Over Time"
              subtitle="From architectural foundations to high-scale MERN products. Explore our milestones, growth, and continuous commitment to engineering excellence."
            />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto mt-12">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="rounded-3xl bg-white border border-slate-200/80 p-6 text-center shadow-xs"
              >
                <div className={`text-3xl sm:text-4xl font-extrabold ${stat.color} font-display`}>
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-800 mt-1">{stat.label}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">{stat.sub}</div>
              </motion.div>
            ))}
          </div>

          <div className="relative max-w-4xl mx-auto mt-20 sm:mt-28">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
              style={{ transformOrigin: 'top' }}
              className="absolute left-4 sm:left-1/2 top-4 bottom-8 -translate-x-1/2 w-0.5 bg-gradient-to-b from-indigo-500 via-blue-500 to-purple-500 opacity-40"
              aria-hidden="true"
            />

            <div className="space-y-12 sm:space-y-16">
              {timelineMilestones.map((item, index) => {
                const isEven = index % 2 === 0;
                const IconComponent = item.icon;

                return (
                  <div
                    key={item.period}
                    className="relative flex flex-col sm:flex-row items-start group"
                  >
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: '-80px' }}
                      transition={{
                        type: 'spring',
                        stiffness: 260,
                        damping: 20,
                        delay: 0.1,
                      }}
                      className="absolute left-4 sm:left-1/2 -translate-x-1/2 flex items-center justify-center z-10"
                    >
                      <div
                        className={`w-10 h-10 rounded-2xl ${item.iconClass} flex items-center justify-center shadow-md ring-4 ring-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                      >
                        <IconComponent className="w-4 h-4" />
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{
                        opacity: 0,
                        x: isEven ? -40 : 40,
                        y: 20,
                      }}
                      whileInView={{
                        opacity: 1,
                        x: 0,
                        y: 0,
                      }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{
                        duration: 0.6,
                        delay: 0.15,
                        ease: [0.21, 0.47, 0.32, 0.98],
                      }}
                      className={`w-full sm:w-1/2 pl-12 sm:pl-0 ${
                        isEven
                          ? 'sm:pr-12 sm:text-right'
                          : 'sm:pl-12 sm:ml-auto sm:text-left'
                      }`}
                    >
                      <motion.div
                        whileHover={{ y: -4, transition: { duration: 0.2 } }}
                        className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-xs hover:shadow-lg hover:border-indigo-200 transition-all duration-300"
                      >
                        <div
                          className={`flex items-center gap-2 flex-wrap mb-3 ${
                            isEven ? 'sm:justify-end' : 'sm:justify-start'
                          }`}
                        >
                          <span
                            className={`inline-flex items-center px-2.5 py-1 rounded-xl text-xs font-bold border ${item.badgeClass}`}
                          >
                            {item.period}
                          </span>
                          <span className="text-xs font-semibold text-slate-500">
                            {item.phase}
                          </span>
                        </div>

                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-display">
                          {item.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed font-normal">
                          {item.tagline}
                        </p>

                        <div className="my-4 pt-4 border-t border-slate-100 space-y-2">
                          {item.achievements.map((achieve, aIdx) => (
                            <div
                              key={aIdx}
                              className={`flex items-start gap-2 text-xs text-slate-700 font-normal ${
                                isEven ? 'sm:justify-end' : 'sm:justify-start'
                              }`}
                            >
                              <CheckCircle2
                                className={`w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5 ${
                                  isEven ? 'sm:order-2' : ''
                                }`}
                              />
                              <span className={isEven ? 'sm:text-right' : 'sm:text-left'}>
                                {achieve}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div
                          className={`flex items-center gap-1.5 flex-wrap pt-2 ${
                            isEven ? 'sm:justify-end' : 'sm:justify-start'
                          }`}
                        >
                          {item.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-28">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-2xl mx-auto mb-12"
            >
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                Our Non-Negotiable <span className="text-indigo-600">Core Pillars</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 font-normal">
                Every project we undertake is built around four foundational engineering commitments.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {corePillars.map((pillar, pIdx) => {
                const PillarIcon = pillar.icon;
                return (
                  <motion.div
                    key={pillar.title}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{
                      duration: 0.5,
                      delay: pIdx * 0.1,
                      ease: [0.21, 0.47, 0.32, 0.98],
                    }}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="rounded-3xl bg-white border border-slate-200/80 p-6 space-y-3 shadow-xs hover:border-indigo-200 hover:shadow-md transition-all"
                  >
                    <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center font-bold">
                      <PillarIcon className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold text-slate-900">{pillar.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {pillar.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      <CTASection
        title="Ready to Build Your Next Milestone With Us?"
        subtitle="Let's discuss how NovaStack can architect, design, and engineer your next high-performance web application."
      />
    </>
  );
};

export default About;
