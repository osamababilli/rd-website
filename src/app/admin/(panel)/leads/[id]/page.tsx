import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Icon } from '@/components/Icon';
import { requireAdmin } from '@/lib/auth';
import { LEAD_STATUSES, getLead } from '@/lib/leads';
import { removeLead, saveLead } from '../../../actions';
import { ConfirmButton } from '../../ConfirmButton';
import { LANG_LABELS, STATUS_LABELS, StatusPill, formatDate, textDir } from '../../ui';

/** The dashboard reads cookies and live data on every request, so navigations are allowed to wait for the server. */
export const instant = false;

export const metadata: Metadata = { title: 'تفاصيل الطلب' };

export default async function LeadPage({ params, searchParams }: PageProps<'/admin/leads/[id]'>) {
  await requireAdmin();
  const { id } = await params;
  const lead = getLead(Number(id));
  if (!lead) notFound();
  const { saved } = await searchParams;

  const digits = lead.phone.replace(/\D/g, '');
  const rows: [string, string][] = [
    ['البريد الإلكتروني', lead.email],
    ['الهاتف / واتساب', lead.phone],
    ['الشركة', lead.company || '—'],
    ['الخدمات', lead.services.join('، ') || '—'],
    ['الميزانية', lead.budget || '—'],
    ['موعد البدء', lead.timing || '—'],
    ['طريقة التواصل المفضّلة', lead.contact_via || '—'],
    ['لغة الموقع', LANG_LABELS[lead.locale] ?? lead.locale],
    ['المصدر', lead.source === 'contact' ? 'صفحة التواصل' : 'نموذج الصفحة الرئيسية'],
    ['تاريخ الطلب', formatDate(lead.created_at)],
  ];

  return (
    <>
      <header className="adm-head">
        <div>
          <Link className="adm-back" href="/admin/leads">
            <Icon name="chevron" className="dir-ic sm" />
            طلبات العملاء
          </Link>
          <h1>
            {lead.name} <StatusPill status={lead.status} />
          </h1>
        </div>
        <div className="adm-actions">
          <a className="btn btn-line btn-sm" href={`mailto:${lead.email}`}>
            <Icon name="mail" />
            بريد
          </a>
          {digits.length >= 8 && (
            <>
              <a className="btn btn-line btn-sm" href={`https://wa.me/${digits}`} target="_blank" rel="noopener noreferrer">
                <Icon name="whatsapp" />
                واتساب
              </a>
              <a className="btn btn-line btn-sm" href={`tel:+${digits}`}>
                <Icon name="phone" />
                اتصال
              </a>
            </>
          )}
        </div>
      </header>

      {saved && (
        <p className="adm-flash" role="status">
          <Icon name="check" />
          تم حفظ التغييرات.
        </p>
      )}

      <div className="adm-grid">
        <section className="card adm-panel">
          <h2>بيانات الطلب</h2>
          <dl className="adm-dl">
            {rows.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>
                  <span dir={textDir(v)}>{v}</span>
                </dd>
              </div>
            ))}
          </dl>
          <h2>الرسالة</h2>
          <p className="adm-message" dir="auto">
            {lead.message || '—'}
          </p>
        </section>

        <section className="card adm-panel">
          <h2>المتابعة</h2>
          <form action={saveLead} className="adm-form">
            <input type="hidden" name="id" value={lead.id} />
            <fieldset className="field">
              <legend>الحالة</legend>
              <div className="opts">
                {LEAD_STATUSES.map((s) => (
                  <label className="opt" key={s}>
                    <input type="radio" name="status" value={s} defaultChecked={s === lead.status} />
                    <span>{STATUS_LABELS[s]}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="field">
              <label htmlFor="notes">ملاحظات داخلية</label>
              <textarea className="inp" id="notes" name="notes" rows={6} defaultValue={lead.notes} placeholder="مثال: تم الاتصال وإرسال عرض السعر…" />
            </div>
            <button type="submit" className="btn btn-gold btn-sm">
              حفظ
            </button>
          </form>
          <form action={removeLead} className="adm-danger">
            <input type="hidden" name="id" value={lead.id} />
            <ConfirmButton message="حذف هذا الطلب نهائياً؟">حذف الطلب</ConfirmButton>
          </form>
        </section>
      </div>
    </>
  );
}
