import type { Locale } from '@/i18n/config';

/** Builds a locale-prefixed path: href('en', '/services') -> '/en/services'. */
export const href = (locale: Locale, path = '/') => (path === '/' ? `/${locale}` : `/${locale}${path}`);

/** Replaces `{key}` tokens in a translated string. */
export const fill = (text: string, values: Record<string, string | number>) =>
  text.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ''));

export const pad2 = (n: number) => (n < 10 ? `0${n}` : String(n));
