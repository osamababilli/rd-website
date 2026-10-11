'use server';

import nodemailer from 'nodemailer';
import { validateBrief, type Brief, type BriefErrors } from '@/lib/brief';

export type SubmitResult = { ok: true } | { ok: false; errors?: BriefErrors; server?: true };

const clip = (value: unknown, max: number) => (typeof value === 'string' ? value.trim().slice(0, max) : '');

/**
 * Receives a quote request from the homepage form or the contact wizard and emails it
 * over SMTP. Configure SMTP_HOST, SMTP_USER, SMTP_PASS and CONTACT_TO_EMAIL (see .env.example).
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

  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL: to, CONTACT_FROM_EMAIL } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !to) {
    if (process.env.NODE_ENV !== 'production') {
      console.info('[brief] Email is not configured; brief received:', brief);
      return { ok: true };
    }
    console.error('[brief] SMTP_HOST, SMTP_USER, SMTP_PASS or CONTACT_TO_EMAIL is not set — the brief was not delivered.');
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

  const port = Number(SMTP_PORT) || 465;
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    // 465 uses TLS from the start; 587/25 upgrade with STARTTLS. Override with SMTP_SECURE=true|false.
    secure: SMTP_SECURE ? SMTP_SECURE === 'true' : port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  try {
    await transporter.sendMail({
      from: CONTACT_FROM_EMAIL || `RD Group Website <${SMTP_USER}>`,
      to: to.split(',').map((s) => s.trim()),
      replyTo: brief.email,
      subject: `New brief: ${brief.name} — ${brief.services.join(', ')}`,
      text: lines.join('\n'),
    });
    return { ok: true };
  } catch (err) {
    console.error('[brief] SMTP sending failed', err);
    return { ok: false, server: true };
  }
}
