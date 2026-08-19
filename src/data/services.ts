export interface Service {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: 'Palette' | 'Feather' | 'Share2' | 'Layout' | 'Briefcase' | 'FileText' | 'Presentation';
  deliverables: string[];
  tag: string;
}

export const SERVICES: Service[] = [
  {
    number: '01',
    title: 'BRANDING & VISUAL IDENTITY',
    subtitle: 'Comprehensive Brand Systems',
    description: 'Complete visual identity systems engineered to define your core vision, market positioning, color psychology, and multi-channel design guidelines.',
    iconName: 'Palette',
    deliverables: [
      'Core Brand Strategy & Vision',
      'Logo Suite & Lockup Variants',
      'Color Palette & Typography Systems',
      'Comprehensive Brand Style Guidelines',
    ],
    tag: 'Core Identity',
  },
  {
    number: '02',
    title: 'LOGO DESIGN & VECTOR MARKS',
    subtitle: 'Bespoke Mark & Iconography',
    description: 'Distinctive, scalable vector logo marks and typography lockups designed for versatility across print, digital, packaging, and high-res media.',
    iconName: 'Feather',
    deliverables: [
      'Primary & Secondary Logo Marks',
      'Scalable Vector Files (SVG, EPS, AI)',
      'Monochrome & Dark Mode Variations',
      'Favicon & Social Avatar Assets',
    ],
    tag: 'Visual Mark',
  },
  {
    number: '03',
    title: 'SOCIAL MEDIA GRAPHICS & AD CAMPAIGNS',
    subtitle: 'Scroll-Stopping Content',
    description: 'High-conversion Instagram carousel kits, promotional campaign banners, story templates, and ad graphics designed for maximum engagement.',
    iconName: 'Share2',
    deliverables: [
      'Multi-Slide Instagram Carousel Kits',
      'Promotional Ad Campaign Creatives',
      'Story & Reel Cover Graphic Systems',
      'Reusable Canva & Figma Templates',
    ],
    tag: 'Growth & Engagement',
  },
  {
    number: '04',
    title: 'UI/UX & WEB INTERFACE DESIGN',
    subtitle: 'Responsive Digital Products',
    description: 'Intuitive web layouts, interactive wireframes, design token systems, and responsive component libraries optimized for user retention.',
    iconName: 'Layout',
    deliverables: [
      'Desktop & Mobile Web Layouts',
      'Interactive Figma Prototypes',
      'Design Token & UI Component Systems',
      'Full Brand Handoff & Export Specs',
    ],
    tag: 'Digital Interface',
  },
  {
    number: '05',
    title: 'BUSINESS DESIGN & BRAND COLLATERAL',
    subtitle: 'Corporate Touchpoints',
    description: 'Professional print and digital collateral including business cards, letterheads, brand stationery, invoices, and company touchpoints.',
    iconName: 'Briefcase',
    deliverables: [
      'Premium Business Card Designs',
      'Corporate Letterheads & Envelopes',
      'Digital Invoice & Document Kits',
      'Branded Email Signatures & Badges',
    ],
    tag: 'Corporate Touchpoints',
  },
  {
    number: '06',
    title: 'FLYER, POSTER & PRINT MEDIA',
    subtitle: 'Editorial Print Design',
    description: 'High-impact print flyers, event promotional posters, digital PDF brochures, and marketing hand-outs built with editorial grid precision.',
    iconName: 'FileText',
    deliverables: [
      'Single & Multi-Page Flyer Design',
      'Event & Promotional Posters',
      'Digital PDF Catalogs & Brochures',
      'Print-Ready CMYK & Bleed Files',
    ],
    tag: 'Print & Publication',
  },
  {
    number: '07',
    title: 'PRESENTATION & PITCH DECK DESIGN',
    subtitle: 'Investor-Ready Decks',
    description: 'Polished pitch decks, keynotes, and slide presentations crafted to captivate investors, partners, and key stakeholders with high impact.',
    iconName: 'Presentation',
    deliverables: [
      'Custom Investor Pitch Decks',
      'Keynote & PowerPoint Master Templates',
      'Custom Infographics & Data Visuals',
      'Exported PDF & Interactive Slides',
    ],
    tag: 'Investor & Client Decks',
  },
];
