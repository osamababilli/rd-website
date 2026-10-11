import type { Metadata } from 'next';
import Link from 'next/link';
import { requireAdmin } from '@/lib/auth';
import { LEAD_STATUSES, isLeadStatus, leadStats, listLeads } from '@/lib/leads';
import { LeadsTable, STATUS_LABELS } from '../ui';

/** The dashboard reads cookies and live data on every request, so navigations are allowed to wait for the server. */
export const instant = false;

export const metadata: Metadata = { title: 'طلبات العملاء' };

export default async function LeadsPage({ searchParams }: PageProps<'/admin/leads'>) {
  await requireAdmin();
  const sp = await searchParams;
  const status = isLeadStatus(sp.status) ? sp.status : undefined;
  const q = typeof sp.q === 'string' ? sp.q.trim().slice(0, 100) : '';
  const leads = listLeads({ status, q: q || undefined });
  const stats = leadStats();

  const tabs = [{ key: undefined, label: 'الكل', n: stats.total }, ...LEAD_STATUSES.map((s) => ({ key: s, label: STATUS_LABELS[s], n: stats.byStatus[s] }))];
  const tabHref = (key?: string) => {
    const p = new URLSearchParams();
    if (key) p.set('status', key);
    if (q) p.set('q', q);
    const qs = p.toString();
    return qs ? `/admin/leads?${qs}` : '/admin/leads';
  };

  return (
    <>
      <header className="adm-head">
        <h1>طلبات العملاء</h1>
        <form className="adm-search" role="search">
          {status && <input type="hidden" name="status" value={status} />}
          <label htmlFor="q" className="sr-only">
            بحث
          </label>
          <input className="inp" id="q" name="q" type="search" defaultValue={q} placeholder="ابحث بالاسم أو البريد أو الهاتف…" />
        </form>
      </header>

      <nav className="filters adm-filters" aria-label="تصفية حسب الحالة">
        {tabs.map((t) => (
          <Link key={t.label} href={tabHref(t.key)} className="fbtn" aria-pressed={t.key === status} aria-current={t.key === status ? 'page' : undefined}>
            {t.label}
            <span className="fcount">{t.n}</span>
          </Link>
        ))}
      </nav>

      <section className="card adm-panel">
        <LeadsTable leads={leads} empty={q ? 'لا توجد نتائج مطابقة للبحث.' : 'لا توجد طلبات في هذا التصنيف.'} />
      </section>
    </>
  );
}
