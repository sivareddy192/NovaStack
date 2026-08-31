import React from 'react';

export const StatCard = ({
  number,
  label,
  description,
  icon: Icon,
  trend,
  className = '',
}) => {
  return (
    <div
      className={`rounded-2xl bg-white border border-slate-200 p-6 transition-all duration-200 hover:border-slate-300 ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        {Icon && (
          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
            <Icon className="w-5 h-5" />
          </div>
        )}
        {trend && (
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            {trend}
          </span>
        )}
      </div>

      <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
        {number}
      </div>

      <div className="mt-1 text-sm font-semibold text-slate-800">{label}</div>

      {description && (
        <p className="mt-2 text-xs text-slate-500 leading-relaxed font-normal">
          {description}
        </p>
      )}
    </div>
  );
};

export default StatCard;
