export const LOCALES = ['ar', 'en', 'tr'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'ar';

/** Cookie the language switcher writes and the proxy reads. */
export const LOCALE_COOKIE = 'NEXT_LOCALE';

export const isLocale = (value: string | undefined): value is Locale =>
  !!value && (LOCALES as readonly string[]).includes(value);

export const dirOf = (locale: Locale) => (locale === 'ar' ? 'rtl' : 'ltr');

export const LOCALE_LABELS: Record<Locale, { short: string; native: string }> = {
  ar: { short: 'AR', native: 'العربية' },
  en: { short: 'EN', native: 'English' },
  tr: { short: 'TR', native: 'Türkçe' },
};

export const OG_LOCALES: Record<Locale, string> = {
  ar: 'ar_AR',
  en: 'en_US',
  tr: 'tr_TR',
};
