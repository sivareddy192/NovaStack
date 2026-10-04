import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
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
    let active = true;
    getProjectBySlug(slug)
      .then((data) => {
        if (active) setProject(data);
      })
      .catch((error) => {
        console.error('Failed to load project details:', error);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, [slug]);

  if (loading) {
    return (
      <article className="pt-10 pb-20 md:pt-16 md:pb-28 animate-pulse">
        <Container size="default">
          <div className="h-4 w-36 rounded-full bg-slate-200 mb-8" />
          <div className="space-y-4 max-w-4xl">
            <div className="h-7 w-24 rounded-full bg-slate-200" />
            <div className="h-12 w-3/4 rounded-xl bg-slate-200" />
            <div className="h-4 w-1/2 rounded-full bg-slate-100" />
            <div className="h-4 w-full rounded-full bg-slate-100" />
          </div>
          <div className="my-10 aspect-[16/9] rounded-3xl bg-slate-200" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="h-44 rounded-3xl bg-slate-100" />
            <div className="h-44 rounded-3xl bg-slate-100" />
          </div>
        </Container>
      </article>
    );
  }

  if (!project) {
    return (
      <Container className="py-24 text-center">
        <h2 className="text-2xl font-bold text-slate-900">Case Study Not Found</h2>
        <p className="text-slate-500 mt-2 text-sm">The requested project case study could not be loaded.</p>
        <Link to="/projects" className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold"><ArrowLeft className="w-4 h-4" />Back to Projects</Link>
      </Container>
    );
  }

  return (
    <>
      <SEO title={`${project.title} — Case Study | NovaStack`} description={project.description} />
      <article className="pt-10 pb-20 md:pt-16 md:pb-28">
        <Container size="default">
          <Link to="/projects" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-indigo-600 transition-colors mb-8"><ArrowLeft className="w-4 h-4" />Back to All Projects</Link>
          <div className="space-y-4 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">{project.category}</div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight font-display">{project.title}</h1>
            {project.tagline && <p className="text-base sm:text-lg text-indigo-600 font-medium">{project.tagline}</p>}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">{project.description}</p>
          </div>
          {project.thumbnail && <div className="my-10 rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 aspect-[16/9] max-h-[500px]"><img src={project.thumbnail} alt={project.title} width="1400" height="788" decoding="async" className="w-full h-full object-cover" /></div>}
          {project.metrics?.length > 0 && <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-10">{project.metrics.map((metric) => <div key={`${metric.label}-${metric.value}`} className="p-6 rounded-2xl bg-white border border-slate-200 text-center space-y-1"><div className="text-2xl sm:text-3xl font-extrabold text-indigo-600 font-display">{metric.value}</div><div className="text-xs text-slate-500 font-medium">{metric.label}</div></div>)}</div>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
            <div className="rounded-3xl bg-white border border-slate-200 p-8 space-y-4"><h3 className="text-xl font-bold text-slate-900 flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-rose-500" />The Challenge</h3><p className="text-sm text-slate-600 leading-relaxed font-normal">{project.problem || 'The client needed a modern web application that could handle business requirements and provide a frictionless user experience.'}</p></div>
            <div className="rounded-3xl bg-white border border-slate-200 p-8 space-y-4"><h3 className="text-xl font-bold text-slate-900 flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />Our Engineering Solution</h3><p className="text-sm text-slate-600 leading-relaxed font-normal">{project.solution || 'NovaStack delivered a maintainable, responsive solution tailored to the agreed project scope.'}</p></div>
          </div>
          <div className="my-10 p-8 rounded-3xl bg-white border border-slate-200 space-y-4"><h3 className="text-lg font-bold text-slate-900">Technology Stack & Architecture</h3><div className="flex flex-wrap gap-2">{project.technologies?.map((tech) => <TechnologyBadge key={tech} name={tech} size="md" />)}</div></div>
          {(project.development || project.liveUrl || project.githubUrl) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10">
              {project.development && (
                <div className="rounded-3xl bg-white border border-slate-200 p-8 space-y-4">
                  <h3 className="text-lg font-bold text-slate-900">Development Details &amp; Tech Specs</h3>
                  <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{project.development}</p>
                </div>
              )}
              {(project.liveUrl || project.githubUrl) && (
                <div className="rounded-3xl bg-white border border-slate-200 p-8 space-y-4">
                  <h3 className="text-lg font-bold text-slate-900">Project Links</h3>
                  <div className="flex flex-wrap gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-indigo-700"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Live Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 transition-colors hover:border-indigo-200 hover:text-indigo-600"
                      >
                        <Github className="h-4 w-4" />
                        GitHub Repository
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </Container>
      </article>
      <CTASection title="Want Similar Results for Your Business?" subtitle="Schedule a discovery call with our engineering team to discuss your web application requirements." />
    </>
  );
};

export default ProjectDetails;
