import React, { useMemo, useState } from 'react';
import emailjs from '@emailjs/browser';
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock3,
  MessageCircle,
  Minus,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';
import Container from '../components/common/Container';
import SEO from '../components/common/SEO';
import Button from '../components/common/Button';
import { CONTACT_INFO } from '../constants/navigation';
import { submitEstimatorLead } from '../services/api';

const packages = [
  {
    name: 'Basic Website',
    shortName: 'Basic',
    price: 5000,
    color: 'emerald',
    label: 'Frontend Website',
    description: 'A polished online presence for individuals, portfolios, landing pages, and small businesses.',
    includes: ['HTML, CSS & JavaScript', 'Responsive website design', 'Basic UI/UX', 'Basic business pages', 'Contact page and form', 'Frontend interactions'],
    excludes: ['Backend or database', 'Admin panel', 'AI chatbot', 'Payments or support system', 'Advanced SEO', 'Ongoing maintenance'],
    maintenance: 'No free maintenance included',
    revisions: 'Not included after delivery',
  },
  {
    name: 'Full Stack Starter',
    shortName: 'Starter',
    price: 10000,
    color: 'blue',
    label: 'Frontend + Backend',
    description: 'A functional MERN website for businesses that need data, APIs, and a reliable foundation.',
    includes: ['Professional frontend', 'Backend and REST APIs', 'Database integration', 'Authentication where required', 'MERN stack development', 'Deployment assistance'],
    excludes: ['AI chatbot', 'Advanced admin dashboard', 'Payment gateway', 'Advanced SEO and automation'],
    maintenance: 'Post-delivery maintenance is charged separately',
    revisions: 'Up to 3 major revision rounds during development',
  },
  {
    name: 'Business Pro',
    shortName: 'Pro',
    price: 20000,
    color: 'orange',
    label: 'Advanced Full Stack',
    popular: true,
    description: 'Advanced digital services for growing businesses that need automation and professional operations.',
    includes: ['Full-stack MERN development', 'Professional frontend, backend and database', 'AI chatbot integration', 'Customer support functionality', 'Admin panel', 'SEO optimization', 'API integrations', 'Authentication and analytics'],
    excludes: ['Payment gateway charges', 'Third-party service fees', 'New features beyond scope'],
    maintenance: '4 months included for delivered functionality',
    revisions: 'Up to 5 major revision rounds during development',
  },
  {
    name: 'Business Premium',
    shortName: 'Premium',
    price: 30000,
    color: 'rose',
    label: 'Complete Business Website',
    description: 'A complete business platform with payments, automation, long-term support, and room to scale.',
    includes: ['Everything in Business Pro', 'Payment gateway integration', 'Business functionality by requirement', 'Advanced authentication', 'Deployment assistance', 'Customer support system'],
    excludes: ['Gateway, hosting, SMS and paid API charges', 'Features outside agreed scope'],
    maintenance: '6 months included for delivered functionality',
    revisions: 'Up to 6 major revision rounds during development',
  },
];

const featureOptions = [
  ['admin', 'Admin panel', 2000, 3],
  ['ai', 'AI chatbot', 4000, 3],
  ['support', 'Customer support / live chat', 1000, 3],
  ['payment', 'Payment gateway', 6000, 3],
  ['auth', 'Authentication & user roles', 2000, 1],
  ['seo', 'SEO optimization', 1000, 2],
  ['whatsapp', 'WhatsApp integration', 3000, 1, 3000],
  ['booking', 'Booking / reservation system', 2000, 3],
  ['ecommerce', 'E-commerce functionality', 12000, 3],
  ['custom', 'Other custom features', 10000, 3],
];

const formatPrice = (value) => `₹${value.toLocaleString('en-IN')}`;

