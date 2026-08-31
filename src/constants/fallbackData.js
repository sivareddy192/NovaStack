export const DEFAULT_PRICING_CONFIG = {
  currency: 'INR',
  currencySymbol: '₹',
  projectTypes: [
    { id: 'business-website', name: 'Business Website', basePrice: 20000, baseWeeks: 2 },
    { id: 'ecommerce', name: 'E-Commerce Platform', basePrice: 35000, baseWeeks: 3 },
    { id: 'food-ordering', name: 'Food Ordering Platform', basePrice: 40000, baseWeeks: 3 },
    { id: 'saas-app', name: 'SaaS Application', basePrice: 50000, baseWeeks: 4 },
    { id: 'custom-web-app', name: 'Custom Web Application', basePrice: 45000, baseWeeks: 4 },
    { id: 'admin-dashboard', name: 'Admin Dashboard', basePrice: 30000, baseWeeks: 2 },
    { id: 'other', name: 'Other / Specialized', basePrice: 30000, baseWeeks: 3 },
  ],
  complexityMultipliers: {
    Basic: 1.0,
    Standard: 1.35,
    Advanced: 1.85,
    Enterprise: 2.75,
  },
  featuresPricing: [
    { id: 'auth', name: 'Authentication & RBAC', price: 6000, weeks: 0.5, description: 'JWT, secure cookies, Google/GitHub OAuth, role permissions' },
    { id: 'admin-dash', name: 'Admin Dashboard', price: 12000, weeks: 1.0, description: 'Content, user, orders & analytics control center' },
    { id: 'payment-gateway', name: 'Payment Gateway', price: 9000, weeks: 0.5, description: 'Stripe, Razorpay, webhooks, automatic receipt generation' },
    { id: 'order-management', name: 'Order Management', price: 10000, weeks: 1.0, description: 'Full lifecycle order status tracking and inventory sync' },
    { id: 'booking-system', name: 'Booking / Scheduling', price: 8000, weeks: 0.75, description: 'Calendar scheduling, slot allocation & reminders' },
    { id: 'notifications', name: 'Notifications (Email/SMS/Push)', price: 5000, weeks: 0.5, description: 'Automated email alerts, SMS dispatch & live push' },
    { id: 'analytics', name: 'Analytics & Telemetry', price: 7000, weeks: 0.5, description: 'Custom event tracking, charts, conversion funnels' },
    { id: 'api-integration', name: '3rd-Party API Integration', price: 8000, weeks: 0.75, description: 'CRM, ERP, logistics, marketing integrations' },
    { id: 'realtime-features', name: 'Real-Time Features (WebSockets)', price: 11000, weeks: 1.0, description: 'Live order tracking, chat, real-time metrics feed' },
    { id: 'user-management', name: 'Multi-User Management', price: 6000, weeks: 0.5, description: 'Profiles, activity logs, team permissions' },
  ],
  designMultipliers: {
    'Existing Design': 1.0,
    'Custom UI/UX': 1.25,
    'Premium UI/UX': 1.5,
  },
  timelineMultipliers: {
    '1–2 weeks': 1.3,
    '2–4 weeks': 1.15,
    '1–2 months': 1.0,
    '2+ months': 0.95,
  },
};

