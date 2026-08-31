import React from 'react';

export const GlowBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Subtle light ambient radial gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-indigo-50/70 via-blue-50/40 to-transparent rounded-full blur-3xl opacity-80" />
      <div className="absolute top-[40%] right-[-10%] w-[600px] h-[400px] bg-purple-50/50 rounded-full blur-3xl opacity-60" />
      <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[400px] bg-blue-50/50 rounded-full blur-3xl opacity-60" />

      {/* Subtle light geometric grid */}
      <div className="absolute inset-0 light-grid-pattern opacity-40" />
    </div>
  );
};

export default GlowBackground;
