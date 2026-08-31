import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  Mail,
  Phone,
  MessageSquare,
  MapPin,
  Send,
  CheckCircle2,
  Clock,
  Sparkles,
  Loader2,
} from 'lucide-react';
import Container from '../components/common/Container';
import SectionHeading from '../components/common/SectionHeading';
import Input from '../components/forms/Input';
import Textarea from '../components/forms/Textarea';
import Select from '../components/forms/Select';
import SEO from '../components/common/SEO';
import { sendContactInquiry } from '../services/api';
import { CONTACT_INFO } from '../constants/navigation';
import { trackEvent } from '../utils/analytics';

export const Contact = () => {
  const location = useLocation();
  const [submitting, setSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Extract service from query string if directed from a service card
  const searchParams = new URLSearchParams(location.search);
  const initialService = searchParams.get('service') || '';

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      service: initialService,
      budget: '₹25,000 – ₹50,000',
    },
  });

  useEffect(() => {
    if (initialService) {
      setValue('service', initialService);
    }
  }, [initialService, setValue]);

  useEffect(() => {
    trackEvent('contact_page_viewed');
  }, []);

  const onSubmit = async (data) => {
    setSubmitting(true);
    setErrorMessage('');
    try {
      const response = await sendContactInquiry(data);
      if (response.success) {
        setIsSuccess(true);
        reset();
        trackEvent('contact_form_submitted', { service: data.service });
      } else {
        setErrorMessage(response.message || 'Failed to submit inquiry.');
      }
    } catch (err) {
      console.error('Contact submission error:', err);
      setErrorMessage(
        err.response?.data?.message || 'Error submitting inquiry. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const serviceOptions = [
    { value: 'Custom Web Application', label: 'Custom Web Application' },
    { value: 'E-Commerce Platform', label: 'E-Commerce Platform' },
    { value: 'Food Ordering Platform', label: 'Food Ordering Platform' },
    { value: 'Business Website', label: 'Business Website' },
    { value: 'Admin Dashboard', label: 'Admin Dashboard' },
    { value: 'API & Backend Development', label: 'API & Backend Development' },
    { value: 'UI/UX Development', label: 'UI/UX Development' },
    { value: 'Website Optimization', label: 'Website Optimization & SEO' },
    { value: 'Other Inquiry', label: 'Other / Specialized' },
  ];

  const budgetOptions = [
    { value: '₹20,000 – ₹35,000', label: '₹20,000 – ₹35,000' },
    { value: '₹35,000 – ₹60,000', label: '₹35,000 – ₹60,000' },
    { value: '₹60,000 – ₹1,20,000', label: '₹60,000 – ₹1,20,000' },
    { value: '₹1,20,000+', label: '₹1,20,000+ (Enterprise)' },
    { value: 'Flexible / Not Sure', label: 'Flexible / Discuss with Team' },
  ];

  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact NovaStack',
    description: 'Get in touch with NovaStack software development team.',
    url: 'https://novastack.dev/contact',
  };

  return (
    <>
      <SEO
        title="Contact NovaStack — Let's Build Something Great"
        description="Tell us about your project and requirements. Get in touch with NovaStack full-stack software development engineers."
        schema={contactSchema}
      />

      <section className="pt-12 pb-24 md:pt-16 md:pb-32">
        <Container>
          <SectionHeading
            badge="Start The Conversation"
            title="Let's Build"
            highlight="Something Great"
            subtitle="Tell us about your project, timeline, and goals. We'll analyze your requirements and get back to you with an architectural proposal within 24 hours."
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 max-w-6xl mx-auto mt-16">
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-3xl bg-white border border-slate-200 p-8 space-y-6">
                <h3 className="text-xl font-bold text-slate-900">Direct Communication</h3>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  We communicate directly engineer-to-client. No account managers or middle layers.
                </p>

                <div className="space-y-3 pt-2">
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-200 transition-all text-slate-700 hover:text-indigo-600 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100 group-hover:bg-indigo-100 transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400">Email Inquiry</div>
                      <div className="text-sm font-semibold truncate text-slate-800">{CONTACT_INFO.email}</div>
                    </div>
                  </a>

                  <a
                    href={`tel:${CONTACT_INFO.phone}`}
                    className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-indigo-200 transition-all text-slate-700 hover:text-indigo-600 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100 group-hover:bg-indigo-100 transition-colors">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400">Phone Direct</div>
                      <div className="text-sm font-semibold text-slate-800">{CONTACT_INFO.phone}</div>
                    </div>
                  </a>

                  <a
                    href={`https://wa.me/919876543210?text=Hello%20NovaStack`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 hover:border-emerald-300 transition-all text-emerald-800 hover:text-emerald-900 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center border border-emerald-200 group-hover:bg-emerald-200 transition-colors">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-emerald-600">Instant Chat</div>
                      <div className="text-sm font-semibold">WhatsApp Business</div>
                    </div>
                  </a>
                </div>
              </div>

              <div className="rounded-3xl bg-white border border-slate-200 p-8 space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-indigo-600" />
                  <span>What to Expect Next</span>
                </h4>
                <ul className="space-y-2.5 text-xs text-slate-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <span>We review your requirements and system scope within 24 hours.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <span>We schedule a technical discovery call with our lead full-stack engineer.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <span>You receive an architectural plan, timeline, and exact quotation.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-7 rounded-3xl bg-white border border-slate-200 p-8 sm:p-10">
              {isSuccess ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Inquiry Received!</h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Thank you! Your project inquiry has been delivered directly to our senior engineering team. We will review your requirements and respond within 24 business hours.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="mt-6 px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Project Inquiry Form</h3>
                  <p className="text-xs text-slate-500 mb-6">
                    Fill out the fields below and our full-stack engineers will prepare a custom proposal.
                  </p>

                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs">
                      {errorMessage}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Full Name"
                      required
                      placeholder="e.g. Siva Reddy"
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
                          message: 'Please enter a valid email',
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
                      label="Company / Startup"
                      placeholder="Acme Corp"
                      {...register('company')}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Select
                      label="Service Needed"
                      options={serviceOptions}
                      {...register('service')}
                    />
                    <Select
                      label="Estimated Budget"
                      options={budgetOptions}
                      {...register('budget')}
                    />
                  </div>

                  <Textarea
                    label="Project Description & Goals"
                    required
                    rows={4}
                    placeholder="Describe your web application, target users, required features, or any existing design specs..."
                    error={errors.message?.message}
                    {...register('message', {
                      required: 'Please provide a brief project overview',
                      minLength: {
                        value: 10,
                        message: 'Please provide at least 10 characters',
                      },
                    })}
                  />

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 transition-all cursor-pointer"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Transmitting Inquiry...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Project Inquiry</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Contact;
