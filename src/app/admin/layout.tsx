import type { Metadata } from 'next';
import { Suspense } from 'react';
import { InlineScript } from '@/components/InlineScript';
import { THEME_SCRIPT, fontVariables } from '../fonts';
import '../globals.css';
import './admin.css';

/** The dashboard reads cookies and live data on every request, so navigations are allowed to wait for the server. */
export const instant = false;

export const metadata: Metadata = {
  title: { default: 'لوحة التحكم — RD Group', template: '%s — لوحة التحكم' },
  robots: { index: false, follow: false },
};

/** Root layout for the dashboard (Arabic, RTL). Every page reads cookies and the database at request time. */
export default function AdminRootLayout({ children }: LayoutProps<'/admin'>) {
  return (
    <html lang="ar" dir="rtl" className={fontVariables} suppressHydrationWarning>
      <head>
        <InlineScript code={THEME_SCRIPT} />
      </head>
      <body className="adm-body">
        <Suspense fallback={<div className="adm-loading" aria-busy="true" />}>{children}</Suspense>
      </body>
    </html>
  );
}