export const FALLBACK_SERVICES = [
  {
    _id: 'srv-1',
    title: 'Custom Web Applications',
    slug: 'custom-web-applications',
    shortDescription: 'Business-focused web applications designed around specific requirements and scalability.',
    fullDescription: 'We engineer bespoke full-stack web applications tailored to your precise workflows. Built with React.js, Node.js, Express, and MongoDB, our custom solutions deliver snappy sub-second responsiveness, resilient data layers, and modular architecture.',
    icon: 'Layers',
    deliverables: [
      'Tailored business logic & data modeling',
      'High-performance React frontend',
      'Secure Express REST API backend',
      'MongoDB database indexing & schema validation',
      'Complete end-to-end automated testing',
    ],
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'Docker'],
    benefits: ['Sub-second latency', 'Infinite horizontal scaling', 'Tailored to unique business logic', 'Zero vendor lock-in'],
    startingPrice: '₹45,000+',
    order: 1,
  },
  {
    _id: 'srv-2',
    title: 'E-Commerce Platforms',
    slug: 'ecommerce-platforms',
    shortDescription: 'Modern online stores with product management, payments, orders and analytics.',
    fullDescription: 'High-conversion, lightning-fast digital storefronts with dynamic product filtering, frictionless multi-step checkouts, secure payment gateway integrations (Razorpay, Stripe), automated inventory management, and intuitive customer portals.',
    icon: 'ShoppingBag',
    deliverables: [
      'Fast product catalog with instant search & filters',
      'Secure cart & checkout flow with webhook handlers',
      'Automated invoice & order tracking system',
      'Merchant admin dashboard for stock & sales',
      'SEO-optimized product and category landing pages',
    ],
    technologies: ['React.js', 'Node.js', 'MongoDB', 'Stripe / Razorpay', 'Tailwind CSS', 'Redis'],
    benefits: ['Reduced cart abandonment', 'Instant stock sync', 'Multi-gateway reliability', 'High conversion checkout'],
    startingPrice: '₹35,000+',
    order: 2,
  },
  {
    _id: 'srv-3',
    title: 'Food Ordering Platforms',
    slug: 'food-ordering-platforms',
    shortDescription: 'Restaurant ordering systems with menus, cart, checkout, order tracking and administration.',
    fullDescription: 'End-to-end digital food ordering ecosystems designed for restaurants, cloud kitchens, and multi-branch food chains. Features interactive digital menus, customizable item add-ons, live kitchen display status, and real-time delivery tracking.',
    icon: 'Utensils',
    deliverables: [
      'Interactive digital menu with dietary tags & custom variants',
      'Real-time live order dispatch for kitchen staff',
      'Customer SMS/WhatsApp order status notifications',
      'Integrated delivery radius calculation & payments',
      'Branch-wise sales reporting & inventory alerts',
    ],
    technologies: ['React.js', 'Node.js', 'WebSockets', 'MongoDB', 'Express.js', 'Tailwind CSS'],
    benefits: ['Zero 3rd-party marketplace commissions', 'Real-time order sync', 'Direct customer relationship', 'Instant dispatch alerts'],
    startingPrice: '₹40,000+',
    order: 3,
  },
  {
    _id: 'srv-4',
    title: 'Business Websites',
    slug: 'business-websites',
    shortDescription: 'Professional websites designed to generate leads and establish trust.',
    fullDescription: 'Showcase your company with an executive-grade web presence that commands authority. Crafted with modern aesthetics, dark/light visual polish, conversion-focused layout hierarchy, and blazing-fast Core Web Vitals scores.',
    icon: 'Globe',
    deliverables: [
      'Bespoke visual identity & responsive design',
      'Conversion-optimized lead capture funnels',
      'Full technical SEO schema & OpenGraph implementation',
      'Interactive service breakdown and portfolio showcases',
      'Sub-second page load times across all viewports',
    ],
    technologies: ['React.js', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Express.js', 'Node.js'],
    benefits: ['Higher lead conversion rate', 'Top Lighthouse performance', 'Flawless mobile responsiveness', 'Executive brand positioning'],
    startingPrice: '₹20,000+',
    order: 4,
  },
  {
    _id: 'srv-5',
    title: 'Admin Dashboards',
    slug: 'admin-dashboards',
    shortDescription: 'Powerful dashboards for managing customers, products, orders and business operations.',
    fullDescription: 'Take total control over your business operations with a tailor-made admin portal. Includes granular role-based access control (RBAC), interactive data visualization charts, CSV export/import, audit logs, and instant search.',
    icon: 'LayoutDashboard',
    deliverables: [
      'Role-based permission matrix (Superadmin, Manager, Editor)',
      'Real-time metrics, KPI cards, and trend graphs',
      'Bulk data management with search, filter, and pagination',
      'Activity logs and security event tracking',
      'Exportable reporting (CSV, PDF, Excel)',
    ],
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Chart.js', 'Tailwind CSS'],
    benefits: ['Streamlined team workflows', 'Real-time revenue visibility', 'Centralized data governance', 'Zero manual spreadsheet chaos'],
    startingPrice: '₹30,000+',
    order: 5,
  },
  {
    _id: 'srv-6',
    title: 'API & Backend Development',
    slug: 'api-backend-development',
    shortDescription: 'Secure, scalable REST APIs and backend systems.',
    fullDescription: 'High-throughput backend infrastructure designed for resilience. We build clean REST APIs with input validation, JWT authentication, rate limiting, MongoDB aggregation pipelines, background job queues, and complete OpenAPI/Postman documentation.',
    icon: 'Server',
    deliverables: [
      'REST API design following industry best practices',
      'Authentication, authorization, and rate-limiting security',
      'High-performance MongoDB indexing and aggregation queries',
      'Third-party webhook ingestion and integrations',
      'Comprehensive API documentation & Postman collections',
    ],
    technologies: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'JWT', 'Redis', 'Docker'],
    benefits: ['Robust 99.9% uptime reliability', 'Strict payload validation', 'Effortless third-party integrations', 'Fast query latency'],
    startingPrice: '₹30,000+',
    order: 6,
  },
  {
    _id: 'srv-7',
    title: 'UI/UX Development',
    slug: 'ui-ux-development',
    shortDescription: 'Responsive and intuitive interfaces optimized for conversion.',
    fullDescription: 'We translate design systems into clean, responsive, and accessible code. Using Tailwind CSS and Framer Motion, we craft delightful micro-interactions, dark mode palettes, and frictionless layouts that captivate users.',
    icon: 'Palette',
    deliverables: [
      'Modular atomic component library',
      'Smooth micro-animations and page transitions',
      'Full WCAG 2.1 accessibility compliance',
      'Mobile-first responsive typography and touch targets',
      'Design tokens system for rapid brand customization',
    ],
    technologies: ['React.js', 'Tailwind CSS', 'Framer Motion', 'Lucide Icons', 'Vite'],
    benefits: ['Higher user retention', 'Delightful fluid animations', 'Consistent design language', 'Accessible to all users'],
    startingPrice: '₹25,000+',
    order: 7,
  },
  {
    _id: 'srv-8',
    title: 'Website Optimization',
    slug: 'website-optimization-seo',
    shortDescription: 'Performance, SEO, responsiveness and technical optimization.',
    fullDescription: 'Supercharge your existing web application for speed and search engine rankings. We optimize asset delivery, implement code-splitting, eliminate render-blocking scripts, and install structured JSON-LD schemas.',
    icon: 'Zap',
    deliverables: [
      'Comprehensive Core Web Vitals (LCP, CLS, INP) optimization',
      'Bundle size reduction and code-splitting implementation',
      'Structured schema markup (Organization, Product, Article)',
      'Automated XML sitemap & robots.txt configuration',
      'Server response caching and CDN configuration',
    ],
    technologies: ['Performance Engineering', 'Vite', 'Webpack', 'Schema.org', 'Lighthouse'],
    benefits: ['Top Google search rankings', 'Lower bounce rates', 'Faster load on mobile networks', 'Improved ad quality scores'],
    startingPrice: '₹15,000+',
    order: 8,
  },
];

