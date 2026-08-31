import React, { useState, useEffect } from 'react';
import { Search, BookOpen, Clock, Tag } from 'lucide-react';
import Container from '../components/common/Container';
import SectionHeading from '../components/common/SectionHeading';
import InsightCard from '../components/cards/InsightCard';
import CTASection from '../components/common/CTASection';
import SEO from '../components/common/SEO';
import { getInsights } from '../services/api';

export const Insights = () => {
  const [insights, setInsights] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  const categories = [
    'All',
    'MERN Stack',
    'Web Development',
    'Performance',
    'E-Commerce',
    'UI/UX',
    'SEO',
  ];

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await getInsights();
        setInsights(data);
      } catch (err) {
        console.error('Failed to load insights:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const filteredInsights = insights.filter((item) => {
    const matchCategory =
      activeCategory === 'All' || item.category === activeCategory;
    const matchSearch =
      searchTerm.trim() === '' ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'NovaStack Engineering Insights',
    description: 'Technical articles, architectural tutorials, and guides for MERN full-stack development.',
    url: 'https://novastack.dev/insights',
  };

  return (
    <>
      <SEO
        title="Engineering Insights & Articles — NovaStack"
        description="Read technical breakdowns, architecture guides, performance tips, and software development insights from the NovaStack engineering team."
        schema={blogSchema}
      />

      <section className="pt-12 pb-24 md:pt-16 md:pb-32">
        <Container>
          <SectionHeading
            badge="Engineering Insights"
            title="Technical Articles &"
            highlight="Product Guides"
            subtitle="Deep architectural dives, full-stack tutorials, performance benchmarks, and best practices from our engineering team."
          />

          {/* Search & Category Filter Bar */}
          <div className="max-w-4xl mx-auto mt-12 mb-16 space-y-6">
            {/* Search Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search articles by title, topic, or keyword..."
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 transition-all"
              />
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredInsights.map((article) => (
              <InsightCard key={article.slug} insight={article} />
            ))}
          </div>

          {filteredInsights.length === 0 && !loading && (
            <div className="text-center py-20 text-slate-500 text-sm">
              No technical articles found matching your query.
            </div>
          )}
        </Container>
      </section>

      <CTASection />
    </>
  );
};

export default Insights;
