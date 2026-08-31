import React, { useState, useEffect } from 'react';
import Container from '../components/common/Container';
import SectionHeading from '../components/common/SectionHeading';
import ServiceCard from '../components/cards/ServiceCard';
import CTASection from '../components/common/CTASection';
import SEO from '../components/common/SEO';
import { getServices } from '../services/api';

export const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices();
        setServices(data);
      } catch (err) {
        console.error('Failed to load services:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const servicesSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Full-Stack Software Development',
    provider: {
      '@type': 'Organization',
      name: 'NovaStack',
    },
    areaServed: 'Worldwide',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'MERN Stack Development Services',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.title,
          description: s.shortDescription,
        },
      })),
    },
  };

  return (
    <>
      <SEO
        title="Services & Capabilities — NovaStack MERN Development"
        description="Explore our specialized full-stack development services: custom web apps, e-commerce stores, food ordering platforms, admin dashboards, and REST APIs."
        schema={servicesSchema}
      />

      <section className="pt-12 pb-24 md:pt-16 md:pb-32">
        <Container>
          <SectionHeading
            badge="Full-Stack Capabilities"
            title="Software Engineering"
            highlight="Tailored to Scale"
            subtitle="Explore our 8 specialized engineering capabilities. Every solution is architected with modern standards, automated testing, and zero technical debt."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {services.map((service) => (
              <ServiceCard key={service.slug} service={service} detailed={true} />
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        title="Need a Custom Engineering Architecture?"
        subtitle="Tell us your specific requirements and get a detailed architectural recommendation and proposal."
      />
    </>
  );
};

export default Services;
