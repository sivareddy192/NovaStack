import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ExternalLink,
  Github,
  CheckCircle2,
  Layers,
  Sparkles,
  Zap,
  TrendingUp,
} from 'lucide-react';
import Container from '../components/common/Container';
import TechnologyBadge from '../components/common/TechnologyBadge';
import CTASection from '../components/common/CTASection';
import SEO from '../components/common/SEO';
import { getProjectBySlug } from '../services/api';

export const ProjectDetails = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await getProjectBySlug(slug);
        setProject(data);
      } catch (err) {
        console.error('Failed to load project details:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="py-32 text-center text-slate-500">
        <div className="animate-spin w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full mx-auto mb-4" />
        <p className="text-xs">Loading case study...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <Container className="py-24 text-center">
        <h2 className="text-2xl font-bold text-slate-900">Case Study Not Found</h2>
        <p className="text-slate-500 mt-2 text-sm">
          The requested project case study could not be loaded.
        </p>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>
      </Container>
    );
  }

  return (
    <>
      <SEO
        title={`${project.title} — Case Study | NovaStack`}
        description={project.description}
      />

      <article className="pt-10 pb-20 md:pt-16 md:pb-28">
        <Container size="default">
          {/* Back Button */}
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Projects</span>
          </Link>

          {/* Hero Header */}
          <div className="space-y-4 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
              <span>{project.category}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight font-display">
              {project.title}
            </h1>

            {project.tagline && (
              <p className="text-base sm:text-lg text-indigo-600 font-medium">
                {project.tagline}
              </p>
            )}

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              {project.description}
            </p>
          </div>

          {/* Featured Hero Image */}
          <div className="my-10 rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 aspect-[16/9] max-h-[500px]">
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Metrics Row */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-10">
              {project.metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white border border-slate-200 text-center space-y-1"
                >
                  <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600 font-display">
                    {metric.value}
                  </div>
                  <div className="text-xs text-slate-500 font-medium">{metric.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Detailed Problem & Solution Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
            <div className="rounded-3xl bg-white border border-slate-200 p-8 space-y-4">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <span>The Challenge</span>
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                {project.problem ||
                  'The client needed a modern web application that could handle high-throughput traffic, maintain lightning-fast response times, and provide a frictionless user experience with zero downtime.'}
              </p>
            </div>

            <div className="rounded-3xl bg-white border border-slate-200 p-8 space-y-4">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>Our Engineering Solution</span>
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                {project.solution ||
                  'NovaStack architected a modular MERN stack solution featuring optimistic UI state updates, indexed MongoDB queries, Redis cache invalidation, and automated CI/CD pipelines.'}
              </p>
            </div>
          </div>

          {/* Technologies Used */}
          <div className="my-10 p-8 rounded-3xl bg-white border border-slate-200 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">
              Technology Stack & Architecture
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies?.map((tech) => (
                <TechnologyBadge key={tech} name={tech} size="md" />
              ))}
            </div>
          </div>
        </Container>
      </article>

      <CTASection
        title="Want Similar Results for Your Business?"
        subtitle="Schedule a discovery call with our engineering team to discuss your web application requirements."
      />
    </>
  );
};

export default ProjectDetails;
