/**
 * Application configuration constants.
 * Centralizes animation parameters, thresholds, and route definitions.
 */

/** Particle system configuration */
export const PARTICLES = {
  count: 30,
  colors: ['#FF9933', '#FFFFFF', '#138808'] as const,
  minSize: 2,
  maxSize: 5,
  minOpacity: 0.1,
  maxOpacity: 0.4,
  minDuration: 4,
  maxDuration: 8,
  maxDelay: 6,
} as const;

/** Scroll animation observer thresholds */
export const SCROLL_OBSERVER = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px',
} as const;

/** Counter animation config */
export const COUNTER = {
  duration: 2000,
  observerThreshold: 0.5,
} as const;

/** Testimonial auto-scroll config */
export const TESTIMONIAL_SCROLL = {
  speed: 2,
  intervalMs: 40,
  edgeThreshold: 10,
  cardGap: 32,
  heroScrollLimit: 800,
  scrollInterval: 3500,
} as const;

/** Route path definitions - strict types for type safety */
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  GET_INVOLVED: '/get-involved',
  TRANSPARENCY: '/transparency',
  RESOURCES: '/resources',
} as const;

/** Type-safe route path union */
export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];

/** Route metadata for SEO and page management */
export interface RouteMeta {
  title: string;
  description: string;
  keywords: string;
}

/** Route metadata mapping for SEO */
export const ROUTE_META: Record<RoutePath, RouteMeta> = {
  '/': {
    title: 'Leaders for India — Redefining Leadership, Rebuilding India',
    description:
      'Empowering qualified citizens to become organized civic advocates combating corruption and transforming Indian politics.',
    keywords:
      'Leaders for India, civic advocacy, anti-corruption, Indian politics, citizen empowerment, RTI, governance',
  },
  '/about': {
    title: 'About Us — Leaders for India',
    description:
      'Learn about our mission to transform India through decentralized, transparent civic governance and citizen empowerment.',
    keywords:
      'about Leaders for India, mission, vision, governance model, team, civic organization India',
  },
  '/get-involved': {
    title: 'Get Involved — Leaders for India',
    description:
      'Join as a volunteer, report an issue, donate transparently, or partner with us to create civic change in India.',
    keywords:
      'volunteer India, report corruption, donate NGO, civic participation, join movement India',
  },
  '/transparency': {
    title: 'Transparency Portal — Leaders for India',
    description:
      'View our financial reports, case statistics, funding sources, and governance meeting minutes. Full public disclosure.',
    keywords:
      'NGO transparency, financial reports, case statistics, governance, accountability India',
  },
  '/resources': {
    title: 'Resources — Leaders for India',
    description:
      'Access guides on filing RTI, citizen rights handbook, complaint templates, legal aid directory, and FAQs.',
    keywords:
      'RTI guide, citizen rights, legal aid India, complaint templates, civic resources, FAQs',
  },
};

/** Navigation height for page header offset */
export const NAV_HEIGHT_VAR = 'var(--nav-height)';
