import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Badge } from '@/components/Brand';
import { Icon } from '@/components/Icon';
import { isAdmin, isAuthConfigured } from '@/lib/auth';
import { login } from '../actions';

/** The dashboard reads cookies and live data on every request, so navigations are allowed to wait for the server. */
export const instant = false;

export const metadata: Metadata = { title: 'تسجيل الدخول' };

export default async function LoginPage({ searchParams }: PageProps<'/admin/login'>) {
  if (await isAdmin()) redirect('/admin');
  const { error } = await searchParams;
  const configured = isAuthConfigured();

  return (
    <main className="adm-login">
      <form className="card adm-login-card" action={login}>
        <div className="adm-brand">
          <Badge className="badge" />
          <div>
            <b className="wm">RD GROUP</b>
            <small>لوحة التحكم</small>
          </div>
        </div>
        {!configured ? (
          <p className="form-alert" role="alert">
            <Icon name="alert" />
            لم يتم ضبط كلمة المرور. أضف ADMIN_PASSWORD إلى ملف ‎.env.local ثم أعد تشغيل الخادم.
          </p>
        ) : (
          <>
            {error && (
              <p className="form-alert" role="alert">
                <Icon name="alert" />
                كلمة المرور غير صحيحة.
              </p>
            )}
            <div className="field">
              <label htmlFor="password">كلمة المرور</label>
              <input className="inp" id="password" name="password" type="password" autoComplete="current-password" required autoFocus />
            </div>
            <button type="submit" className="btn btn-gold">
              دخول
            </button>
          </>
        )}
      </form>
    </main>
  );
}
