import { notFound } from 'next/navigation';
import { locale as localeParam } from 'next/root-params';
import { isLocale, type Locale } from './config';
import type { Dictionary } from './dictionaries/ar';

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  ar: () => import('./dictionaries/ar').then((m) => m.default),
  en: () => import('./dictionaries/en').then((m) => m.default),
  tr: () => import('./dictionaries/tr').then((m) => m.default),
};

/** The current route's locale (from the `[locale]` root segment). */
export async function getLocale(): Promise<Locale> {
  const value = await localeParam();
  if (!isLocale(value)) notFound();
  return value;
}

export async function getDictionary(): Promise<Dictionary> {
  return dictionaries[await getLocale()]();
}

export type { Dictionary };
