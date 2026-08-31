import { useEffect } from 'react';

export const SEO = ({
  title,
  description = 'NovaStack is a software development business specializing in building modern, scalable and high-performance web applications using the MERN stack.',
  image = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80',
  url = window.location.href,
  schema = null,
}) => {
  const fullTitle = title
    ? `${title} | NovaStack — Modern Digital Products`
    : 'NovaStack — Modern Digital Products. Built to Scale.';

  useEffect(() => {
    document.title = fullTitle;

    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = description;

    // Update OG Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.content = fullTitle;

    // Update OG Description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.content = description;

    // Update OG Image
    let ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) ogImage.content = image;

    // Add JSON-LD schema if provided
    let schemaScript = document.getElementById('novastack-schema-jsonld');
    if (schema) {
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.id = 'novastack-schema-jsonld';
        schemaScript.type = 'application/ld+json';
        document.head.appendChild(schemaScript);
      }
      schemaScript.text = JSON.stringify(schema);
    } else if (schemaScript) {
      schemaScript.remove();
    }
  }, [fullTitle, description, image, url, schema]);

  return null;
};

export default SEO;
