'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useSyncExternalStore } from 'react';
import type { Locale } from '@/i18n/config';
import { Badge } from './Brand';
import { Icon } from './Icon';
import { LangSwitch } from './LangSwitch';

type NavKey = 'home' | 'services' | 'work' | 'process' | 'about' | 'contact';

type Props = {
  locale: Locale;
  items: { key: NavKey; label: string; href: string }[];
  quote: { label: string; href: string };
  labels: { mainNav: string; lang: string; toDark: string; toLight: string; menuOpen: string; menuClose: string; home: string };
};

/* ---- external stores: scroll position and the theme attribute set by the inline script ---- */
const subscribeScroll = (cb: () => void) => {
  window.addEventListener('scroll', cb, { passive: true });
  return () => window.removeEventListener('scroll', cb);
};
const subscribeTheme = (cb: () => void) => {
  const mo = new MutationObserver(cb);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  return () => mo.disconnect();
};
const readTheme = () => (document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark');

function setTheme(theme: 'light' | 'dark') {
  document.documentElement.setAttribute('data-theme', theme);
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'light' ? '#FAFAF7' : '#0A0A0A');
  try {
    localStorage.setItem('theme', theme);
  } catch {}
}

function activeKey(pathname: string): NavKey | null {
  const section = pathname.split('/')[2] ?? '';
  if (section === '') return 'home';
  if (section === 'services' || section === 'work' || section === 'about' || section === 'contact') return section;
  return null;
}

export function Header({ locale, items, quote, labels }: Props) {
  const pathname = usePathname() ?? '';
  const small = useSyncExternalStore(subscribeScroll, () => window.scrollY > 24, () => false);
  const theme = useSyncExternalStore(subscribeTheme, readTheme, () => 'dark' as const);

  const [menu, setMenu] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenu(false);
  }

  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setMenu(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menu]);

  const active = activeKey(pathname);
  const close = () => setMenu(false);
  const themeLabel = theme === 'dark' ? labels.toLight : labels.toDark;

  return (
    <header className={small ? 'hdr is-small' : 'hdr'}>
      <div className="wrap hdr-in">
        <Link className="logo" href={`/${locale}`} aria-label={`RD Group — ${labels.home}`} onClick={close}>
          <Badge />
          <span className="wm">RD GROUP</span>
        </Link>

        <nav className={menu ? 'nav open' : 'nav'} id="main-nav" aria-label={labels.mainNav}>
          <div className="nav-links">
            {items.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={item.key === active ? 'on' : undefined}
                aria-current={item.key === active ? 'page' : undefined}
                onClick={close}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="nav-mob">
            <LangSwitch locale={locale} label={labels.lang} />
            <Link className="btn btn-gold btn-sm" href={quote.href} onClick={close}>
              {quote.label}
            </Link>
          </div>
        </nav>

        <div className="tools">
          <LangSwitch locale={locale} label={labels.lang} />
          <button
            type="button"
            className="icon-btn theme-btn"
            aria-label={themeLabel}
            title={themeLabel}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            <Icon name="sun" className="i-sun" />
            <Icon name="moon" className="i-moon" />
          </button>
          <Link className="btn btn-gold btn-sm btn-quote" href={quote.href}>
            {quote.label}
          </Link>
          <button
            type="button"
            className="icon-btn menu-btn"
            aria-controls="main-nav"
            aria-expanded={menu}
            aria-label={menu ? labels.menuClose : labels.menuOpen}
            onClick={() => setMenu((open) => !open)}
          >
            <Icon name={menu ? 'close' : 'menu'} />
          </button>
        </div>
      </div>
    </header>
  );
}
