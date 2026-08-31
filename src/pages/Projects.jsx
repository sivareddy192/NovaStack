import React, { useState, useEffect } from 'react';
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

  const categories = [
    'All',
    'Food Ordering',
    'E-Commerce',
    'Dashboard',
    'SaaS',
    'Business Website',
    'Full-Stack Application',
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        console.error('Failed to load projects:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

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
            title="Real-World Products."
            highlight="Real Results."
            subtitle="Explore our portfolio of completed full-stack software applications across e-commerce, on-demand food delivery, administrative operations, and SaaS."
          />

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-12 mb-16">
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

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>

          {filteredProjects.length === 0 && !loading && (
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
