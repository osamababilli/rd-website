'use client';

import { usePathname } from 'next/navigation';
import { LOCALES, LOCALE_COOKIE, LOCALE_LABELS, type Locale } from '@/i18n/config';

const LOCALE_PREFIX = new RegExp(`^/(${LOCALES.join('|')})(?=/|$)`);

function remember(code: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${code}; path=/; max-age=31536000; samesite=lax`;
  try {
    localStorage.setItem('locale', code);
  } catch {}
}

/** Swaps the locale prefix of the current path, keeps the #anchor and remembers the choice. */
export function LangSwitch({ locale, label }: { locale: Locale; label: string }) {
  const rest = (usePathname() ?? '').replace(LOCALE_PREFIX, '');

  return (
    <div className="seg" role="group" aria-label={label}>
      {LOCALES.map((code) => {
        const target = `/${code}${rest}`;
        const current = code === locale;
        return (
          <a
            key={code}
            href={target}
            hrefLang={code}
            lang={code}
            title={LOCALE_LABELS[code].native}
            className={current ? 'on' : undefined}
            aria-current={current ? 'true' : undefined}
            onClick={(e) => {
              remember(code);
              if (window.location.hash) e.currentTarget.href = target + window.location.hash;
            }}
          >
            {LOCALE_LABELS[code].short}
          </a>
        );
      })}
    </div>
  );
}
