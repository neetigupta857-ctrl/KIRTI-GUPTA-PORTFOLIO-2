export interface SkillItem {
  id: string;
  name: string;
  category: 'disciplines' | 'software';
  levelPercentage?: number; // 0 to 100
  experienceLabel?: string; // e.g. 'Expert', 'Advanced'
  iconName: 'Palette' | 'Type' | 'Share2' | 'Layout' | 'Figma' | 'Image' | 'Sparkles';
  description: string;
  highlights: string[];
  featured?: boolean;
}

export interface SkillCategory {
  id: 'all' | 'disciplines' | 'software';
  label: string;
  description: string;
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  { id: 'all', label: 'All Masteries', description: 'Complete showcase of creative disciplines & software tools' },
  { id: 'disciplines', label: 'Design Disciplines', description: 'Core artistic & visual specialization fields' },
  { id: 'software', label: 'Software & Tools', description: 'Primary software applications & design suites' },
];

export const SKILLS_DATA: SkillItem[] = [
  // DESIGN DISCIPLINES
  {
    id: 'branding',
    name: 'Branding & Visual Identity',
    category: 'disciplines',
    levelPercentage: 98,
    experienceLabel: 'Core Specialty',
    iconName: 'Palette',
    description: 'Crafting memorable logo suites, visual systems, color theory guidelines, and brand design assets.',
    highlights: ['Brand Strategy', 'Logo Suites', 'Style Guides', 'Brand Assets'],
    featured: true,
  },
  {
    id: 'typography',
    name: 'Typography & Layout',
    category: 'disciplines',
    levelPercentage: 96,
    experienceLabel: 'Core Specialty',
    iconName: 'Type',
    description: 'Mastering font pairing, editorial grid systems, custom lettering, and visual hierarchy.',
    highlights: ['Font Pairing', 'Grid Systems', 'Editorial Layout', 'Custom Lettering'],
    featured: true,
  },
  {
    id: 'social-media',
    name: 'Social Media Graphics',
    category: 'disciplines',
    levelPercentage: 97,
    experienceLabel: 'Core Specialty',
    iconName: 'Share2',
    description: 'Creating high-conversion campaign banners, Instagram carousel kits, stories, and social ad graphics.',
    highlights: ['Carousel Kits', 'Ad Creatives', 'Campaign Banners', 'Story Templates'],
    featured: true,
  },
  {
    id: 'ui-ux-design',
    name: 'UI/UX & Web Interface',
    category: 'disciplines',
    levelPercentage: 92,
    experienceLabel: 'Advanced',
    iconName: 'Layout',
    description: 'Designing intuitive web interfaces, responsive landing pages, and interactive UI component sets.',
    highlights: ['Landing Pages', 'Wireframing', 'Responsive UI', 'User Flow'],
    featured: false,
  },

  // SOFTWARE PROFICIENCY
  {
    id: 'figma',
    name: 'Figma',
    category: 'software',
    levelPercentage: 98,
    experienceLabel: 'Expert',
    iconName: 'Figma',
    description: 'Comprehensive design system creation, auto-layout UI components, variant sets, and interactive prototypes.',
    highlights: ['Design Systems', 'Auto-Layout', 'Interactive Prototypes', 'Tokens'],
    featured: true,
  },
  {
    id: 'photoshop',
    name: 'Adobe Photoshop',
    category: 'software',
    levelPercentage: 95,
    experienceLabel: 'Advanced',
    iconName: 'Image',
    description: 'High-end photo manipulation, raster artwork compositing, color grading, and digital mockups.',
    highlights: ['Compositing', 'Photo Retouching', 'Color Grading', 'Mockups'],
    featured: true,
  },
  {
    id: 'canva',
    name: 'Canva',
    category: 'software',
    levelPercentage: 96,
    experienceLabel: 'Expert',
    iconName: 'Sparkles',
    description: 'Rapid social template design, client brand kit setup, multi-format export, and team asset delivery.',
    highlights: ['Brand Kits', 'Social Templates', 'Fast Turnaround', 'Multi-Format'],
    featured: true,
  },
];
