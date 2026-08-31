import React from 'react';
import { Link } from 'react-router-dom';
import {
  Layers,
  ShoppingBag,
  Utensils,
  Globe,
  LayoutDashboard,
  Server,
  Palette,
  Zap,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export const ServiceCard = ({ service, detailed = false }) => {
  const {
    title,
    slug,
    shortDescription,
    fullDescription,
    icon,
    deliverables = [],
    technologies = [],
    benefits = [],
    startingPrice,
  } = service;

  const iconMap = {
    Layers,
    ShoppingBag,
    Utensils,
    Globe,
    LayoutDashboard,
    Server,
    Palette,
    Zap,
  };

  const IconComponent = iconMap[icon] || Layers;

  return (
    <div className="group relative rounded-3xl bg-white border border-slate-200 hover:border-slate-300 transition-all duration-200 p-6 sm:p-8 flex flex-col justify-between">
      <div>
        {/* Top Icon & Starting Price */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 group-hover:scale-105 transition-transform duration-200">
            <IconComponent className="w-6 h-6" />
          </div>

          {startingPrice && (
            <div className="text-right">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">
                Starting from
              </span>
              <span className="text-sm font-bold text-slate-900">{startingPrice}</span>
            </div>
          )}
        </div>

        {/* Title & Description */}
        <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-2.5">
          {title}
        </h3>

        <p className="text-sm text-slate-600 leading-relaxed font-normal mb-6">
          {detailed && fullDescription ? fullDescription : shortDescription}
        </p>

        {/* Key Deliverables Bullet Points */}
        {deliverables && deliverables.length > 0 && (
          <div className="space-y-2.5 mb-6 pt-4 border-t border-slate-100">
            <div className="text-xs font-semibold text-slate-800 uppercase tracking-wider">
              Core Deliverables:
            </div>
            <ul className="space-y-1.5 text-xs text-slate-600">
              {deliverables.slice(0, 3).map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
        <Link
          to={`/contact?service=${encodeURIComponent(title)}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          <span>Inquire About This Service</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
