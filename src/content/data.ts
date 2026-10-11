/** Language-independent content. Translated text lives in src/i18n/dictionaries. */

export const SERVICE_KEYS = ['mkt', 'ads', 'design', 'web', 'app', 'sys', 'video'] as const;
export type ServiceKey = (typeof SERVICE_KEYS)[number];

export const SERVICE_TOOLS: Record<ServiceKey, string[]> = {
  mkt: ['Meta Business', 'Google Analytics', 'Search Console'],
  ads: ['Meta', 'Google', 'TikTok', 'Snapchat'],
  design: ['Logo', 'Identity', 'Packaging', 'Print'],
  web: ['Laravel', 'React', 'WordPress', 'Shopify'],
  app: ['iOS', 'Android', 'Flutter', 'React Native'],
  sys: ['ERP', 'CRM', 'POS', 'Dashboards'],
  video: ['Reels', '9:16', '16:9', 'Motion'],
};

/** Services that have their own detail page, keyed by URL slug. */
export const SERVICE_PAGE_SLUGS = { web: 'web' } as const satisfies Partial<Record<ServiceKey, string>>;
export type ServicePageSlug = (typeof SERVICE_PAGE_SLUGS)[keyof typeof SERVICE_PAGE_SLUGS];

export const WORK_CATEGORIES = ['branding', 'web', 'apps', 'systems', 'ads', 'video'] as const;
export type WorkCategory = (typeof WORK_CATEGORIES)[number];

export const PROJECTS = [
  { slug: 'fashion-store', cat: 'web' },
  { slug: 'coffee-identity', cat: 'branding' },
  { slug: 'dental-booking-app', cat: 'apps' },
  { slug: 'retail-pos', cat: 'systems' },
  { slug: 'launch-campaign', cat: 'ads' },
  { slug: 'real-estate-film', cat: 'video' },
  { slug: 'logistics-website', cat: 'web' },
  { slug: 'sales-crm', cat: 'systems' },
  { slug: 'chocolate-identity', cat: 'branding' },
] as const satisfies readonly { slug: string; cat: WorkCategory }[];

export type ProjectSlug = (typeof PROJECTS)[number]['slug'];

/** Projects with a written case study (content in each dictionary under `caseStudies`). */
export const CASE_STUDY_SLUGS = ['fashion-store'] as const satisfies readonly ProjectSlug[];
export type CaseStudySlug = (typeof CASE_STUDY_SLUGS)[number];

export const hasCaseStudy = (slug: string): slug is CaseStudySlug =>
  (CASE_STUDY_SLUGS as readonly string[]).includes(slug);

/** Homepage counters. Sample values from the design — replace with real numbers. */
export const STATS = [
  { value: 250, suffix: '+' },
  { value: 120, suffix: '+' },
  { value: 8, suffix: '+' },
  { value: 12, suffix: '+' },
];

export const LEGAL_DOCS = ['privacy', 'terms'] as const;
export type LegalDoc = (typeof LEGAL_DOCS)[number];
