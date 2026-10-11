import Link from 'next/link';
import { Badge } from '@/components/Brand';
import { Icon } from '@/components/Icon';
import { requireAdmin } from '@/lib/auth';
import { logout } from '../actions';
import { AdminNav } from './AdminNav';

/** The dashboard reads cookies and live data on every request, so navigations are allowed to wait for the server. */
export const instant = false;

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return (
    <div className="adm">
      <aside className="adm-side">
        <Link className="adm-brand" href="/admin">
          <Badge className="badge" />
          <div>
            <b className="wm">RD GROUP</b>
            <small>لوحة التحكم</small>
          </div>
        </Link>
        <AdminNav />
        <div className="adm-side-foot">
          <a className="adm-link" href="/ar" target="_blank" rel="noopener noreferrer">
            <Icon name="globe" />
            عرض الموقع
          </a>
          <form action={logout}>
            <button type="submit" className="adm-link">
              <Icon name="arrowBack" className="dir-ic" />
              تسجيل الخروج
            </button>
          </form>
        </div>
      </aside>
      <main className="adm-main" id="main">
        {children}
      </main>
    </div>
  );
}
