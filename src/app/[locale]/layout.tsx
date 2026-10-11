import type { Metadata, Viewport } from 'next';
import { Cairo, DM_Sans, IBM_Plex_Sans_Arabic, Poppins } from 'next/font/google';
import { GoldDefs } from '@/components/Brand';
import { Footer, WhatsAppFab } from '@/components/Footer';
import { Header } from '@/components/Header';
import { InlineScript } from '@/components/InlineScript';
import { site } from '@/config/site';
import { LOCALES, dirOf } from '@/i18n/config';
import { getDictionary, getLocale } from '@/i18n/get-dictionary';
import { href } from '@/lib/paths';
import '../globals.css';

const poppins = Poppins({ subsets: ['latin', 'latin-ext'], weight: ['500', '600', '700', '800'], variable: '--font-poppins', display: 'swap' });
const dmSans = DM_Sans({ subsets: ['latin', 'latin-ext'], variable: '--font-dm-sans', display: 'swap' });
const cairo = Cairo({ subsets: ['arabic', 'latin'], weight: ['600', '700', '800'], variable: '--font-cairo', display: 'swap' });
const plexArabic = IBM_Plex_Sans_Arabic({ subsets: ['arabic', 'latin'], weight: ['400', '500', '600'], variable: '--font-plex-arabic', display: 'swap' });

/** Runs before first paint: saved theme, else the OS preference (dark by default). */
const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.setAttribute('data-theme',t)}catch(e){}})()`;

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
      className={`${poppins.variable} ${dmSans.variable} ${cairo.variable} ${plexArabic.variable}`}
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
          <Footer locale={locale} t={t} />
        </div>
        <WhatsAppFab locale={locale} label={t.ui.wa} />
      </body>
    </html>
  );
}