export const FALLBACK_PROJECTS = [
  {
    _id: 'proj-1',
    title: 'OmniFood Pro — Multi-Kitchen Ordering & Dispatch Platform',
    slug: 'omnifood-pro-food-ordering-platform',
    tagline: 'High-volume food ordering with real-time kitchen display and zero marketplace commission.',
    description: 'A comprehensive food ordering ecosystem built for multi-branch cloud kitchens. Features dynamic interactive menus, dietary filters, instant cart checkout with Razorpay/Stripe, live kitchen dispatch screens, and customer WhatsApp tracking.',
    category: 'Food Ordering',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'WebSockets', 'Tailwind CSS'],
    thumbnail: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1200&auto=format&fit=crop&q=80',
    ],
    problem: 'The client was losing 28% of their gross revenue to third-party aggregator commissions. In addition, orders placed during peak hours caused kitchen bottlenecks due to manual order ticketing and delayed status updates.',
    solution: 'NovaStack engineered a standalone, commission-free MERN stack ordering platform. We built a high-speed customer web app, an automated Kitchen Display System (KDS) running on WebSockets, and branch-level inventory control.',
    features: [
      'Instant digital menu search with dietary tags (Veg, Vegan, Gluten-Free)',
      'Real-time kitchen order board with automatic sound alerts',
      'Multi-gateway payment support (UPI, Credit Cards, Net Banking)',
      'Automated customer SMS and WhatsApp live dispatch tracking',
      'Branch-wise financial reporting and item availability toggle',
    ],
    development: 'Built with React 18 frontend leveraging lightweight state management and optimistic UI updates for instant cart responsiveness. The Node.js/Express backend uses MongoDB aggregation pipelines to calculate sales trends and WebSocket channels for zero-latency kitchen broadcast.',
    results: [
      'Saved 28% in 3rd-party marketplace commission fees in the first month',
      'Reduced average order prep and dispatch turnaround time by 34%',
      'Processed over 18,000 orders within the initial 90 days with 99.98% uptime',
    ],
    metrics: [
      { label: 'Commission Saved', value: '28%' },
      { label: 'Speed Increase', value: '34%' },
      { label: 'Uptime', value: '99.98%' },
      { label: 'Monthly Orders', value: '6,000+' },
    ],
    liveUrl: 'https://novastack.dev/demo/omnifood',
    githubUrl: 'https://github.com/novastack/omnifood-platform',
    clientName: 'OmniHospitality Group',
    completionDate: 'Q1 2026',
    featured: true,
    published: true,
  },
  {
    _id: 'proj-2',
    title: 'LuxeCommerce — High-Conversion Headless Storefront',
    slug: 'luxecommerce-headless-ecommerce-store',
    tagline: 'Sub-second shopping experience with seamless inventory synchronization and instant checkout.',
    description: 'An enterprise e-commerce platform engineered for luxury lifestyle brands. Delivers instant page transitions, intelligent faceted search, automated currency conversion, and streamlined one-page checkout.',
    category: 'E-Commerce',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Stripe', 'Tailwind CSS'],
    thumbnail: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&auto=format&fit=crop&q=80',
    ],
    problem: 'The previous monolithic legacy CMS was sluggish (LCP > 4.8s on mobile), causing a severe 62% cart abandonment rate and constant stock mismatches during flash sales.',
    solution: 'NovaStack built a decoupled modern MERN storefront. We implemented atomic inventory locking in MongoDB to eliminate overselling and optimized client-side bundles to achieve a 0.8s mobile LCP.',
    features: [
      'Instant faceted product filtering by size, color, material, and price',
      'Atomic stock reservation engine preventing double-selling during flash drops',
      'Integrated Stripe Elements with Apple Pay & Google Pay 1-click checkout',
      'Customer account portal with wishlist, order history, and automated returns',
      'Comprehensive merchant analytics dashboard for SKU velocity tracking',
    ],
    development: 'Leveraged Vite and React with lazy route chunking and responsive image optimization. The Express backend integrates Redis caching for high-traffic product listings and background webhook processing for order fulfillment.',
    results: [
      'Increased mobile conversion rate from 1.4% to 3.8%',
      'Achieved sub-900ms Largest Contentful Paint across all product pages',
      'Handled a 10x traffic spike during Black Friday with zero performance degradation',
    ],
    metrics: [
      { label: 'Conversion Lift', value: '+171%' },
      { label: 'Mobile LCP', value: '0.8s' },
      { label: 'Cart Completion', value: '78%' },
      { label: 'Peak QPS', value: '2,400' },
    ],
    liveUrl: 'https://novastack.dev/demo/luxecommerce',
    githubUrl: 'https://github.com/novastack/luxecommerce-store',
    clientName: 'LuxeWear Apparel',
    completionDate: 'Q4 2025',
    featured: true,
    published: true,
  },
  {
    _id: 'proj-3',
    title: 'PulseOps — Enterprise Telemetry & Admin Command Center',
    slug: 'pulseops-enterprise-admin-dashboard',
    tagline: 'Centralized observability, financial reconciliation, and role-based operational management.',
    description: 'A powerful enterprise back-office suite providing unified business intelligence. Features role-based permission matrices, interactive data charts, automated invoice generation, and audit logging.',
    category: 'Dashboard',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'Chart.js'],
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80',
    ],
    problem: 'The organization was using 4 disparate spreadsheets and legacy tools to track revenue, staff assignments, and client contracts, resulting in hours of manual weekly reconciliation errors.',
    solution: 'Designed a unified single-pane-of-glass dashboard in React and Node.js. Integrated automated billing reconciliation, granular permission tiers, and automated daily executive email digests.',
    features: [
      'Multi-tenant role permissions (Superadmin, Finance, Operations, Auditor)',
      'Real-time financial charts showing MRR, churn rate, and gross margins',
      'Bulk data processing with CSV/PDF export and batch updates',
      'Granular audit trails recording every system modification with IP and timestamps',
      'Automated email notification triggers for critical operational events',
    ],
    development: 'Engineered with React virtualized tables for rendering 50,000+ rows smoothly. Express backend employs indexed MongoDB aggregation pipelines to summarize millions of operational records in sub-50ms query times.',
    results: [
      'Eliminated 16 hours of weekly manual reporting per department',
      'Achieved 100% financial audit compliance with timestamped immutable logs',
      'Reduced average customer account update time by 75%',
    ],
    metrics: [
      { label: 'Weekly Hours Saved', value: '16 hrs' },
      { label: 'Query Latency', value: '<50ms' },
      { label: 'Audit Accuracy', value: '100%' },
      { label: 'Active Seats', value: '250+' },
    ],
    liveUrl: 'https://novastack.dev/demo/pulseops',
    githubUrl: 'https://github.com/novastack/pulseops-dashboard',
    clientName: 'Pulse Global Logistics',
    completionDate: 'Q1 2026',
    featured: true,
    published: true,
  },
  {
    _id: 'proj-4',
    title: 'CloudMetrics SaaS — Developer Performance & Log Insights',
    slug: 'cloudmetrics-saas-performance-monitoring',
    tagline: 'Real-time application telemetry and uptime monitoring with intelligent anomaly alerts.',
    description: 'A SaaS platform built for engineering teams to monitor server health, API latency percentiles, error logs, and distributed traces with instant Slack/PagerDuty integrations.',
    category: 'SaaS',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'Framer Motion'],
    thumbnail: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&auto=format&fit=crop&q=80',
    ],
    problem: 'Engineering teams needed a lightweight, cost-effective telemetry tool to monitor internal microservices without the exorbitant pricing and complexity of legacy enterprise APM tools.',
    solution: 'Engineered an intuitive SaaS platform with self-serve team signup, Stripe recurring billing, interactive latency histograms, and lightweight webhook collectors.',
    features: [
      'Live metric ingestion pipelines handling thousands of events per second',
      'Interactive time-series graphs with custom range drill-downs',
      'Automated webhook alerting to Slack, Discord, and PagerDuty',
      'Team workspace management with API token lifecycle control',
      'Automated monthly usage calculation and subscription tiers',
    ],
    development: 'Frontend crafted with Framer Motion and custom SVG telemetry visualizers. Backend uses Express microservices with rate-limited ingestion endpoints and MongoDB time-series collections.',
    results: [
      'Onboarded 420+ development teams in the first 6 months',
      'Ingested over 120 million telemetry events with zero data loss',
      'Maintained 99.99% SaaS availability across all customer tiers',
    ],
    metrics: [
      { label: 'Teams Onboarded', value: '420+' },
      { label: 'Events Handled', value: '120M+' },
      { label: 'SaaS Uptime', value: '99.99%' },
      { label: 'Alert Latency', value: '<2s' },
    ],
    liveUrl: 'https://novastack.dev/demo/cloudmetrics',
    githubUrl: 'https://github.com/novastack/cloudmetrics-saas',
    clientName: 'DevFlow Technologies',
    completionDate: 'Q3 2025',
    featured: true,
    published: true,
  },
  {
    _id: 'proj-5',
    title: 'Vertex Capital — High-Converting Enterprise Business Portal',
    slug: 'vertex-capital-enterprise-business-website',
    tagline: 'Modern, high-trust digital presence with automated investor lead routing.',
    description: 'An executive corporate website for an investment and consulting firm, crafted to establish credibility, present structured portfolio case studies, and capture institutional client inquiries.',
    category: 'Business Website',
    technologies: ['React.js', 'Node.js', 'Express.js', 'Tailwind CSS', 'Framer Motion'],
    thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80',
    ],
    problem: 'The client’s outdated static website failed to reflect their institutional stature, had poor mobile engagement, and inquiries were frequently lost in cluttered inboxes.',
    solution: 'Designed and deployed an executive dark-themed web platform featuring smooth micro-animations, structured investor briefs, and an automated lead qualification engine.',
    features: [
      'Sleek modern dark visual aesthetic with refined typography',
      'Interactive fund performance calculator and case study showcase',
      'Instant lead qualification form with CRM webhook routing',
      'Complete SEO schema markup for financial organization credentials',
      'Sub-second page load times with 100/100 Google Lighthouse score',
    ],
    development: 'Engineered with React, Tailwind CSS, and Framer Motion for buttery smooth 60fps transitions. The backend provides automated email dispatches and spam filtering.',
    results: [
      'Generated a 210% increase in inbound qualified investor consultations',
      'Decreased bounce rate from 58% down to 22%',
      'Achieved a perfect 100/100 Core Web Vitals score on mobile and desktop',
    ],
    metrics: [
      { label: 'Lead Growth', value: '+210%' },
      { label: 'Bounce Rate', value: '22%' },
      { label: 'Lighthouse Score', value: '100/100' },
      { label: 'Load Time', value: '0.6s' },
    ],
    liveUrl: 'https://novastack.dev/demo/vertex',
    githubUrl: 'https://github.com/novastack/vertex-portal',
    clientName: 'Vertex Capital Partners',
    completionDate: 'Q2 2026',
    featured: false,
    published: true,
  },
  {
    _id: 'proj-6',
    title: 'ApexPay — Full-Stack Developer Gateway & Merchant Portal',
    slug: 'apexpay-developer-gateway-portal',
    tagline: 'Developer-first payment routing platform with sandbox simulation and interactive documentation.',
    description: 'A developer-centric fintech platform showcasing API integration documentation, sandbox API key management, real-time transaction webhook logs, and merchant settlement accounts.',
    category: 'Full-Stack Application',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS'],
    thumbnail: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&auto=format&fit=crop&q=80',
    ],
    problem: 'Early fintech startups needed an intuitive payment gateway orchestration layer to manage multi-currency payouts and webhook retries without complex infrastructure overhead.',
    solution: 'Built an end-to-end full-stack gateway dashboard with live webhook debugging, sandbox payload generators, and granular rate limits.',
    features: [
      'Interactive API reference with copy-paste curl and Node.js code snippets',
      'Real-time transaction log viewer with payload inspection and replay',
      'API key generation with IP whitelisting and scopes',
      'Automated daily settlement calculations and downloadable reconciliation files',
      'Two-factor authentication and session audit logging',
    ],
    development: 'Built with React, Express, and MongoDB. Uses cryptographic hashing for API keys and structured logging for complete audit compliance.',
    results: [
      'Processed over $4.2M in simulated and live merchant transactions',
      'Reduced developer onboarding integration time from 3 days to 45 minutes',
      'Maintained zero security vulnerabilities across independent penetration tests',
    ],
    metrics: [
      { label: 'Volume Processed', value: '$4.2M+' },
      { label: 'Integration Time', value: '45 mins' },
      { label: 'Security Score', value: 'A+' },
      { label: 'API Uptime', value: '99.99%' },
    ],
    liveUrl: 'https://novastack.dev/demo/apexpay',
    githubUrl: 'https://github.com/novastack/apexpay-platform',
    clientName: 'Apex Financial Technologies',
    completionDate: 'Q1 2026',
    featured: false,
    published: true,
  },
];

