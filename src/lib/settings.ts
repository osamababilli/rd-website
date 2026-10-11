import { cacheLife, cacheTag } from 'next/cache';
import type { Locale } from '@/i18n/config';
import { getDb } from './db';

/** Business details editable from the dashboard (/admin/settings). */
export type SiteSettings = {
  phone: string;
  whatsapp: string;
  email: string;
  mapsUrl: string;
  address: Record<Locale, string>;
  hours: Record<Locale, string>;
  social: { instagram: string; linkedin: string; tiktok: string; youtube: string; facebook: string };
  /** Homepage counters: projects, clients, years, countries. */
  stats: [number, number, number, number];
};

export const SETTINGS_TAG = 'settings';

/** Placeholders from the design, used until the dashboard saves real values. */
export const DEFAULT_SETTINGS: SiteSettings = {
  phone: '[+90 XXX XXX XX XX]',
  whatsapp: '[+90 5XX XXX XX XX]',
  email: '[hello@rdgrouptr.com]',
  mapsUrl: '',
  address: {
    ar: '[عنوان المكتب، المدينة، تركيا]',
    en: '[Office address, City, Türkiye]',
    tr: '[Ofis adresi, Şehir, Türkiye]',
  },
  hours: {
    ar: '[أيام وساعات العمل]',
    en: '[Days and hours]',
    tr: '[Günler ve saatler]',
  },
  social: {
    instagram: 'https://www.instagram.com/',
    linkedin: 'https://www.linkedin.com/',
    tiktok: 'https://www.tiktok.com/',
    youtube: 'https://www.youtube.com/',
    facebook: 'https://www.facebook.com/',
  },
  stats: [250, 120, 8, 12],
};

export function readSettings(): SiteSettings {
  const row = getDb().prepare('SELECT value FROM settings WHERE key = ?').get('site') as { value: string } | undefined;
  if (!row) return DEFAULT_SETTINGS;
  const saved = JSON.parse(row.value) as Partial<SiteSettings>;
  return {
    ...DEFAULT_SETTINGS,
    ...saved,
    address: { ...DEFAULT_SETTINGS.address, ...saved.address },
    hours: { ...DEFAULT_SETTINGS.hours, ...saved.hours },
    social: { ...DEFAULT_SETTINGS.social, ...saved.social },
  };
}

/** Cached for the public site; the dashboard expires the tag on save. */
export async function getSettings(): Promise<SiteSettings> {
  'use cache';
  cacheTag(SETTINGS_TAG);
  cacheLife('max');
  return readSettings();
}

export function writeSettings(settings: SiteSettings) {
  getDb()
    .prepare('INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value')
    .run('site', JSON.stringify(settings));
}

/* ---- links derived from the stored values ---- */

const digits = (s: string) => s.replace(/\D/g, '');
/** A value still in [brackets] is a placeholder: show it, but don't link it. */
const isPlaceholder = (s: string) => !s.trim() || /^\[.*\]$/.test(s.trim());

export function contactLinks(s: SiteSettings) {
  return {
    tel: isPlaceholder(s.phone) || digits(s.phone).length < 8 ? null : `tel:+${digits(s.phone)}`,
    whatsapp: isPlaceholder(s.whatsapp) || digits(s.whatsapp).length < 8 ? null : `https://wa.me/${digits(s.whatsapp)}`,
    mail: isPlaceholder(s.email) ? null : `mailto:${s.email.trim()}`,
    maps: s.mapsUrl.trim() || null,
  };
}
