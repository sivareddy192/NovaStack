import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Code2,
  Cpu,
  Layers,
  Database,
  ShieldCheck,
  Zap,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Award,
  ChevronRight,
  Calculator,
  Terminal,
} from 'lucide-react';
import Container from '../components/common/Container';
import SectionHeading from '../components/common/SectionHeading';
import ProjectCard from '../components/cards/ProjectCard';
import ServiceCard from '../components/cards/ServiceCard';
import InsightCard from '../components/cards/InsightCard';
import FadeIn, { StaggerContainer } from '../components/animations/FadeIn';
import CTASection from '../components/common/CTASection';
import SEO from '../components/common/SEO';
import { getProjects, getServices, getInsights } from '../services/api';
import { trackEvent } from '../utils/analytics';

export const Home = () => {
  const [projects, setProjects] = useState([]);
  const [services, setServices] = useState([]);
  const [insights, setInsights] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const [projData, servData, insData] = await Promise.all([
          getProjects({ featured: true }),
          getServices(),
          getInsights({ limit: 3 }),
        ]);
        setProjects(projData);
        setServices(servData.slice(0, 6)); // Top 6 on home
        setInsights(insData.slice(0, 3));
      } catch (err) {
        console.error('Home data load error:', err);
      } finally {
        setLoading(false);
      }
    };
    loadHomeData();
  }, []);

  const categories = ['All', 'Food Ordering', 'E-Commerce', 'Dashboard', 'SaaS'];
  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const homeSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'NovaStack',
    url: 'https://novastack.dev',
    logo: 'https://novastack.dev/favicon.svg',
    description:
      'NovaStack is an elite software development business specializing in modern, scalable web applications built with the MERN stack.',
    sameAs: [
      'https://github.com/novastack',
      'https://twitter.com/novastack_dev',
      'https://linkedin.com/company/novastack-dev',
    ],
  };

  return (
    <>
      <SEO
        title="NovaStack — Modern Digital Products. Built to Scale."
        description="We design and build fast, scalable web applications that help businesses grow using the MERN stack (React, Node.js, Express, MongoDB)."
        schema={homeSchema}
      />

      {/* ==================== 1. HERO SECTION ==================== */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            {/* Tagline Pill */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide uppercase bg-indigo-50 text-indigo-700 border border-indigo-200/80 mb-8"
            >
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>Modern Digital Products. Built to Scale.</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 font-display leading-[1.1] sm:leading-[1.15]"
            >
              We Build Digital Products That{' '}
              <span className="text-indigo-600">Move Businesses Forward.</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal"
            >
              NovaStack builds modern, scalable, and high-performance web applications using the <span className="text-slate-900 font-semibold">MERN Stack</span> (React, Node.js, Express, MongoDB) with a product-first engineering mindset.
            </motion.p>

            {/* Hero CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                to="/contact"
                onClick={() => trackEvent('hero_cta_start_project')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-150"
              >
                Start Your Project
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/projects"
                onClick={() => trackEvent('hero_cta_explore_work')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-base font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 transition-all duration-150"
              >
                Explore Our Work
              </Link>
            </motion.div>

            {/* MERN Stack Technology Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-12 flex flex-wrap items-center justify-center gap-3"
            >
              <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold mr-1">
                Core Engine:
              </span>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cyan-50 text-cyan-700 border border-cyan-200 text-xs font-semibold">
                <Code2 className="w-3.5 h-3.5 text-cyan-600" />
                <span>React.js</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
                <Cpu className="w-3.5 h-3.5 text-emerald-600" />
                <span>Node.js</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-semibold">
                <Layers className="w-3.5 h-3.5 text-indigo-600" />
                <span>Express.js</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-green-50 text-green-700 border border-green-200 text-xs font-semibold">
                <Database className="w-3.5 h-3.5 text-green-600" />
                <span>MongoDB</span>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ==================== 2. TRUST STATS & METRICS ==================== */}
      <section className="py-12 border-y border-slate-200 bg-white">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x-0 sm:divide-x divide-slate-100">
            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
                100%
              </div>
              <div className="text-xs sm:text-sm text-slate-500 font-medium">
                MERN Stack Specialized
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-indigo-600 font-display">
                &lt; 1s
              </div>
              <div className="text-xs sm:text-sm text-slate-500 font-medium">
                Target Page Load Time
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
                99.9%
              </div>
              <div className="text-xs sm:text-sm text-slate-500 font-medium">
                Architecture Uptime SLA
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-600 font-display">
                Zero
              </div>
              <div className="text-xs sm:text-sm text-slate-500 font-medium">
                Vendor Platform Lock-in
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ==================== 3. SERVICES PREVIEW ==================== */}
      <section className="py-20 md:py-28">
        <Container>
          <SectionHeading
            badge="Engineering Capabilities"
            title="Software Built to"
            highlight="Perform & Scale"
            subtitle="From high-concurrency ordering engines to enterprise dashboards, we architect full-stack solutions with clean code, type safety, and sub-second performance."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-16">
            {services.map((service, index) => (
              <FadeIn key={service.slug} delay={index * 0.08}>
                <ServiceCard service={service} />
              </FadeIn>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 transition-all"
            >
              <span>Explore All 8 Specialized Services</span>
              <ArrowRight className="w-4 h-4 text-indigo-600" />
            </Link>
          </div>
        </Container>
      </section>

      {/* ==================== 4. SELECTED WORK / PORTFOLIO ==================== */}
      <section className="py-20 md:py-28 bg-slate-50 border-y border-slate-200">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 bg-indigo-50 text-indigo-700 border border-indigo-200">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>Featured Portfolio</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight font-display">
                Real Digital Products. <br />
                <span className="text-indigo-600">Measurable Outcomes.</span>
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.slice(0, 3).map((project, idx) => (
              <FadeIn key={project.slug} delay={idx * 0.1}>
                <ProjectCard project={project} />
              </FadeIn>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-all"
            >
              <span>View All Production Case Studies</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Container>
      </section>

      {/* ==================== 5. WHY NOVASTACK ==================== */}
      <section className="py-20 md:py-28">
        <Container>
          <SectionHeading
            badge="The NovaStack Difference"
            title="Engineered for Founders Who"
            highlight="Demand Excellence"
            subtitle="We don't do generic templates or outsourced code. We partner directly with companies as dedicated full-stack software engineers."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="rounded-3xl bg-white border border-slate-200 p-8 transition-all hover:border-slate-300">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-6">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                High Performance by Default
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Every line of React and Express is written for sub-second responses, instant navigation, optimized database indexes, and green Core Web Vitals.
              </p>
            </div>

            <div className="rounded-3xl bg-white border border-slate-200 p-8 transition-all hover:border-slate-300">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-6">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                100% Clean MERN Architecture
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Modular component structures, RESTful endpoint controllers, secure JWT auth, and scalable MongoDB aggregations that any engineer can maintain.
              </p>
            </div>

            <div className="rounded-3xl bg-white border border-slate-200 p-8 transition-all hover:border-slate-300">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Transparent & Predictable Delivery
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Direct engineer-to-client communication, interactive staging previews, automated tests, and clear milestones with zero surprise invoices.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ==================== 6. METHODOLOGY TEASER ==================== */}
      <section className="py-20 md:py-28 bg-slate-50 border-y border-slate-200">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200">
                <span>Disciplined Engineering</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight font-display">
                How We Take Projects From <span className="text-indigo-600">Zero to Production</span>
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                Our 7-phase software engineering methodology eliminates ambiguity, validates product requirements upfront, and ensures robust deployment on modern cloud infrastructure.
              </p>

              <div className="pt-2">
                <Link
                  to="/methodology"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-all"
                >
                  <span>Explore 7-Step Methodology</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              {[
                { step: '01', title: 'Discovery & Requirements', desc: 'Understanding your business model, target users, and technical scope.' },
                { step: '02', title: 'Architecture & UX Strategy', desc: 'Wireframes, database schema design, and API endpoint contracts.' },
                { step: '03', title: 'Full-Stack Development', desc: 'Clean, modular React components connected to secure Express REST APIs.' },
                { step: '04', title: 'Rigorous QA & Deployment', desc: 'Automated testing, security hardening, and zero-downtime release.' },
              ].map((item) => (
                <div
                  key={item.step}
                  className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-200"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-sm shrink-0 border border-indigo-100">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900">{item.title}</h4>
                    <p className="text-xs text-slate-600 mt-1 font-normal leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ==================== 7. COST ESTIMATOR TEASER ==================== */}
      <section className="py-20 md:py-28">
        <Container>
          <div className="rounded-3xl bg-indigo-50 border border-indigo-100 p-8 sm:p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white text-indigo-700 border border-indigo-200">
                <Calculator className="w-3.5 h-3.5 text-indigo-600" />
                <span>Instant Online Estimator</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
                Need an Instant Project Quote?
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Use our interactive project calculator to select your product type, complexity, feature modules, and timeline to receive an immediate architectural estimate.
              </p>
            </div>

            <Link
              to="/cost-estimator"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shrink-0 transition-all"
            >
              <span>Launch Cost Estimator</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Container>
      </section>

      {/* ==================== 8. LATEST INSIGHTS ==================== */}
      <section className="py-20 md:py-28 bg-slate-50 border-t border-slate-200">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 bg-indigo-50 text-indigo-700 border border-indigo-200">
                <span>Knowledge & Engineering</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
                Technical Insights & Articles
              </h2>
            </div>

            <Link
              to="/insights"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700"
            >
              <span>View all articles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {insights.map((article) => (
              <InsightCard key={article.slug} insight={article} />
            ))}
          </div>
        </Container>
      </section>

      {/* ==================== 9. CONVERSION CTA ==================== */}
      <CTASection />
    </>
  );
};

export default Home;
