import type { Brief } from './brief';
import { getDb } from './db';

export const LEAD_STATUSES = ['new', 'contacted', 'won', 'lost'] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];
export const isLeadStatus = (s: unknown): s is LeadStatus => LEAD_STATUSES.includes(s as LeadStatus);

export type Lead = {
  id: number;
  created_at: string;
  source: 'home' | 'contact';
  locale: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  services: string[];
  budget: string;
  timing: string;
  contact_via: string;
  message: string;
  status: LeadStatus;
  notes: string;
};

type Row = Omit<Lead, 'services'> & { services: string };
const toLead = (r: Row): Lead => ({ ...r, services: JSON.parse(r.services) as string[] });

export function insertLead(b: Brief): number {
  const res = getDb()
    .prepare(
      `INSERT INTO leads (source, locale, name, email, phone, company, services, budget, timing, contact_via, message)
       VALUES (@source, @locale, @name, @email, @phone, @company, @services, @budget, @timing, @contactVia, @message)`,
    )
    .run({
      source: b.source,
      locale: b.locale,
      name: b.name,
      email: b.email,
      phone: b.phone,
      company: b.company ?? '',
      services: JSON.stringify(b.services),
      budget: b.budget ?? '',
      timing: b.timing ?? '',
      contactVia: b.contactVia ?? '',
      message: b.message ?? '',
    });
  return Number(res.lastInsertRowid);
}

export function listLeads({ status, q, limit = 200 }: { status?: LeadStatus; q?: string; limit?: number } = {}): Lead[] {
  const where: string[] = [];
  const params: Record<string, unknown> = { limit };
  if (status) {
    where.push('status = @status');
    params.status = status;
  }
  if (q) {
    where.push('(name LIKE @q OR email LIKE @q OR phone LIKE @q OR company LIKE @q)');
    params.q = `%${q}%`;
  }
  const sql = `SELECT * FROM leads ${where.length ? `WHERE ${where.join(' AND ')}` : ''} ORDER BY id DESC LIMIT @limit`;
  return (getDb().prepare(sql).all(params) as Row[]).map(toLead);
}

export function getLead(id: number): Lead | null {
  const row = getDb().prepare('SELECT * FROM leads WHERE id = ?').get(id) as Row | undefined;
  return row ? toLead(row) : null;
}

export function updateLead(id: number, data: { status: LeadStatus; notes: string }) {
  getDb().prepare('UPDATE leads SET status = @status, notes = @notes WHERE id = @id').run({ id, ...data });
}

export function deleteLead(id: number) {
  getDb().prepare('DELETE FROM leads WHERE id = ?').run(id);
}

export function leadStats() {
  const db = getDb();
  const byStatus = Object.fromEntries(LEAD_STATUSES.map((s) => [s, 0])) as Record<LeadStatus, number>;
  for (const r of db.prepare('SELECT status, COUNT(*) AS n FROM leads GROUP BY status').all() as { status: LeadStatus; n: number }[]) {
    byStatus[r.status] = r.n;
  }
  const total = Object.values(byStatus).reduce((a, b) => a + b, 0);
  const last30 = (db.prepare(`SELECT COUNT(*) AS n FROM leads WHERE created_at >= strftime('%Y-%m-%dT%H:%M:%fZ', 'now', '-30 days')`).get() as { n: number }).n;
  return { total, last30, byStatus };
}
