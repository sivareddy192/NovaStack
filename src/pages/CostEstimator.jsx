import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Calculator,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Layers,
  Clock,
  Send,
  Loader2,
  DollarSign,
} from 'lucide-react';
import Container from '../components/common/Container';
import SectionHeading from '../components/common/SectionHeading';
import Input from '../components/forms/Input';
import SEO from '../components/common/SEO';
import {
  getEstimatorConfig,
  calculateEstimate,
  submitEstimatorLead,
} from '../services/api';
import { trackEvent } from '../utils/analytics';

export const CostEstimator = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [config, setConfig] = useState(null);
  const [loadingConfig, setLoadingConfig] = useState(true);
  const [calculating, setCalculating] = useState(false);
  const [submittingLead, setSubmittingLead] = useState(false);
  const [isLeadSuccess, setIsLeadSuccess] = useState(false);

  // Form selections state
  const [selections, setSelections] = useState({
    projectType: 'Business Website',
    complexity: 'Standard',
    features: ['Authentication & User Profiles', 'Contact & Lead Capture Form'],
    designLevel: 'Custom Modern UI',
    timeline: 'Standard (3–6 weeks)',
  });

  // Price estimate calculation result
  const [estimate, setEstimate] = useState({
    formattedRange: '₹20,000 – ₹35,000',
    estimatedMinPrice: 20000,
    estimatedMaxPrice: 35000,
    estimatedWeeks: '3–6 weeks',
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const data = await getEstimatorConfig();
        setConfig(data);
      } catch (err) {
        console.error('Config fetch error:', err);
      } finally {
        setLoadingConfig(false);
      }
    };
    fetchConfig();
    trackEvent('cost_estimator_started');
  }, []);

  // Recalculate price whenever selections change
  useEffect(() => {
    const recalculate = async () => {
      setCalculating(true);
      try {
        const result = await calculateEstimate(selections);
        if (result) {
          setEstimate(result);
        }
      } catch (err) {
        console.error('Price calculation error:', err);
      } finally {
        setCalculating(false);
      }
    };
    recalculate();
  }, [selections]);

  const toggleFeature = (featureName) => {
    setSelections((prev) => {
      const exists = prev.features.includes(featureName);
      return {
        ...prev,
        features: exists
          ? prev.features.filter((f) => f !== featureName)
          : [...prev.features, featureName],
      };
    });
  };

  const onLeadSubmit = async (contactData) => {
    setSubmittingLead(true);
    try {
      await submitEstimatorLead({
        ...selections,
        estimatedMinPrice: estimate.estimatedMinPrice,
        estimatedMaxPrice: estimate.estimatedMaxPrice,
        contact: contactData,
      });
      setIsLeadSuccess(true);
      trackEvent('cost_estimator_lead_submitted', {
        projectType: selections.projectType,
      });
    } catch (err) {
      console.error('Lead submit error:', err);
    } finally {
      setSubmittingLead(false);
    }
  };

  const projectTypes = [
    { id: 'Business Website', name: 'Business Website', desc: 'Marketing, authority & conversion focused web presence' },
    { id: 'Custom Web Application', name: 'Custom Web Application', desc: 'Bespoke operational platform & client workflow software' },
    { id: 'E-Commerce Platform', name: 'E-Commerce Platform', desc: 'Online storefront with cart, checkout, payments & inventory' },
    { id: 'Food Ordering Platform', name: 'Food Ordering Platform', desc: 'Restaurant menus, real-time dispatch, table/delivery tracking' },
    { id: 'Admin Dashboard & Portal', name: 'Admin Dashboard & Portal', desc: 'Back-office operations, metrics visualization & user management' },
    { id: 'REST API & Backend System', name: 'REST API & Backend System', desc: 'Secure Node/Express microservices and database infrastructure' },
  ];

  const complexityLevels = [
    { id: 'Standard', name: 'Standard (MVP)', desc: 'Clean, essential functionality with standard data relations.' },
    { id: 'Advanced', name: 'Advanced (Multi-Role)', desc: 'Role-based access, automated workflows, third-party API sync.' },
    { id: 'Enterprise', name: 'Enterprise Architecture', desc: 'High-throughput, distributed microservices, strict security audits.' },
  ];

  const featureOptions = [
    'Authentication & RBAC',
    'Payment Gateway Integration',
    'Order Management System',
    'Real-time Notifications',
    'Analytics & Reporting',
    'Search & Advanced Filters',
    'File Uploads & Media CDN',
    'Multi-language Support',
    'Automated Invoicing & PDF',
    'Custom CRM & Inquiries',
  ];

  const designOptions = [
    { id: 'Standard Modern UI', name: 'Standard Clean UI', desc: 'Tailwind CSS clean responsive layout.' },
    { id: 'Custom Modern UI', name: 'Custom SaaS Design', desc: 'Bespoke branding, design tokens, and fluid layout.' },
    { id: 'Premium UI/UX & Micro-Animations', name: 'Elite UI/UX & Motion', desc: 'Framer Motion micro-interactions and custom design system.' },
  ];

  const timelineOptions = [
    { id: 'Urgent (1–2 weeks)', name: 'Express Sprint (1–2 weeks)', desc: 'Priority dedicated focus for quick turnaround.' },
    { id: 'Standard (3–6 weeks)', name: 'Standard Delivery (3–6 weeks)', desc: 'Optimal development and iterative review pace.' },
    { id: 'Flexible (6+ weeks)', name: 'Comprehensive (6+ weeks)', desc: 'Phased multi-milestone product rollout.' },
  ];

  return (
    <>
      <SEO
        title="Project Cost Estimator — NovaStack"
        description="Calculate estimated development costs and timelines for your MERN stack web application with our interactive pricing tool."
      />

      <section className="pt-12 pb-24 md:pt-16 md:pb-32">
        <Container>
          <SectionHeading
            badge="Interactive Calculator"
            title="Estimate Your"
            highlight="Project Cost"
            subtitle="Configure your project scope in 6 simple steps to receive an instant architectural price range and timeline estimate."
          />

          {/* Stepper Progress Bar */}
          <div className="max-w-4xl mx-auto mt-12 mb-12">
            <div className="grid grid-cols-6 gap-2">
              {[1, 2, 3, 4, 5, 6].map((step) => (
                <div
                  key={step}
                  onClick={() => step < currentStep && setCurrentStep(step)}
                  className={`h-2 rounded-full transition-all ${
                    step === currentStep
                      ? 'bg-indigo-600'
                      : step < currentStep
                      ? 'bg-indigo-300 cursor-pointer'
                      : 'bg-slate-200'
                  }`}
                />
              ))}
            </div>
            <div className="flex justify-between text-[11px] text-slate-500 font-semibold uppercase mt-2">
              <span>Type</span>
              <span>Complexity</span>
              <span>Modules</span>
              <span>Design</span>
              <span>Timeline</span>
              <span>Proposal</span>
            </div>
          </div>

          {/* Main Estimator Box & Sticky Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
            {/* Left Column: Active Step Selector */}
            <div className="lg:col-span-8 rounded-3xl bg-white border border-slate-200 p-6 sm:p-10">
              {/* STEP 1: Project Type */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                      Step 1: Select Application Type
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      What type of digital product do you need engineered?
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {projectTypes.map((pt) => {
                      const isSelected = selections.projectType === pt.id;
                      return (
                        <div
                          key={pt.id}
                          onClick={() => setSelections({ ...selections, projectType: pt.id })}
                          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                            isSelected
                              ? 'border-indigo-600 bg-indigo-50/60'
                              : 'border-slate-200 hover:border-slate-300 bg-white'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className={`text-sm font-bold ${isSelected ? 'text-indigo-900' : 'text-slate-900'}`}>
                              {pt.name}
                            </span>
                            {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-600" />}
                          </div>
                          <p className="text-xs text-slate-500 mt-1 leading-snug">{pt.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 2: Complexity */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                      Step 2: Technical Depth & Complexity
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Select the architectural depth and role requirements.
                    </p>
                  </div>

                  <div className="space-y-3.5">
                    {complexityLevels.map((lvl) => {
                      const isSelected = selections.complexity === lvl.id;
                      return (
                        <div
                          key={lvl.id}
                          onClick={() => setSelections({ ...selections, complexity: lvl.id })}
                          className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                            isSelected
                              ? 'border-indigo-600 bg-indigo-50/60'
                              : 'border-slate-200 hover:border-slate-300 bg-white'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className={`text-base font-bold ${isSelected ? 'text-indigo-900' : 'text-slate-900'}`}>
                              {lvl.name}
                            </span>
                            {isSelected && <CheckCircle2 className="w-5 h-5 text-indigo-600" />}
                          </div>
                          <p className="text-xs text-slate-500 mt-1">{lvl.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 3: Features */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                      Step 3: Features & Integration Modules
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Choose the specific modules required in your build.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {featureOptions.map((feat) => {
                      const isSelected = selections.features.includes(feat);
                      return (
                        <div
                          key={feat}
                          onClick={() => toggleFeature(feat)}
                          className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? 'border-indigo-600 bg-indigo-50/60 text-indigo-900'
                              : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                          }`}
                        >
                          <span className="text-xs font-semibold">{feat}</span>
                          {isSelected ? (
                            <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border border-slate-300" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 4: Design Level */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                      Step 4: UI/UX & Design Experience
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      Choose the visual design fidelity and micro-animation level.
                    </p>
                  </div>

                  <div className="space-y-3.5">
                    {designOptions.map((opt) => {
                      const isSelected = selections.designLevel === opt.id;
                      return (
                        <div
                          key={opt.id}
                          onClick={() => setSelections({ ...selections, designLevel: opt.id })}
                          className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                            isSelected
                              ? 'border-indigo-600 bg-indigo-50/60'
                              : 'border-slate-200 hover:border-slate-300 bg-white'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className={`text-base font-bold ${isSelected ? 'text-indigo-900' : 'text-slate-900'}`}>
                              {opt.name}
                            </span>
                            {isSelected && <CheckCircle2 className="w-5 h-5 text-indigo-600" />}
                          </div>
                          <p className="text-xs text-slate-500 mt-1">{opt.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 5: Timeline */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                      Step 5: Target Delivery Timeline
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1">
                      When do you need your application deployed to production?
                    </p>
                  </div>

                  <div className="space-y-3.5">
                    {timelineOptions.map((tl) => {
                      const isSelected = selections.timeline === tl.id;
                      return (
                        <div
                          key={tl.id}
                          onClick={() => setSelections({ ...selections, timeline: tl.id })}
                          className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                            isSelected
                              ? 'border-indigo-600 bg-indigo-50/60'
                              : 'border-slate-200 hover:border-slate-300 bg-white'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className={`text-base font-bold ${isSelected ? 'text-indigo-900' : 'text-slate-900'}`}>
                              {tl.name}
                            </span>
                            {isSelected && <CheckCircle2 className="w-5 h-5 text-indigo-600" />}
                          </div>
                          <p className="text-xs text-slate-500 mt-1">{tl.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 6: Lead Capture / Proposal */}
              {currentStep === 6 && (
                <div className="space-y-6">
                  {isLeadSuccess ? (
                    <div className="text-center py-8 space-y-4">
                      <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900">
                        Proposal Request Sent!
                      </h3>
                      <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                        Thank you! We have received your project scope specifications. Our engineering team will prepare a formal architectural proposal and contact you within 24 hours.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit(onLeadSubmit)} className="space-y-4">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                          Step 6: Receive Detailed Proposal
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-500 mt-1">
                          Enter your details below to save your configuration and receive a formal breakdown.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                          label="Your Name"
                          required
                          placeholder="Siva Reddy"
                          error={errors.name?.message}
                          {...register('name', { required: 'Please enter your name' })}
                        />
                        <Input
                          label="Email Address"
                          required
                          type="email"
                          placeholder="siva@company.com"
                          error={errors.email?.message}
                          {...register('email', {
                            required: 'Please enter your email',
                            pattern: {
                              value: /^\S+@\S+$/i,
                              message: 'Valid email required',
                            },
                          })}
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                          label="Phone / WhatsApp"
                          placeholder="+91 98765 43210"
                          {...register('phone')}
                        />
                        <Input
                          label="Company / Project Name"
                          placeholder="Acme Corp"
                          {...register('company')}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={submittingLead}
                        className="w-full mt-4 flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 transition-all cursor-pointer"
                      >
                        {submittingLead ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>Transmitting Scope...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            <span>Submit Scope & Request Technical Proposal</span>
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              )}

              {/* Navigation Back / Next Buttons */}
              <div className="pt-8 mt-8 border-t border-slate-100 flex items-center justify-between">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep((prev) => prev - 1)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Previous Step</span>
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < 6 && (
                  <button
                    type="button"
                    onClick={() => setCurrentStep((prev) => prev + 1)}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors cursor-pointer"
                  >
                    <span>Continue to Step {currentStep + 1}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Right Column: Live Price & Timeline Calculation Summary Card */}
            <div className="lg:col-span-4 space-y-6">
              <div className="rounded-3xl bg-slate-50 border border-slate-200 p-6 sm:p-8 space-y-6 sticky top-24">
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-slate-500 block mb-1">
                    Live Calculation
                  </span>
                  <h4 className="text-lg font-bold text-slate-900">Estimation Summary</h4>
                </div>

                {/* Price Display */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                    Estimated Budget Range
                  </span>
                  <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600 font-display">
                    {estimate.formattedRange || '₹25,000 – ₹45,000'}
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">
                    INR (Excl. custom 3rd-party SaaS fees)
                  </div>
                </div>

                {/* Timeline Display */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-slate-500 uppercase block">
                      Target Timeline
                    </span>
                    <span className="text-sm font-bold text-slate-900">
                      {estimate.estimatedWeeks || '3–6 weeks'}
                    </span>
                  </div>
                </div>

                {/* Summary Item Breakdown */}
                <div className="space-y-2.5 text-xs text-slate-600 border-t border-slate-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Product:</span>
                    <span className="font-semibold text-slate-800 truncate max-w-[160px]">
                      {selections.projectType}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Tier:</span>
                    <span className="font-semibold text-slate-800">{selections.complexity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Selected Modules:</span>
                    <span className="font-semibold text-slate-800">{selections.features.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default CostEstimator;
