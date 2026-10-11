import type { Metadata } from 'next';
import { Icon } from '@/components/Icon';
import { requireAdmin } from '@/lib/auth';
import { readSettings } from '@/lib/settings';
import ar from '@/i18n/dictionaries/ar';
import { saveSettings } from '../../actions';

/** The dashboard reads cookies and live data on every request, so navigations are allowed to wait for the server. */
export const instant = false;

export const metadata: Metadata = { title: 'إعدادات الموقع' };

const LANGS = [
  { code: 'ar', label: 'بالعربية', dir: 'rtl' },
  { code: 'en', label: 'English', dir: 'ltr' },
  { code: 'tr', label: 'Türkçe', dir: 'ltr' },
] as const;

const SOCIAL = [
  { key: 'instagram', label: 'Instagram' },
  { key: 'linkedin', label: 'LinkedIn' },
  { key: 'tiktok', label: 'TikTok' },
  { key: 'youtube', label: 'YouTube' },
  { key: 'facebook', label: 'Facebook' },
] as const;

function Field({ id, label, value, hint, dir, type = 'text' }: { id: string; label: string; value: string | number; hint?: string; dir?: 'ltr' | 'rtl'; type?: string }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input className="inp" id={id} name={id} type={type} defaultValue={value} dir={dir} {...(type === 'number' ? { min: 0, step: 1 } : {})} />
      {hint && <small className="adm-hint">{hint}</small>}
    </div>
  );
}

export default async function SettingsPage({ searchParams }: PageProps<'/admin/settings'>) {
  await requireAdmin();
  const s = readSettings();
  const { saved } = await searchParams;

  return (
    <>
      <header className="adm-head">
        <h1>إعدادات الموقع</h1>
      </header>

      {saved && (
        <p className="adm-flash" role="status">
          <Icon name="check" />
          تم الحفظ. تظهر التغييرات على الموقع مباشرة.
        </p>
      )}

      <form action={saveSettings} className="adm-form">
        <section className="card adm-panel">
          <h2>بيانات التواصل</h2>
          <p className="adm-hint">تظهر في الفوتر وصفحة التواصل والصفحة الرئيسية. اكتب الأرقام مع رمز الدولة؛ تُنشأ روابط الاتصال وواتساب تلقائياً.</p>
          <div className="adm-fields">
            <Field id="phone" label="رقم الهاتف" value={s.phone} dir="ltr" />
            <Field id="whatsapp" label="رقم واتساب" value={s.whatsapp} dir="ltr" />
            <Field id="email" label="البريد الإلكتروني" value={s.email} dir="ltr" />
            <Field id="mapsUrl" label="رابط الموقع على Google Maps" value={s.mapsUrl} dir="ltr" hint="يظهر زر «احصل على الاتجاهات» عند إضافته." />
          </div>
        </section>

        <section className="card adm-panel">
          <h2>العنوان وساعات العمل</h2>
          <div className="adm-fields">
            {LANGS.map((l) => (
              <Field key={`a-${l.code}`} id={`address_${l.code}`} label={`العنوان — ${l.label}`} value={s.address[l.code]} dir={l.dir} />
            ))}
            {LANGS.map((l) => (
              <Field key={`h-${l.code}`} id={`hours_${l.code}`} label={`ساعات العمل — ${l.label}`} value={s.hours[l.code]} dir={l.dir} />
            ))}
          </div>
        </section>

        <section className="card adm-panel">
          <h2>أرقام الصفحة الرئيسية</h2>
          <p className="adm-hint">تظهر في شريط الإحصائيات مع علامة +.</p>
          <div className="adm-fields four">
            {ar.stats.map((label, i) => (
              <Field key={label} id={`stat${i}`} label={label} value={s.stats[i]} type="number" />
            ))}
          </div>
        </section>

        <section className="card adm-panel">
          <h2>حسابات التواصل الاجتماعي</h2>
          <p className="adm-hint">اترك الحقل فارغاً لإخفاء الأيقونة من الموقع.</p>
          <div className="adm-fields">
            {SOCIAL.map((x) => (
              <Field key={x.key} id={x.key} label={x.label} value={s.social[x.key]} dir="ltr" />
            ))}
          </div>
        </section>

        <div className="adm-savebar">
          <button type="submit" className="btn btn-gold">
            حفظ الإعدادات
          </button>
        </div>
      </form>
    </>
  );
}