export const FALLBACK_INSIGHTS = [
  {
    _id: 'ins-1',
    title: 'Architecting Scalable MERN Applications: From 100 to 100,000 Users',
    slug: 'architecting-scalable-mern-applications',
    category: 'MERN Stack',
    summary: 'A deep architectural dive into scaling React, Node.js, Express, and MongoDB systems with caching, connection pooling, and aggregation pipelines.',
    content: `## The Modern MERN Architecture Blueprint

Building a prototype in MERN is straightforward, but architecting a system capable of handling high concurrent traffic without degrading latency requires deliberate engineering decisions across the entire stack.

### 1. The React Client Layer: Optimizing Render Cycles
In high-throughput applications, frontend bottlenecks frequently stem from unnecessary component re-renders and bloated JavaScript bundles.
- **Route-based code splitting:** Split heavy views using dynamic imports so initial loads only fetch critical assets.
- **Optimistic UI updates:** Update UI states immediately before server acknowledgment to give users an instantaneous experience.
- **State isolation:** Keep local form state out of global providers to prevent application-wide re-render cascades.

### 2. The Express & Node.js API Layer
Node's single-threaded event loop requires non-blocking execution patterns:
- **Offload CPU-intensive tasks:** Delegate image processing and PDF generation to background worker threads or microservices.
- **Rate limiting & validation:** Sanitize and validate every incoming payload using schema validators like Zod before hitting business logic.
- **Graceful shutdown handlers:** Ensure open database connections and in-flight HTTP requests complete cleanly during deployments.

### 3. MongoDB Optimization & Indexing Strategies
MongoDB delivers phenomenal performance when queries leverage targeted compound indexes:
- **Index high-cardinality query fields:** Ensure every find and sort query utilizes indexed keys.
- **Use Aggregation Pipelines wisely:** Push filtering ($match) to the very first stage of the pipeline to minimize document scanning.
- **Connection pooling:** Configure Mongoose connection pools to match your server thread capacity.

### Conclusion
By treating each layer of the MERN stack with strict performance budgets, your application remains resilient, fast, and ready to scale effortlessly.`,
    readTime: '6 min read',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
    tags: ['MERN Stack', 'Architecture', 'Node.js', 'MongoDB', 'React'],
    author: {
      name: 'NovaStack Engineering Team',
      role: 'Full-Stack Architects',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
    published: true,
    views: 1420,
    createdAt: '2026-08-28T10:00:00.000Z',
  },
  {
    _id: 'ins-2',
    title: 'Achieving Sub-Second LCP: Real-World Frontend Speed Strategies',
    slug: 'achieving-sub-second-lcp-frontend-speed',
    category: 'Performance',
    summary: 'Practical techniques to slash Largest Contentful Paint, optimize asset waterfalls, and achieve perfect 100 Lighthouse scores in React.',
    content: `## Why Speed is Your Most Critical Feature

Every 100ms delay in page load time directly impacts conversion rates and user trust. In modern web development, achieving a sub-second Largest Contentful Paint (LCP) is the gold standard.

### 1. Eliminating Render-Blocking Assets
Modern build tools like Vite allow us to package CSS and JS efficiently. Key tactics:
- **Inline critical styles:** Ensure above-the-fold layout renders without waiting for large external stylesheets.
- **Self-host modern web fonts:** Use font-display: swap and pre-connect to CDN origins.

### 2. Next-Gen Image Delivery
Images account for over 60% of average page weight.
- Always convert imagery to WebP or AVIF formats.
- Explicitly define width and height attributes on all image elements to eliminate Cumulative Layout Shift (CLS).
- Apply loading="lazy" to all images below the initial viewport fold.

### 3. The Power of Glassmorphism Without Performance Penalties
Intensive CSS backdrop filters can trigger GPU spikes on mobile devices if overused. Keep blur radii controlled and isolate glass layers with CSS will-change only where strictly required.

### Result
Applying these optimizations regularly cuts initial page load times by over 60%, delivering an instantaneous feel that sets high-end digital products apart.`,
    readTime: '5 min read',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
    tags: ['Performance', 'Core Web Vitals', 'Frontend', 'React', 'Lighthouse'],
    author: {
      name: 'NovaStack Engineering Team',
      role: 'Frontend & Performance Engineers',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    },
    published: true,
    views: 980,
    createdAt: '2026-08-25T12:00:00.000Z',
  },
  {
    _id: 'ins-3',
    title: 'E-Commerce Architecture: High-Throughput Cart & Checkout Systems',
    slug: 'ecommerce-architecture-high-throughput-cart',
    category: 'E-Commerce',
    summary: 'How to build rock-solid checkout systems that eliminate double-selling, handle flash sales, and maximize conversion rates.',
    content: `## Engineering High-Conversion E-Commerce

A successful e-commerce platform must balance two critical requirements: an ultra-fast, friction-free shopping experience for customers and atomic transaction integrity on the backend.

### 1. Atomic Inventory Reservation
During high-traffic product drops, standard check-then-write database queries result in race conditions and overselling.
By utilizing MongoDB's atomic operators (e.g. findOneAndUpdate with conditional stock checks), we guarantee that inventory is reserved atomically before confirming payment intents.

### 2. Frictionless Checkout UX
Every additional form field reduces checkout completion rates.
- Implement address autocomplete.
- Support native browser digital wallets (Apple Pay, Google Pay).
- Save guest sessions seamlessly in secure local storage so returning users never lose their cart contents.

### 3. Reliable Webhook Reconciliation
Never rely exclusively on client-side redirect callbacks to fulfill orders. Express backend webhooks verify payment gateway cryptographic signatures independently, ensuring that even if the customer closes their browser tab, their order is recorded and confirmed.`,
    readTime: '7 min read',
    coverImage: 'https://images.unsplash.com/photo-1556742049-0a67e5572263?w=800&auto=format&fit=crop&q=80',
    tags: ['E-Commerce', 'Payments', 'Node.js', 'MongoDB', 'Stripe'],
    author: {
      name: 'NovaStack Engineering Team',
      role: 'E-Commerce Specialists',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
    published: true,
    views: 1150,
    createdAt: '2026-08-20T14:30:00.000Z',
  },
];