const colorStyles = {
  emerald: { badge: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500', border: 'hover:border-emerald-300' },
  blue: { badge: 'bg-blue-50 text-blue-700 border-blue-200', dot: 'bg-blue-500', border: 'hover:border-blue-300' },
  orange: { badge: 'bg-orange-50 text-orange-700 border-orange-200', dot: 'bg-orange-500', border: 'hover:border-orange-300' },
  rose: { badge: 'bg-rose-50 text-rose-700 border-rose-200', dot: 'bg-rose-500', border: 'hover:border-rose-300' },
};

export const CostEstimator = () => {
  const [websiteType, setWebsiteType] = useState('Business website');
  const [pages, setPages] = useState('5–8 pages');
  const [stack, setStack] = useState('Full Stack Starter');
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [openPackage, setOpenPackage] = useState(null);
  const [customFeatures, setCustomFeatures] = useState('');
  const [customer, setCustomer] = useState({ name: '', email: '', phone: '', company: '' });
  const [sendingRequest, setSendingRequest] = useState(false);
  const [requestStatus, setRequestStatus] = useState({ type: '', message: '' });
  const [showContactStep, setShowContactStep] = useState(false);

  const estimate = useMemo(() => {
    const selectedPackage = packages.find((item) => item.name === stack) || packages[1];
    const extra = selectedFeatures.reduce((sum, key) => sum + (featureOptions.find(([id]) => id === key)?.[2] || 0), 0);
    const pageExtra = pages === '9–15 pages' ? 3000 : pages === '16+ pages' ? 7000 : 0;
    const total = selectedPackage.price + extra + pageExtra;
    const exceedsPremium = total > 30000;
    const monthlyTotal = selectedFeatures.reduce(
      (sum, key) => sum + (featureOptions.find(([id]) => id === key)?.[4] || 0),
      0
    );

    return {
      selectedPackage,
      price: total,
      featureTotal: extra,
      pageExtra,
      monthlyTotal,
      exceedsPremium,
    };
  }, [pages, selectedFeatures, stack]);

  const toggleFeature = (key) => {
    setSelectedFeatures((current) => {
      const isSelected = current.includes(key);
      if (key === 'custom' && isSelected) {
        setCustomFeatures('');
      }
      return isSelected ? current.filter((item) => item !== key) : [...current, key];
    });
  };

  const hasCustomFeatureRequest = selectedFeatures.includes('custom');

  const updateCustomer = (field, value) => {
    setCustomer((current) => ({ ...current, [field]: value }));
  };

  const sendEstimateRequest = async (event) => {
    event.preventDefault();
    if (sendingRequest) return;
    setRequestStatus({ type: '', message: '' });

    if (!customer.name.trim() || !customer.email.trim() || !customer.phone.trim()) {
      setRequestStatus({ type: 'error', message: 'Please enter your name, email, and phone number.' });
      return;
    }

    const emailPattern = /^\S+@\S+\.\S+$/;
    if (!emailPattern.test(customer.email.trim())) {
      setRequestStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const autoReplyTemplateId = import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (
      !serviceId ||
      !templateId ||
      !publicKey ||
      serviceId === 'your_service_id' ||
      templateId === 'your_template_id' ||
      publicKey === 'your_public_key'
    ) {
      setRequestStatus({ type: 'error', message: 'EmailJS is not configured yet. Please contact NovaStack directly while the estimate form is being set up.' });
      return;
    }

    const selectedFeatureDetails = selectedFeatures
      .map((key) => featureOptions.find(([id]) => id === key))
      .filter(Boolean)
      .map(([, label, price, , monthly]) => `${label}: ${formatPrice(price)}${monthly ? ` setup + ${formatPrice(monthly)}/month` : ''}`)
      .join('\n');
    const autoReplyParams = {
        to_email: customer.email.trim(),
        customer_name: customer.name.trim(),
        customer_email: customer.email.trim(),
        phone_number: customer.phone.trim(),
        company_name: customer.company.trim() || 'Not provided',
        website_type: websiteType,
        number_of_pages: pages,
        build_type: estimate.selectedPackage.name,
        selected_features: selectedFeatureDetails || 'None',
        estimated_price: estimate.price.toLocaleString('en-IN'),
        additional_requirements: hasCustomFeatureRequest
          ? customFeatures.trim() || 'Not provided'
          : 'None',
    };
    const sendAutoReply = () => {
      if (!autoReplyTemplateId || autoReplyTemplateId === 'your_autoreply_template_id') {
        return Promise.resolve(false);
      }
      return emailjs.send(serviceId, autoReplyTemplateId, autoReplyParams, publicKey)
        .then(() => true);
    };

    setSendingRequest(true);
    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          customer_name: customer.name.trim(),
          customer_email: customer.email.trim(),
          phone_number: customer.phone.trim(),
          company_name: customer.company.trim() || 'Not provided',
          website_type: websiteType,
          number_of_pages: pages,
          build_type: estimate.selectedPackage.name,
          selected_features: selectedFeatureDetails || 'None',
          estimated_price: estimate.price.toLocaleString('en-IN'),
          additional_requirements: hasCustomFeatureRequest
            ? customFeatures.trim() || 'Not provided'
            : 'None',
          reply_to: customer.email.trim(),
          subject: `Custom estimate request - ${estimate.selectedPackage.name}`,
          message: [
            'NOVASTACK CUSTOM WEBSITE ESTIMATE REQUEST',
            '=========================================',
            '',
            'CUSTOMER DETAILS',
            `Name: ${customer.name.trim()}`,
            `Email: ${customer.email.trim()}`,
            `Phone / WhatsApp: ${customer.phone.trim()}`,
            `Company / Project: ${customer.company.trim() || 'Not provided'}`,
            '',
            'PROJECT REQUIREMENTS',
            `Website type: ${websiteType}`,
            `Number of pages: ${pages}`,
            `Build type: ${estimate.selectedPackage.name}`,
            '',
            'PRICING BREAKDOWN',
            `Normal package price: ${formatPrice(estimate.selectedPackage.price)}`,
            `Additional page price: ${estimate.pageExtra ? formatPrice(estimate.pageExtra) : 'None'}`,
            `One-time selected feature price: ${estimate.featureTotal ? formatPrice(estimate.featureTotal) : 'None'}`,
            `Monthly service charges: ${estimate.monthlyTotal ? `${formatPrice(estimate.monthlyTotal)}/month` : 'None'}`,
            `Estimated starting price: ${formatPrice(estimate.price)}+`,
            '',
            'SELECTED ADDITIONAL FEATURES',
            selectedFeatureDetails || 'None',
            '',
            'CUSTOM FEATURES / QUESTIONS',
            hasCustomFeatureRequest ? customFeatures.trim() || 'Not provided' : 'None',
            '',
            'This is an initial estimate. Please review the complete requirements and confirm the final quotation with the customer.',
          ].join('\n'),
        },
        publicKey
      );

      try {
        await sendAutoReply();
      } catch (autoReplyError) {
        if (import.meta.env.DEV) {
          console.warn('EmailJS auto-reply could not be sent', {
            status: autoReplyError?.status,
            message: autoReplyError?.text || autoReplyError?.message,
          });
        }
      }

      setRequestStatus({ type: 'success', message: 'Your estimate request was sent successfully. NovaStack will contact you soon.' });
      setCustomer({ name: '', email: '', phone: '', company: '' });
      setCustomFeatures('');
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('EmailJS estimate delivery failed', {
          status: error?.status,
          message: error?.text || error?.message,
        });
      }
      try {
        await sendAutoReply();
      } catch (autoReplyError) {
        if (import.meta.env.DEV) {
          console.warn('EmailJS auto-reply could not be sent after estimate delivery failed', {
            status: autoReplyError?.status,
            message: autoReplyError?.text || autoReplyError?.message,
          });
        }
      }
      if (error?.status === 412) {
        try {
          await submitEstimatorLead({
            projectType: websiteType,
            complexity: estimate.selectedPackage.name === 'Basic Website'
              ? 'Basic'
              : estimate.selectedPackage.name === 'Full Stack Starter'
                ? 'Standard'
                : estimate.selectedPackage.name === 'Business Pro'
                  ? 'Advanced'
                  : 'Enterprise',
            features: [
              `Build type: ${estimate.selectedPackage.name}`,
              `Pages: ${pages}`,
              ...selectedFeatures.map((key) => featureOptions.find(([id, label]) => id === key)?.[1]).filter(Boolean),
            ],
            designLevel: 'Custom UI/UX',
            timeline: '2–4 weeks',
            numberOfPages: pages,
            buildType: estimate.selectedPackage.name,
            pricing: {
              packagePrice: estimate.selectedPackage.price,
              pageExtra: estimate.pageExtra,
              featureTotal: estimate.featureTotal,
              monthlyTotal: estimate.monthlyTotal,
              total: estimate.price,
            },
            customRequirements: hasCustomFeatureRequest ? customFeatures.trim() : '',
            contact: {
              name: customer.name.trim(),
              email: customer.email.trim(),
              phone: customer.phone.trim(),
              company: customer.company.trim() || 'Not provided',
              description: [
                `Estimated starting price: ${formatPrice(estimate.price)}+`,
                `Package price: ${formatPrice(estimate.selectedPackage.price)}`,
                `Additional page price: ${estimate.pageExtra ? formatPrice(estimate.pageExtra) : 'None'}`,
                `One-time feature price: ${estimate.featureTotal ? formatPrice(estimate.featureTotal) : 'None'}`,
                `Monthly service charges: ${estimate.monthlyTotal ? `${formatPrice(estimate.monthlyTotal)}/month` : 'None'}`,
                hasCustomFeatureRequest ? `Custom features: ${customFeatures.trim() || 'Not provided'}` : '',
              ].filter(Boolean).join('\n'),
            },
            estimatedMinPrice: estimate.price,
            estimatedMaxPrice: estimate.price,
          });
          setRequestStatus({
            type: 'success',
            message: 'Your request was received. NovaStack will contact you soon. The confirmation email may be delayed while email delivery is restored.',
          });
          setCustomer({ name: '', email: '', phone: '', company: '' });
          setCustomFeatures('');
          return;
        } catch (fallbackError) {
          if (import.meta.env.DEV) {
            console.error('Estimator lead fallback failed', {
              status: fallbackError?.response?.status,
              message: fallbackError?.message,
            });
          }
        }
      }
      const message = error?.status === 412 && error?.text?.includes('insufficient authentication scopes')
        ? 'Email delivery needs to be reconnected by NovaStack. Please contact us directly while the mail service is being restored.'
        : error?.status === 412
          ? 'Email delivery is temporarily unavailable. Please try again later or contact NovaStack directly.'
        : 'Unable to send your request right now. Please try again or contact NovaStack directly.';
      setRequestStatus({ type: 'error', message });
    } finally {
      setSendingRequest(false);
    }
  };

  return (
    <>
      <SEO
        title="Website Pricing & Custom Estimate — NovaStack"
        description="Transparent NovaStack website development packages, maintenance terms, revision limits, and a custom project price estimator."
      />

      <section className="pt-12 pb-20 md:pt-20 md:pb-28">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200">
              <Sparkles className="w-3.5 h-3.5" /> Clear pricing. No surprises.
            </div>
            <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 font-display">
              Website development pricing <span className="text-indigo-600">built around your goals.</span>
            </h1>
            <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed">
              Choose a starting package or build a custom estimate. Every price is transparent, scoped, and confirmed before development begins.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mt-14">
            {packages.map((item, index) => {
              const styles = colorStyles[item.color];
              const expanded = openPackage === index;
              return (
                <article key={item.name} className={`relative flex flex-col rounded-3xl bg-white border border-slate-200 p-6 transition-all ${styles.border} ${item.popular ? 'ring-2 ring-indigo-500 ring-offset-2' : ''}`}>
                  {item.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider">Most popular</div>}
                  <div className="flex items-center justify-between gap-3">
                    <span className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider ${styles.badge}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${styles.dot}`} /> {item.shortName}
                    </span>
                    <span className="text-xs text-slate-400">{index + 1}/4</span>
                  </div>
                  <h2 className="mt-5 text-xl font-bold text-slate-900">{item.name}</h2>
                  <p className="mt-1 text-xs font-semibold text-indigo-600">{item.label}</p>
                  <div className="mt-5 text-3xl font-extrabold text-slate-900">{formatPrice(item.price)}<span className="text-xs font-medium text-slate-400"> starting</span></div>
                  <p className="mt-4 text-sm text-slate-600 leading-relaxed min-h-[76px]">{item.description}</p>
                  <div className="mt-5 pt-5 border-t border-slate-100 space-y-2.5 flex-1">
                    {item.includes.slice(0, 5).map((entry) => <div key={entry} className="flex items-start gap-2 text-xs text-slate-600"><Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />{entry}</div>)}
                    {item.includes.length > 5 && <button type="button" onClick={() => setOpenPackage(expanded ? null : index)} className="text-xs font-semibold text-indigo-600 hover:text-indigo-700">{expanded ? 'Show less' : `+${item.includes.length - 5} more included`}</button>}
                    {expanded && <div className="pt-2 space-y-2.5">{item.includes.slice(5).map((entry) => <div key={entry} className="flex items-start gap-2 text-xs text-slate-600"><Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />{entry}</div>)}</div>}
                    <div className="pt-3 mt-3 border-t border-slate-100 space-y-2">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Not included</p>
                      {item.excludes.slice(0, expanded ? item.excludes.length : 3).map((entry) => <div key={entry} className="flex items-start gap-2 text-[11px] text-slate-500"><X className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />{entry}</div>)}
                      {item.excludes.length > 3 && !expanded && <button type="button" onClick={() => setOpenPackage(index)} className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-700">View all exclusions</button>}
                    </div>
                  </div>
                  <div className="mt-6 pt-5 border-t border-slate-100 space-y-2 text-[11px] text-slate-500">
                    <div className="flex gap-2"><Clock3 className="w-3.5 h-3.5 text-indigo-500 shrink-0" />{item.maintenance}</div>
                    <div className="flex gap-2"><ShieldCheck className="w-3.5 h-3.5 text-indigo-500 shrink-0" />{item.revisions}</div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className={`${showContactStep ? 'hidden' : ''} mt-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start`}>
            <div className="lg:col-span-5">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Custom feature pricing</span>
              <h2 className="mt-3 text-3xl font-extrabold text-slate-900">Need more features? <span className="text-indigo-600">No problem.</span></h2>
              <p className="mt-4 text-sm text-slate-600 leading-relaxed">Customize any package for your business. Additional features, integrations, pages, and advanced functionality increase the final price based on complexity and development time.</p>
              <div className="mt-6 p-5 rounded-2xl bg-indigo-50 border border-indigo-100">
                <p className="text-sm font-semibold text-indigo-900">Base package + additional feature charges = estimated project price</p>
                <p className="mt-2 text-xs text-indigo-800/80 leading-relaxed">If your requested functionality is already included in a higher package, we recommend the upgrade instead of charging you twice.</p>
              </div>
              <div className="mt-6 space-y-2">
                {['Additional pages', 'Advanced dashboards', 'Live chat and automation', 'Maps, delivery tracking and SMS', 'Advanced security, analytics and SEO', 'Third-party APIs and mobile app integrations'].map((entry) => <div key={entry} className="flex items-center gap-2 text-xs text-slate-600"><CheckCircle2 className="w-4 h-4 text-indigo-600" />{entry}</div>)}
              </div>
            </div>

            <div id="custom-estimate" className="get-custom-estimate lg:col-span-7 rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div><h2 className="text-2xl font-bold text-slate-900">Get a custom estimate</h2><p className="mt-1 text-xs text-slate-500">Select your requirements to see a starting price.</p></div>
                <div className="hidden sm:flex w-11 h-11 rounded-2xl bg-indigo-50 text-indigo-600 items-center justify-center"><Sparkles className="w-5 h-5" /></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-7">
                <label className="text-xs font-semibold text-slate-700">Website type<select value={websiteType} onChange={(e) => setWebsiteType(e.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-indigo-100"><option>Business website</option><option>E-commerce store</option><option>Food ordering platform</option><option>SaaS application</option><option>Portfolio / landing page</option></select></label>
                <label className="text-xs font-semibold text-slate-700">Number of pages<select value={pages} onChange={(e) => setPages(e.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-indigo-100"><option>1–4 pages</option><option>5–8 pages</option><option>9–15 pages</option><option>16+ pages</option></select></label>
                <label className="text-xs font-semibold text-slate-700 sm:col-span-2">Build type<select value={stack} onChange={(e) => setStack(e.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-indigo-100">{packages.map((item) => <option key={item.name} value={item.name}>{item.name} — {formatPrice(item.price)}</option>)}</select></label>
              </div>
              <div className="mt-6">
                <p className="text-xs font-semibold text-slate-700 mb-3">Additional features</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {featureOptions.map(([key, label, price, , monthly]) => <label key={key} className={`flex items-center justify-between gap-3 rounded-xl border px-3.5 py-3 cursor-pointer transition-colors ${selectedFeatures.includes(key) ? 'border-indigo-300 bg-indigo-50/60' : 'border-slate-200 hover:border-slate-300'}`}><span className="flex items-center gap-2 text-xs text-slate-700"><input type="checkbox" checked={selectedFeatures.includes(key)} onChange={() => toggleFeature(key)} className="accent-indigo-600" />{label}</span><span className="text-[10px] text-slate-400 text-right">{monthly ? <><span className="block">+{formatPrice(price)} setup</span><span className="block text-amber-600">+{formatPrice(monthly)}/mo</span></> : `+${formatPrice(price)}`}</span></label>)}
                </div>
              </div>
              <div className="mt-7 rounded-2xl bg-slate-900 p-5 text-white">
                <p className="text-xs text-slate-300">Recommended package</p>
                <div className="mt-1 flex flex-col sm:flex-row sm:items-end justify-between gap-2"><div className="text-xl font-bold">{estimate.exceedsPremium ? 'Custom Enterprise Estimate' : estimate.selectedPackage.name}</div><div className="text-2xl font-extrabold">{formatPrice(estimate.price)}<span className="text-sm text-slate-400">+</span></div></div>
                <div className="mt-4 pt-4 border-t border-white/10 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-slate-300">
                    <span>Normal package price</span>
                    <span className="font-semibold text-white">{formatPrice(estimate.selectedPackage.price)}</span>
                  </div>
                  {selectedFeatures.length > 0 ? (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-slate-300">
                        <span>Selected features</span>
                        <span className="font-semibold text-white">+{formatPrice(estimate.featureTotal)}</span>
                      </div>
                      <div className="pl-3 space-y-1 border-l border-white/20">
                        {selectedFeatures.map((key) => {
                          const feature = featureOptions.find(([id]) => id === key);
                          return feature ? (
                            <div key={key} className="flex items-center justify-between gap-3 text-[11px] text-slate-400">
                              <span>{feature[1]}</span>
                              <span>+{formatPrice(feature[2])}</span>
                            </div>
                          ) : null;
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between text-slate-400">
                      <span>Selected features</span>
                      <span>None</span>
                    </div>
                  )}
                  {estimate.monthlyTotal > 0 && (
                    <div className="flex items-center justify-between text-amber-300">
                      <span>Monthly service charges</span>
                      <span className="font-semibold">+{formatPrice(estimate.monthlyTotal)}/month</span>
                    </div>
                  )}
                  {estimate.pageExtra > 0 && (
                    <div className="flex items-center justify-between text-slate-300">
                      <span>Additional page price</span>
                      <span className="font-semibold text-white">+{formatPrice(estimate.pageExtra)}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between pt-2 mt-2 border-t border-white/10 font-bold text-white">
                    <span>Estimated starting price</span>
                    <span>{estimate.exceedsPremium ? '₹30,000+' : `${formatPrice(estimate.price)}+`}</span>
                  </div>
                </div>
                <p className="mt-3 text-xs text-slate-300 leading-relaxed">{estimate.exceedsPremium ? 'Your selected add-ons take this estimate above the Premium starting price. We will provide a custom quotation after reviewing the requirements.' : `The ${estimate.selectedPackage.name} base price plus your selected features and page scope. Final pricing depends on integrations, design requirements, and development time.`}</p>
              </div>
              <p className="mt-4 text-[11px] text-slate-500">This is an estimated price. Final pricing will be confirmed after reviewing your complete requirements.</p>
            </div>
          </div>

          <div className={`${showContactStep ? 'hidden' : ''} mt-8 flex justify-end`}>
            <button
              type="button"
              onClick={() => {
                setShowContactStep(true);
                window.requestAnimationFrame(() => {
                  document.querySelector('.get-custom-estimate')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                });
              }}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 px-5 py-3 text-sm font-semibold text-white"
            >
              Next <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {showContactStep && (
            <form onSubmit={sendEstimateRequest} className="get-custom-estimate mt-10 rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm">
              <div className="max-w-2xl">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Talk to a developer</span>
                <h2 className="mt-2 text-2xl font-bold text-slate-900">Have additional requirements?</h2>
                <p className="mt-2 text-sm text-slate-600">Tell us what you want to build or ask us to review your estimate. Your request will be sent securely to the NovaStack team.</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowContactStep(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-100 hover:bg-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-700"
              >
                Back to estimate
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <label className="text-xs font-semibold text-slate-700">Your name<input required value={customer.name} onChange={(event) => updateCustomer('name', event.target.value)} placeholder="Your name" className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-indigo-100" /></label>
                <label className="text-xs font-semibold text-slate-700">Email address<input required type="email" value={customer.email} onChange={(event) => updateCustomer('email', event.target.value)} placeholder="you@company.com" className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-indigo-100" /></label>
                <label className="text-xs font-semibold text-slate-700">Phone number<input required type="tel" value={customer.phone} onChange={(event) => updateCustomer('phone', event.target.value)} placeholder="+91 72075 60098" className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-indigo-100" /></label>
                <label className="text-xs font-semibold text-slate-700">Company / project name<input value={customer.company} onChange={(event) => updateCustomer('company', event.target.value)} placeholder="Acme Corp" className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-indigo-100" /></label>
              </div>
              {hasCustomFeatureRequest && (
                <label className="block mt-5 text-xs font-semibold text-slate-700">
                  Additional features or questions
                  <textarea
                    value={customFeatures}
                    onChange={(event) => setCustomFeatures(event.target.value)}
                    rows={4}
                    placeholder="Describe any features, integrations, pages, or questions for the developer..."
                    className="mt-1.5 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm font-normal resize-y focus:outline-none focus:ring-2 focus:ring-indigo-100"
                  />
                </label>
              )}
              {requestStatus.message && <div className={`mt-4 rounded-xl px-4 py-3 text-xs ${requestStatus.type === 'success' ? 'bg-emerald-50 border border-emerald-200 text-emerald-700' : 'bg-rose-50 border border-rose-200 text-rose-700'}`}>{requestStatus.message}</div>}
              <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-4">
                <button type="submit" disabled={sendingRequest} className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 px-5 py-3 text-sm font-semibold text-white">
                  {sendingRequest ? 'Sending request...' : 'Send to NovaStack developer'} <ArrowRight className="w-4 h-4" />
                </button>
                <a href={`mailto:${CONTACT_INFO.email}`} className="text-sm font-semibold text-indigo-600 hover:text-indigo-700">Email {CONTACT_INFO.email}</a>
              </div>
            </form>
          )}

          <div className="mt-20 rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-slate-900">Important pricing terms</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 mt-5">
              {[
                'Prices are starting prices; final pricing depends on requirements and complexity.',
                'Hosting, domains, paid APIs, gateway, SMS, WhatsApp, and other third-party charges are excluded unless stated.',
                'Maintenance covers code errors and bugs related to delivered functionality only.',
                'New features, redesigns, integrations, and functionality changes are chargeable separately.',
                'Three included theme/UI/interface changes means three revision rounds during development.',
                'Additional revision rounds or major redesigns may incur additional charges.',
                'Final pricing and scope will be confirmed before development begins.',
                'Free maintenance does not include new content, new pages, or scope expansion.',
              ].map((term) => <div key={term} className="flex items-start gap-2 text-xs text-slate-600 leading-relaxed"><Check className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />{term}</div>)}
            </div>
          </div>

          <div className="mt-16 rounded-3xl bg-gradient-to-br from-indigo-600 to-blue-700 p-8 sm:p-12 text-white text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold">Need a Custom Website?</h2>
            <p className="mt-3 text-indigo-100 max-w-xl mx-auto">Tell us what you need, and we'll estimate the development cost based on your requirements.</p>
            <div className="mt-7 flex flex-col sm:flex-row justify-center gap-3">
              <a href="#custom-estimate" onClick={(e) => { e.preventDefault(); setShowContactStep(true); window.requestAnimationFrame(() => document.querySelector('.get-custom-estimate')?.scrollIntoView({ behavior: 'smooth', block: 'start' })); }} className="inline-flex items-center justify-center gap-2 rounded-xl bg-white text-indigo-700 px-5 py-3 text-sm font-bold hover:bg-indigo-50"><span>Get Custom Estimate</span><ArrowRight className="w-4 h-4" /></a>
              <Button href={`https://wa.me/917207560098?text=Hello%20NovaStack%2C%20I%20need%20a%20custom%20website%20estimate.`} variant="outline" icon={MessageCircle} iconPosition="left" className="border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white">WhatsApp NovaStack</Button>
              <Button to="/contact" variant="outline" icon={ArrowRight} className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white">Contact NovaStack</Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default CostEstimator;
