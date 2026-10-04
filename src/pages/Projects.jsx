import React, { useEffect, useState } from 'react';
import Container from '../components/common/Container';
import SectionHeading from '../components/common/SectionHeading';
import ProjectCard from '../components/cards/ProjectCard';
import CTASection from '../components/common/CTASection';
import SEO from '../components/common/SEO';
import { getProjects } from '../services/api';

export const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    getProjects().then((data) => {
      if (active) setProjects(data);
    }).finally(() => {
      if (active) setLoading(false);
    });
    return () => { active = false; };
  }, []);

  const categories = [
    'All',
    ...new Set(projects.map((project) => project.category).filter(Boolean)),
  ];

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const ProjectSkeleton = () => (
    <div className="rounded-3xl bg-white border border-slate-200 overflow-hidden animate-pulse">
      <div className="aspect-[16/10] bg-slate-200" />
      <div className="p-6 space-y-4">
        <div className="h-3 w-24 rounded-full bg-slate-200" />
        <div className="h-6 w-4/5 rounded-lg bg-slate-200" />
        <div className="h-3 w-full rounded-full bg-slate-100" />
        <div className="h-3 w-3/4 rounded-full bg-slate-100" />
        <div className="flex gap-2 pt-2">
          <div className="h-6 w-16 rounded-full bg-slate-100" />
          <div className="h-6 w-20 rounded-full bg-slate-100" />
        </div>
      </div>
    </div>
  );

  const CategorySkeleton = () => (
    <div className="flex flex-wrap items-center justify-center gap-2" aria-label="Loading project categories">
      {[16, 28, 24, 20, 12, 26, 32].map((width, index) => (
        <div
          key={index}
          className="h-10 animate-pulse rounded-full border border-slate-200 bg-slate-100"
          style={{ width: `${width * 8}px` }}
        />
      ))}
    </div>
  );

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'NovaStack Project Portfolio & Case Studies',
    description: 'Explore full-stack web applications and digital products engineered by NovaStack.',
    url: 'https://novastack.dev/projects',
  };

  return (
    <>
      <SEO
        title="Portfolio & Case Studies — NovaStack"
        description="Browse our portfolio of custom web applications, e-commerce stores, food ordering platforms, and SaaS products built with the MERN stack."
        schema={collectionSchema}
      />

      <section className="pt-12 pb-24 md:pt-16 md:pb-32">
        <Container>
          <SectionHeading
            badge="Selected Work"
            title="Projects built to make an"
            highlight="impact."
            subtitle="A small selection of products and experiments that reflect how we approach interfaces, systems, and solving real problems."
          />

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-12 mb-16">
            {loading ? <CategorySkeleton /> : categories.map((cat) => (
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

          {/* Projects Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" aria-label="Loading projects">
              {[0, 1, 2].map((item) => <ProjectSkeleton key={item} />)}
            </div>
          ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
          )}

          {!loading && filteredProjects.length === 0 && (
            <div className="text-center py-20 text-slate-500 text-sm">
              No projects found matching the selected category.
            </div>
          )}
        </Container>
      </section>

      <CTASection />
    </>
  );
};

export default Projects;
