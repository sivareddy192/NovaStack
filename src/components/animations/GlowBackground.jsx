import React from 'react';

export const GlowBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-indigo-50/70 via-blue-50/40 to-transparent rounded-full blur-3xl opacity-80" />
      <div className="absolute inset-0 light-grid-pattern opacity-40" />
    </div>
  );
};

export default GlowBackground;
