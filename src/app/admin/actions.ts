'use server';

import { updateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { checkPassword, endSession, requireAdmin, startSession } from '@/lib/auth';
import { deleteLead, isLeadStatus, updateLead } from '@/lib/leads';
import { SETTINGS_TAG, readSettings, writeSettings, type SiteSettings } from '@/lib/settings';

const str = (fd: FormData, key: string, max = 300) => String(fd.get(key) ?? '').trim().slice(0, max);

export async function login(formData: FormData) {
  if (!checkPassword(String(formData.get('password') ?? ''))) redirect('/admin/login?error=1');
  await startSession();
  redirect('/admin');
}

export async function logout() {
  await endSession();
  redirect('/admin/login');
}

export async function saveLead(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get('id'));
  const status = formData.get('status');
  if (!Number.isInteger(id) || !isLeadStatus(status)) redirect('/admin/leads');
  updateLead(id, { status, notes: str(formData, 'notes', 5000) });
  redirect(`/admin/leads/${id}?saved=1`);
}

export async function removeLead(formData: FormData) {
  await requireAdmin();
  const id = Number(formData.get('id'));
  if (Number.isInteger(id)) deleteLead(id);
  redirect('/admin/leads');
}

export async function saveSettings(formData: FormData) {
  await requireAdmin();
  const current = readSettings();
  const url = (key: string) => {
    const v = str(formData, key, 500);
    return v === '' || /^https?:\/\//i.test(v) ? v : `https://${v}`;
  };
  const num = (key: string, fallback: number) => {
    const n = Number(str(formData, key, 12));
    return Number.isFinite(n) && n >= 0 ? Math.round(n) : fallback;
  };

  const next: SiteSettings = {
    phone: str(formData, 'phone', 40),
    whatsapp: str(formData, 'whatsapp', 40),
    email: str(formData, 'email', 160),
    mapsUrl: url('mapsUrl'),
    address: { ar: str(formData, 'address_ar'), en: str(formData, 'address_en'), tr: str(formData, 'address_tr') },
    hours: { ar: str(formData, 'hours_ar'), en: str(formData, 'hours_en'), tr: str(formData, 'hours_tr') },
    social: {
      instagram: url('instagram'),
      linkedin: url('linkedin'),
      tiktok: url('tiktok'),
      youtube: url('youtube'),
      facebook: url('facebook'),
    },
    stats: [0, 1, 2, 3].map((i) => num(`stat${i}`, current.stats[i])) as SiteSettings['stats'],
  };

  writeSettings(next);
  updateTag(SETTINGS_TAG); // public pages pick up the new values on their next request
  redirect('/admin/settings?saved=1');
}
