import type { Metadata } from 'next';
import Link from 'next/link';
import { Arrow } from '@/components/Icon';
import { requireAdmin } from '@/lib/auth';
import { leadStats, listLeads } from '@/lib/leads';
import { LeadsTable } from './ui';

/** The dashboard reads cookies and live data on every request, so navigations are allowed to wait for the server. */
export const instant = false;

export const metadata: Metadata = { title: 'نظرة عامة' };

export default async function AdminHome() {
  await requireAdmin();
  const stats = leadStats();
  const latest = listLeads({ limit: 6 });

  const cards = [
    { label: 'طلبات جديدة', value: stats.byStatus.new, href: '/admin/leads?status=new', accent: true },
    { label: 'آخر 30 يوماً', value: stats.last30, href: '/admin/leads' },
    { label: 'تم الاتفاق', value: stats.byStatus.won, href: '/admin/leads?status=won' },
    { label: 'إجمالي الطلبات', value: stats.total, href: '/admin/leads' },
  ];

  return (
    <>
      <header className="adm-head">
        <h1>نظرة عامة</h1>
      </header>

      <div className="adm-cards">
        {cards.map((c) => (
          <Link key={c.label} href={c.href} className={`card adm-stat${c.accent ? ' accent' : ''}`}>
            <span className="v">{c.value}</span>
            <span className="l">{c.label}</span>
          </Link>
        ))}
      </div>

      <section className="card adm-panel">
        <div className="adm-panel-head">
          <h2>أحدث الطلبات</h2>
          <Link className="more" href="/admin/leads">
            كل الطلبات
            <Arrow />
          </Link>
        </div>
        <LeadsTable leads={latest} empty="لا توجد طلبات بعد. ستظهر هنا الطلبات القادمة من نماذج الموقع." />
      </section>
    </>
  );
}
