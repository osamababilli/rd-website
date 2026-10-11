import type { Metadata, Viewport } from 'next';
import { GoldDefs } from '@/components/Brand';
import { Footer, WhatsAppFab } from '@/components/Footer';
import { Header } from '@/components/Header';
import { InlineScript } from '@/components/InlineScript';
import { site } from '@/config/site';
import { LOCALES, dirOf } from '@/i18n/config';
import { getDictionary, getLocale } from '@/i18n/get-dictionary';
import { href } from '@/lib/paths';
import { contactLinks, getSettings } from '@/lib/settings';
import { THEME_SCRIPT, fontVariables } from '../fonts';
import '../globals.css';

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getDictionary();
  return {
    metadataBase: new URL(site.url),
    title: { default: t.meta.title, template: `%s — ${site.name}` },
    description: t.meta.description,
    applicationName: site.name,
    openGraph: { siteName: site.name, type: 'website' },
    twitter: { card: 'summary_large_image' },
  };
}

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
  colorScheme: 'dark light',
};

export default async function LocaleLayout({ children }: LayoutProps<'/[locale]'>) {
  const locale = await getLocale();
  const t = await getDictionary();
  const settings = await getSettings();

  const nav = [
    { key: 'home' as const, label: t.nav.home, href: href(locale) },
    { key: 'services' as const, label: t.nav.services, href: href(locale, '/services') },
    { key: 'work' as const, label: t.nav.work, href: href(locale, '/work') },
    { key: 'process' as const, label: t.nav.process, href: `${href(locale)}#process` },
    { key: 'about' as const, label: t.nav.about, href: href(locale, '/about') },
    { key: 'contact' as const, label: t.nav.contact, href: href(locale, '/contact') },
  ];

  return (
    <html
      lang={locale}
      dir={dirOf(locale)}
      className={fontVariables}
      suppressHydrationWarning
    >
      <head>
        <InlineScript code={THEME_SCRIPT} />
      </head>
      <body>
        <GoldDefs />
        <a className="skip" href="#main">
          {t.ui.skip}
        </a>
        <div className="site">
          <Header
            locale={locale}
            items={nav}
            quote={{ label: t.nav.quote, href: href(locale, '/contact') }}
            labels={{
              mainNav: t.ui.mainNav,
              lang: t.ui.lang,
              toDark: t.ui.toDark,
              toLight: t.ui.toLight,
              menuOpen: t.ui.menuOpen,
              menuClose: t.ui.menuClose,
              home: t.ui.home,
            }}
          />
          <main id="main" tabIndex={-1}>
            {children}
          </main>
          <Footer locale={locale} t={t} settings={settings} />
        </div>
        <WhatsAppFab locale={locale} label={t.ui.wa} wa={contactLinks(settings).whatsapp} />
      </body>
    </html>
  );
}
