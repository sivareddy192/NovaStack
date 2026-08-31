import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowUpRight, BookOpen } from 'lucide-react';
import { formatDate } from '../../utils/formatters';

export const InsightCard = ({ insight }) => {
  const {
    title,
    slug,
    category,
    summary,
    coverImage,
    readTime,
    createdAt,
    tags = [],
  } = insight;

  return (
    <article className="group relative rounded-3xl bg-white border border-slate-200 hover:border-slate-300 transition-all duration-200 p-6 flex flex-col justify-between overflow-hidden">
      <div>
        {/* Cover Image */}
        <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-5 bg-slate-100 border border-slate-100">
          <img
            src={coverImage}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />

          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/95 text-slate-800 border border-slate-200">
              {category}
            </span>
          </div>
        </div>

        {/* Meta Header */}
        <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-indigo-600" />
            {readTime || '5 min read'}
          </span>
          <span>•</span>
          <span>{formatDate(createdAt)}</span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors mb-2.5 line-clamp-2">
          <Link to={`/insights/${slug}`}>{title}</Link>
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed font-normal mb-4">
          {summary}
        </p>
      </div>

      {/* Footer Tags & CTA */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {tags.slice(0, 2).map((t) => (
            <span
              key={t}
              className="text-[11px] font-medium text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-md"
            >
              #{t}
            </span>
          ))}
        </div>

        <Link
          to={`/insights/${slug}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          <span>Read Article</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </article>
  );
};

export default InsightCard;
