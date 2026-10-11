'use server';

import { validateBrief, type Brief, type BriefErrors } from '@/lib/brief';

export type SubmitResult = { ok: true } | { ok: false; errors?: BriefErrors; server?: true };

const clip = (value: unknown, max: number) => (typeof value === 'string' ? value.trim().slice(0, max) : '');

/**
 * Receives a quote request from the homepage form or the contact wizard and emails it
 * through Resend (https://resend.com). Configure RESEND_API_KEY and CONTACT_TO_EMAIL.
 */
export async function submitBrief(input: Brief): Promise<SubmitResult> {
  const brief: Brief = {
    source: input?.source === 'contact' ? 'contact' : 'home',
    locale: clip(input?.locale, 5),
    name: clip(input?.name, 120).replace(/[\r\n]+/g, ' '),
    email: clip(input?.email, 160),
    phone: clip(input?.phone, 40),
    company: clip(input?.company, 160),
    services: Array.isArray(input?.services) ? input.services.slice(0, 10).map((s) => clip(s, 80)).filter(Boolean) : [],
    budget: clip(input?.budget, 60),
    timing: clip(input?.timing, 60),
    contactVia: clip(input?.contactVia, 60),
    message: clip(input?.message, 5000),
    website: clip(input?.website, 200),
  };

  // Bots fill the hidden field; pretend everything went fine.
  if (brief.website) return { ok: true };

  const errors = validateBrief(brief);
  if (Object.keys(errors).length) return { ok: false, errors };

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !to) {
    if (process.env.NODE_ENV !== 'production') {
      console.info('[brief] Email is not configured; brief received:', brief);
      return { ok: true };
    }
    console.error('[brief] RESEND_API_KEY or CONTACT_TO_EMAIL is not set — the brief was not delivered.');
    return { ok: false, server: true };
  }

  const fields: [string, string | undefined][] = [
    ['Name', brief.name],
    ['Email', brief.email],
    ['Phone / WhatsApp', brief.phone],
    ['Company', brief.company],
    ['Services', brief.services.join(', ')],
    ['Budget', brief.budget],
    ['Start', brief.timing],
    ['Preferred contact', brief.contactVia],
    ['Language', brief.locale],
    ['Form', brief.source === 'contact' ? 'Contact page wizard' : 'Homepage quote form'],
  ];
  const lines = fields.filter(([, value]) => value).map(([label, value]) => `${label}: ${value}`);
  lines.push('', brief.message || '(no message)');

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || 'RD Group Website <onboarding@resend.dev>',
        to: to.split(',').map((s) => s.trim()),
        reply_to: brief.email,
        subject: `New brief: ${brief.name} — ${brief.services.join(', ')}`,
        text: lines.join('\n'),
      }),
    });
    if (!res.ok) {
      console.error('[brief] Resend responded with', res.status, await res.text());
      return { ok: false, server: true };
    }
    return { ok: true };
  } catch (err) {
    console.error('[brief] Sending failed', err);
    return { ok: false, server: true };
  }
}
