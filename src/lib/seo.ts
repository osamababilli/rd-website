import type { Metadata } from 'next';
import { site } from '@/config/site';
import { LOCALES, OG_LOCALES, DEFAULT_LOCALE, type Locale } from '@/i18n/config';
import { href } from './paths';

/**
 * Per-page metadata with canonical + hreflang alternates for all languages.
 * `path` is the locale-less path, e.g. '/services'.
 */
export function pageMetadata({
  locale,
  path,
  title,
  description,
}: {
  locale: Locale;
  path: string;
  title?: string;
  description: string;
}): Metadata {
  const languages = Object.fromEntries(LOCALES.map((l) => [l, href(l, path)])) as Record<string, string>;
  languages['x-default'] = href(DEFAULT_LOCALE, path);

  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: href(locale, path), languages },
    openGraph: {
      type: 'website',
      siteName: site.name,
      ...(title ? { title: `${title} — ${site.name}` } : {}),
      description,
      url: href(locale, path),
      locale: OG_LOCALES[locale],
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => OG_LOCALES[l]),
    },
  };
}
