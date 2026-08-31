import React from 'react';
import { Link } from 'react-router-dom';

export const Logo = ({
  to = '/',
  size = 'md',
  subtitle = 'Building the Future',
  showSubtitle = true,
  className = '',
}) => {
  const iconSizes = {
    sm: 'h-7 w-7',
    md: 'h-8 w-8 sm:h-9 sm:w-9',
    lg: 'h-10 w-10 sm:h-11 sm:w-11',
    xl: 'h-12 w-12 sm:h-14 sm:w-14',
  };

  const titleSizes = {
    sm: 'text-base',
    md: 'text-lg sm:text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
  };

  const subtitleSizes = {
    sm: 'text-[9px]',
    md: 'text-[10px] sm:text-[11px]',
    lg: 'text-xs',
    xl: 'text-sm',
  };

  const content = (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Logo image from public folder */}
      <img
        src="/logo.png"
        alt="NovaStack Logo"
        className={`${iconSizes[size] || iconSizes.md} object-contain shrink-0 transition-transform duration-200 group-hover:scale-105`}
      />

      {/* Text: NovaStack - Building the Future */}
      <div className="flex flex-col justify-center leading-tight">
        <div className={`font-extrabold tracking-tight font-display ${titleSizes[size] || titleSizes.md}`}>
          <span className="text-slate-900">Nova</span>
          <span className="text-indigo-600">Stack</span>
        </div>
        {showSubtitle && subtitle && (
          <span
            className={`font-medium text-slate-500 tracking-normal ${
              subtitleSizes[size] || subtitleSizes.md
            }`}
          >
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );

  if (to) {
    return (
      <Link
        to={to}
        className="inline-flex items-center group focus:outline-none py-1"
        aria-label="NovaStack - Building the Future"
      >
        {content}
      </Link>
    );
  }

  return content;
};

export default Logo;
