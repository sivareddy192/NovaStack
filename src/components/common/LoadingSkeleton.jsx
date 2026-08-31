import React from 'react';

export const LoadingSkeleton = ({
  count = 3,
  type = 'card',
  className = '',
}) => {
  if (type === 'card') {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${className}`}>
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="rounded-3xl bg-white border border-slate-200 p-6 space-y-4 animate-pulse"
          >
            <div className="h-48 bg-slate-100 rounded-2xl w-full" />
            <div className="space-y-2">
              <div className="h-4 bg-slate-200 rounded w-1/3" />
              <div className="h-6 bg-slate-200 rounded w-3/4" />
              <div className="h-4 bg-slate-100 rounded w-full" />
              <div className="h-4 bg-slate-100 rounded w-5/6" />
            </div>
            <div className="pt-4 flex gap-2">
              <div className="h-6 bg-slate-100 rounded w-16" />
              <div className="h-6 bg-slate-100 rounded w-20" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="h-12 bg-slate-100 rounded-xl w-full animate-pulse border border-slate-200"
        />
      ))}
    </div>
  );
};

export default LoadingSkeleton;
