import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ExternalLink, Sparkles } from 'lucide-react';
import TechnologyBadge from '../common/TechnologyBadge';

export const ProjectCard = ({ project, featured = false }) => {
  const {
    title,
    slug,
    tagline,
    category,
    description,
    technologies = [],
    thumbnail,
    metrics = [],
  } = project;

  return (
    <div
      className={`group relative rounded-3xl bg-white border border-slate-200 hover:border-slate-300 transition-all duration-200 flex flex-col overflow-hidden ${
        featured ? 'lg:grid lg:grid-cols-12 lg:gap-8 p-6 sm:p-8' : 'p-6'
      }`}
    >
      {/* Thumbnail */}
      <div
        className={`relative overflow-hidden rounded-2xl bg-slate-100 border border-slate-100 ${
          featured ? 'lg:col-span-6 h-64 sm:h-80 lg:h-full min-h-[260px]' : 'h-52 w-full mb-5'
        }`}
      >
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Category Pill Tag */}
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/95 text-slate-800 border border-slate-200">
            {category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div
        className={`flex flex-col justify-between ${
          featured ? 'lg:col-span-6 pt-4 lg:pt-0' : 'flex-1'
        }`}
      >
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">
              <Link to={`/projects/${slug}`}>{title}</Link>
            </h3>

            <Link
              to={`/projects/${slug}`}
              className="p-2 rounded-xl bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-500 transition-colors shrink-0"
              aria-label={`View ${title} case study`}
            >
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {tagline && (
            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
              {tagline}
            </p>
          )}

          <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed font-normal">
            {description}
          </p>

          {/* Metric Highlights if available */}
          {metrics && metrics.length > 0 && (
            <div className="grid grid-cols-2 gap-2 pt-2">
              {metrics.slice(0, 2).map((m, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-base font-bold text-indigo-600">{m.value}</div>
                  <div className="text-[11px] text-slate-500 font-medium">{m.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Technologies and View Case Study footer */}
        <div className="pt-5 mt-5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {technologies.slice(0, 3).map((tech) => (
              <TechnologyBadge key={tech} name={tech} size="sm" />
            ))}
            {technologies.length > 3 && (
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600 self-center">
                +{technologies.length - 3} more
              </span>
            )}
          </div>

          <Link
            to={`/projects/${slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            <span>View Case Study</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
