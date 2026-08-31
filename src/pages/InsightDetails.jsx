import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Clock,
  Eye,
  Calendar,
  Tag,
  Share2,
  Check,
} from 'lucide-react';
import Container from '../components/common/Container';
import CTASection from '../components/common/CTASection';
import SEO from '../components/common/SEO';
import { getInsightBySlug } from '../services/api';
import { formatDate } from '../utils/formatters';

export const InsightDetails = () => {
  const { slug } = useParams();
  const [insight, setInsight] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await getInsightBySlug(slug);
        setInsight(data);
      } catch (err) {
        console.error('Failed to load article:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [slug]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: insight.title,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="py-32 text-center text-slate-500">
        <div className="animate-spin w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full mx-auto mb-4" />
        <p className="text-xs">Loading article...</p>
      </div>
    );
  }

  if (!insight) {
    return (
      <Container className="py-24 text-center">
        <h2 className="text-2xl font-bold text-slate-900">Article Not Found</h2>
        <p className="text-slate-500 mt-2 text-sm">
          The requested engineering article does not exist or has been relocated.
        </p>
        <Link
          to="/insights"
          className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Insights
        </Link>
      </Container>
    );
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: insight.title,
    description: insight.summary,
    image: insight.coverImage,
    datePublished: insight.createdAt,
    author: {
      '@type': 'Organization',
      name: 'NovaStack Engineering',
    },
    publisher: {
      '@type': 'Organization',
      name: 'NovaStack',
      logo: {
        '@type': 'ImageObject',
        url: 'https://novastack.dev/favicon.svg',
      },
    },
  };

  return (
    <>
      <SEO
        title={`${insight.title} — NovaStack Insights`}
        description={insight.summary}
        schema={articleSchema}
      />

      <article className="pt-10 pb-20 md:pt-16 md:pb-28">
        <Container size="small">
          {/* Back Button */}
          <Link
            to="/insights"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Insights</span>
          </Link>

          {/* Category Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 mb-4">
            <span>{insight.category}</span>
          </div>

          {/* Article Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight font-display leading-[1.2]">
            {insight.title}
          </h1>

          {/* Meta Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 py-4 my-6 border-y border-slate-200 text-xs text-slate-500">
            <div className="flex flex-wrap items-center gap-4">
              <span className="flex items-center gap-1.5 font-medium text-slate-700">
                By NovaStack Engineering
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(insight.createdAt)}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-indigo-600" />
                {insight.readTime || '5 min read'}
              </span>
            </div>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Link Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </>
              )}
            </button>
          </div>

          {/* Cover Image */}
          <div className="rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 aspect-[16/9] mb-10">
            <img
              src={insight.coverImage}
              alt={insight.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Summary Excerpt Box */}
          <div className="p-6 rounded-2xl bg-indigo-50/50 border border-indigo-100 mb-10">
            <p className="text-base text-slate-700 font-medium italic leading-relaxed">
              "{insight.summary}"
            </p>
          </div>

          {/* Article Main Markdown Content */}
          <div className="prose prose-slate max-w-none space-y-6 text-slate-700 leading-relaxed font-normal">
            {insight.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('## ')) {
                return (
                  <h2
                    key={index}
                    className="text-2xl font-bold text-slate-900 mt-8 mb-3 font-display"
                  >
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              }
              if (paragraph.startsWith('### ')) {
                return (
                  <h3
                    key={index}
                    className="text-lg font-bold text-slate-900 mt-6 mb-2"
                  >
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('- ')) {
                const items = paragraph.split('\n');
                return (
                  <ul key={index} className="space-y-2 list-disc pl-5 my-3">
                    {items.map((item, idx) => (
                      <li key={idx}>{item.replace('- ', '')}</li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={index} className="text-base text-slate-700 leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Tags */}
          {insight.tags && insight.tags.length > 0 && (
            <div className="pt-10 mt-12 border-t border-slate-200 flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-slate-500 uppercase">Tags:</span>
              {insight.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-700"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </Container>
      </article>

      <CTASection />
    </>
  );
};

export default InsightDetails;
