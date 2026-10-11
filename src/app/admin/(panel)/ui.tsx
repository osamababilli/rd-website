import Link from 'next/link';
import type { Lead, LeadStatus } from '@/lib/leads';

export const STATUS_LABELS: Record<LeadStatus, string> = {
  new: 'جديد',
  contacted: 'تم التواصل',
  won: 'تم الاتفاق',
  lost: 'مغلق',
};

const dateFmt = new Intl.DateTimeFormat('ar-u-nu-latn', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Europe/Istanbul' });
export const formatDate = (iso: string) => dateFmt.format(new Date(iso));

/** Text with no Arabic letters (e.g. "$1,000 – $5,000") must stay left-to-right inside the RTL dashboard. */
export const textDir = (s: string) => (/[؀-ۿ]/.test(s) ? 'rtl' : 'ltr');

export const LANG_LABELS: Record<string, string> = { ar: 'العربية', en: 'English', tr: 'Türkçe' };

export function StatusPill({ status }: { status: LeadStatus }) {
  return <span className={`adm-pill s-${status}`}>{STATUS_LABELS[status]}</span>;
}

export function LeadsTable({ leads, empty }: { leads: Lead[]; empty: string }) {
  if (!leads.length) return <p className="adm-empty">{empty}</p>;
  return (
    <div className="adm-table-wrap">
      <table className="adm-table">
        <thead>
          <tr>
            <th scope="col">العميل</th>
            <th scope="col">الخدمات</th>
            <th scope="col">الميزانية</th>
            <th scope="col">التاريخ</th>
            <th scope="col">الحالة</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((l) => (
            <tr key={l.id}>
              <td>
                <Link href={`/admin/leads/${l.id}`} className="adm-row-link">
                  <b>{l.name}</b>
                  <small dir="ltr">{l.email}</small>
                </Link>
              </td>
              <td>{l.services.join('، ') || '—'}</td>
              <td>
                <span dir={textDir(l.budget)}>{l.budget || '—'}</span>
              </td>
              <td className="adm-nowrap">{formatDate(l.created_at)}</td>
              <td>
                <StatusPill status={l.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
