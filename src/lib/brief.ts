/** Shared validation for the quote forms (runs in the browser and again on the server). */

export type BriefErrors = Partial<Record<'name' | 'email' | 'phone' | 'services', 'required' | 'email' | 'phone'>>;

export type Brief = {
  source: 'home' | 'contact';
  locale: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  services: string[];
  budget?: string;
  timing?: string;
  contactVia?: string;
  message?: string;
  /** Honeypot — must stay empty. */
  website?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[\d\s()-]{8,}$/;

export function validateContact(f: { name: string; email: string; phone: string }): BriefErrors {
  const e: BriefErrors = {};
  if (!f.name.trim()) e.name = 'required';
  if (!f.email.trim()) e.email = 'required';
  else if (!EMAIL_RE.test(f.email.trim())) e.email = 'email';
  if (!f.phone.trim()) e.phone = 'required';
  else if (!PHONE_RE.test(f.phone.trim())) e.phone = 'phone';
  return e;
}

export function validateBrief(b: Brief): BriefErrors {
  const e = validateContact(b);
  if (!b.services.length) e.services = 'required';
  return e;
}

export const errorText = (
  code: BriefErrors[keyof BriefErrors],
  t: { eReq: string; eEmail: string; ePhone: string },
) => (code === 'required' ? t.eReq : code === 'email' ? t.eEmail : code === 'phone' ? t.ePhone : undefined);
