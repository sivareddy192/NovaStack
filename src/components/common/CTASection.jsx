import React from 'react';
import { ArrowRight, Calculator, MessageSquare, Sparkles } from 'lucide-react';
import Container from './Container';
import Button from './Button';

export const CTASection = ({
  title = 'Ready to Build Your Modern Web Application?',
  subtitle = 'Whether you need a custom SaaS platform, high-conversion e-commerce storefront, or scalable REST API backend, NovaStack is ready to build it.',
  primaryActionText = 'Calculate Project Estimate',
  primaryActionHref = '/cost-estimator',
  secondaryActionText = 'Book Discovery Call',
  secondaryActionHref = '/contact',
}) => {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="relative rounded-3xl bg-gradient-to-b from-indigo-50/60 to-white border border-indigo-100 p-8 sm:p-12 md:p-16 text-center overflow-hidden">
          {/* Subtle decorative elements */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-100/40 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-100/40 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-indigo-100/70 text-indigo-700 border border-indigo-200/80">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Direct Full-Stack Engineering</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight font-display">
              {title}
            </h2>

            <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                to={primaryActionHref}
                size="lg"
                icon={Calculator}
                iconPosition="left"
                className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                {primaryActionText}
              </Button>

              <Button
                to={secondaryActionHref}
                variant="outline"
                size="lg"
                icon={ArrowRight}
                iconPosition="right"
                className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-700 border-slate-300"
              >
                {secondaryActionText}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CTASection;
