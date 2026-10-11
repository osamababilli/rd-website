import { createHash, createHmac, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { connection } from 'next/server';

/** Single-admin login: the password comes from ADMIN_PASSWORD; sessions are signed cookies. */
const COOKIE = 'rd_admin';
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

const secret = () => process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD || '';
const sha = (s: string) => createHash('sha256').update(s).digest();
const sign = (payload: string) => createHmac('sha256', secret()).update(payload).digest('hex');

export const isAuthConfigured = () => !!process.env.ADMIN_PASSWORD;

export function checkPassword(input: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return timingSafeEqual(sha(input), sha(expected));
}

export async function startSession() {
  const exp = String(Math.floor(Date.now() / 1000) + MAX_AGE);
  (await cookies()).set(COOKIE, `${exp}.${sign(exp)}`, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/admin',
    maxAge: MAX_AGE,
  });
}

export async function endSession() {
  (await cookies()).delete({ name: COOKIE, path: '/admin' });
}

export async function isAdmin() {
  await connection(); // request-time check (reads the clock and cookies)
  if (!isAuthConfigured()) return false;
  const value = (await cookies()).get(COOKIE)?.value;
  if (!value) return false;
  const [exp, mac] = value.split('.');
  if (!exp || !mac || Number(exp) * 1000 < Date.now()) return false;
  const good = Buffer.from(sign(exp));
  const given = Buffer.from(mac);
  return good.length === given.length && timingSafeEqual(good, given);
}

/** Use at the top of every dashboard page and server action. */
export async function requireAdmin() {
  if (!(await isAdmin())) redirect('/admin/login');
}
