import type { MetadataRoute } from 'next';
import { site } from '@/config/site';
import { CASE_STUDY_SLUGS, LEGAL_DOCS, SERVICE_PAGE_SLUGS } from '@/content/data';
import { DEFAULT_LOCALE, LOCALES } from '@/i18n/config';
import { href } from '@/lib/paths';

const PATHS = [
  '/',
  '/services',
  ...Object.values(SERVICE_PAGE_SLUGS).map((s) => `/services/${s}`),
  '/work',
  ...CASE_STUDY_SLUGS.map((s) => `/work/${s}`),
  '/about',
  '/contact',
  ...LEGAL_DOCS.map((d) => `/legal/${d}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.flatMap((path) =>
    LOCALES.map((locale) => ({
      url: `${site.url}${href(locale, path)}`,
      changeFrequency: 'monthly' as const,
      priority: path === '/' ? 1 : path.startsWith('/legal') ? 0.2 : 0.7,
      alternates: {
        languages: {
          ...Object.fromEntries(LOCALES.map((l) => [l, `${site.url}${href(l, path)}`])),
          'x-default': `${site.url}${href(DEFAULT_LOCALE, path)}`,
        },
      },
    })),
  );
}
