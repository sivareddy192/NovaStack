import React from 'react';
import {
  Code,
  Server,
  Database,
  Cpu,
  Globe,
  Layers,
  Zap,
} from 'lucide-react';

export const TechnologyBadge = ({ name, icon, size = 'md' }) => {
  const getIcon = (techName) => {
    const lower = techName.toLowerCase();
    if (lower.includes('react')) return Code;
    if (lower.includes('node') || lower.includes('express')) return Server;
    if (lower.includes('mongo') || lower.includes('redis') || lower.includes('database'))
      return Database;
    if (lower.includes('tailwind') || lower.includes('css') || lower.includes('ui'))
      return Layers;
    if (lower.includes('docker') || lower.includes('cloud') || lower.includes('aws'))
      return Cpu;
    if (lower.includes('seo') || lower.includes('performance')) return Zap;
    return Globe;
  };

  const IconComponent = icon || getIcon(name);

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[11px] gap-1',
    md: 'px-3 py-1 text-xs gap-1.5',
    lg: 'px-4 py-1.5 text-sm gap-2',
  };

  return (
    <span
      className={`inline-flex items-center rounded-lg font-medium bg-slate-100/90 text-slate-700 border border-slate-200/80 transition-colors hover:border-slate-300 hover:bg-slate-100 ${sizeClasses[size]}`}
    >
      <IconComponent className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
      <span>{name}</span>
    </span>
  );
};

export default TechnologyBadge;
