import React from 'react';
import {
  Compass,
  FileCode,
  Layout,
  Code2,
  CheckSquare,
  Rocket,
  Headphones,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import Container from '../components/common/Container';
import SectionHeading from '../components/common/SectionHeading';
import CTASection from '../components/common/CTASection';
import SEO from '../components/common/SEO';

export const Methodology = () => {
  const steps = [
    {
      number: '01',
      title: 'Discovery & Product Scope',
      icon: Compass,
      description:
        'We dig deep into your product vision, target market, functional requirements, user journeys, and competitive differentiators.',
      deliverables: [
        'Detailed Scope of Work (SOW)',
        'Technical Feasibility Assessment',
        'Architecture Roadmap & Milestones',
      ],
    },
    {
      number: '02',
      title: 'System Architecture & Data Modeling',
      icon: FileCode,
      description:
        'We design the technical blueprint: MongoDB database schemas, indexing strategies, API route specifications, and state machine workflows.',
      deliverables: [
        'Database Schema & Entity Diagrams',
        'REST API Endpoint Contracts',
        'Security & RBAC Matrix',
      ],
    },
    {
      number: '03',
      title: 'UI/UX Design & Prototyping',
      icon: Layout,
      description:
        'We create intuitive, conversion-focused wireframes and polished interface prototypes that translate complex workflows into clear user experiences.',
      deliverables: [
        'High-Fidelity Component Library',
        'Interactive User Flow Prototypes',
        'Accessibility & Responsive Breakpoints',
      ],
    },
    {
      number: '04',
      title: 'Full-Stack Development',
      icon: Code2,
      description:
        'We write modular, type-safe code across frontend React components and backend Express microservices, conducting daily progress pushes.',
      deliverables: [
        'Clean, Documented React Codebase',
        'Optimized Express & Node.js API',
        'Weekly Staging Previews for Client Review',
      ],
    },
    {
      number: '05',
      title: 'Quality Assurance & Automated Testing',
      icon: CheckSquare,
      description:
        'We run automated test suites, end-to-end user journey tests, security vulnerability scans, and cross-browser performance audits.',
      deliverables: [
        'API Integration & Unit Test Coverage',
        'Performance & Core Web Vitals Audit',
        'Cross-Browser & Mobile Verification',
      ],
    },
    {
      number: '06',
      title: 'Production Deployment & Cloud Setup',
      icon: Rocket,
      description:
        'We deploy your application to scalable cloud infrastructure with automated CI/CD pipelines, SSL certificates, CDN caching, and monitoring.',
      deliverables: [
        'Automated CI/CD Deployment Pipelines',
        'Production MongoDB Cloud Atlas Cluster',
        'Uptime & Error Tracking Telemetry',
      ],
    },
    {
      number: '07',
      title: 'Support, Optimization & Scaling',
      icon: Headphones,
      description:
        'We provide ongoing maintenance, feature iteration, database index tuning, and performance scaling as your active user base grows.',
      deliverables: [
        'Proactive Uptime SLA Monitoring',
        'Database Optimization & Backups',
        'Iterative Feature Roadmap Execution',
      ],
    },
  ];

  return (
    <>
      <SEO
        title="Development Methodology — How NovaStack Builds"
        description="Our proven 7-step software engineering methodology: from discovery and architectural modeling to production cloud deployment and scaling."
      />

      <section className="pt-12 pb-24 md:pt-16 md:pb-32">
        <Container>
          <SectionHeading
            badge="Engineering Process"
            title="A Disciplined 7-Step"
            highlight="Product Roadmap"
            subtitle="How we eliminate development risk, ensure predictable delivery dates, and build software that scales cleanly from day one."
          />

          <div className="mt-20 max-w-4xl mx-auto space-y-8">
            {steps.map((step) => (
              <div
                key={step.number}
                className="relative rounded-3xl bg-white border border-slate-200 p-8 sm:p-10 transition-all hover:border-slate-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 font-bold flex items-center justify-center text-lg border border-indigo-100 shrink-0">
                      {step.number}
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                        {step.title}
                      </h3>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-500 flex items-center justify-center border border-slate-100 shrink-0">
                    <step.icon className="w-5 h-5 text-indigo-600" />
                  </div>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed font-normal mb-6">
                  {step.description}
                </p>

                <div className="pt-4 border-t border-slate-100">
                  <div className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3">
                    Key Deliverables:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {step.deliverables.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 font-medium flex items-center gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
};

export default Methodology;
