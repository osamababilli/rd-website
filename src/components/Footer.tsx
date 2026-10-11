import Link from 'next/link';
import { CASE_STUDY_SLUGS, SERVICE_KEYS, SERVICE_PAGE_SLUGS } from '@/content/data';
import type { Dictionary } from '@/i18n/get-dictionary';
import type { Locale } from '@/i18n/config';
import { href } from '@/lib/paths';
import { contactLinks, type SiteSettings } from '@/lib/settings';
import { Badge } from './Brand';
import { Icon, type IconName } from './Icon';
import { LangSwitch } from './LangSwitch';

type SocialKey = keyof SiteSettings['social'];

const SOCIAL: { key: SocialKey; label: string }[] = [
  { key: 'instagram', label: 'Instagram' },
  { key: 'linkedin', label: 'LinkedIn' },
  { key: 'tiktok', label: 'TikTok' },
  { key: 'youtube', label: 'YouTube' },
  { key: 'facebook', label: 'Facebook' },
];

export function SocialLinks({ social, only }: { social: SiteSettings['social']; only?: SocialKey[] }) {
  return (
    <div className="social">
      {SOCIAL.filter((s) => social[s.key] && (!only || only.includes(s.key))).map((s) => (
        <a key={s.key} className="icon-btn" href={social[s.key]} aria-label={s.label} target="_blank" rel="noopener noreferrer">
          <Icon name={s.key as IconName} />
        </a>
      ))}
    </div>
  );
}

export function serviceHref(locale: Locale, index: number) {
  const key = SERVICE_KEYS[index];
  const page = (SERVICE_PAGE_SLUGS as Partial<Record<string, string>>)[key];
  return page ? href(locale, `/services/${page}`) : href(locale, `/services#svc-${index + 1}`);
}

export function Footer({ locale, t, settings }: { locale: Locale; t: Dictionary; settings: SiteSettings }) {
  const quick = [
    { label: t.nav.home, href: href(locale) },
    { label: t.nav.services, href: href(locale, '/services') },
    { label: t.nav.work, href: href(locale, '/work') },
    { label: t.footer.caseStudies, href: href(locale, `/work/${CASE_STUDY_SLUGS[0]}`) },
    { label: t.nav.about, href: href(locale, '/about') },
    { label: t.nav.contact, href: href(locale, '/contact') },
  ];
  const { tel, whatsapp: wa, mail } = contactLinks(settings);

  return (
    <footer className="ft">
      <div className="wrap">
        <div className="ft-grid">
          <div className="ft-about">
            <Link className="logo" href={href(locale)} aria-label={`RD Group — ${t.ui.home}`}>
              <Badge />
              <span className="wm">RD GROUP</span>
            </Link>
            <p>{t.footer.about}</p>
            <span className="tagline gold-text">{t.tagline}</span>
            <SocialLinks social={settings.social} />
          </div>

          <nav aria-labelledby="ft-quick">
            <h2 id="ft-quick">{t.footer.quick}</h2>
            <ul>
              {quick.map((l) => (
                <li key={l.label}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="ft-svc">
            <h2 id="ft-svc">{t.footer.svc}</h2>
            <ul>
              {t.services.items.map((s, i) => (
                <li key={s.short}>
                  <Link href={serviceHref(locale, i)}>{s.short}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2>{t.footer.contact}</h2>
            <ul className="ft-contact">
              <li>
                <Icon name="phone" />
                {tel ? <a href={tel} dir="ltr">{settings.phone}</a> : <span dir="ltr">{settings.phone}</span>}
              </li>
              <li>
                <Icon name="chat" />
                {wa ? <a href={wa} dir="ltr">{settings.whatsapp}</a> : <span dir="ltr">{settings.whatsapp}</span>}
              </li>
              <li>
                <Icon name="mail" />
                {mail ? <a href={mail} dir="ltr">{settings.email}</a> : <span dir="ltr">{settings.email}</span>}
              </li>
              <li>
                <Icon name="pin" />
                <span>{settings.address[locale]}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="ft-bottom">
          <span>{t.footer.rights}</span>
          <LangSwitch locale={locale} label={t.ui.lang} />
          <div className="ft-links">
            <Link href={href(locale, '/legal/privacy')}>{t.footer.privacy}</Link>
            <Link href={href(locale, '/legal/terms')}>{t.footer.terms}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function WhatsAppFab({ locale, label, wa }: { locale: Locale; label: string; wa: string | null }) {
  return wa ? (
    <a className="wa" href={wa} aria-label={label} target="_blank" rel="noopener noreferrer">
      <Icon name="whatsapp" />
    </a>
  ) : (
    <Link className="wa" href={href(locale, '/contact')} aria-label={label}>
      <Icon name="whatsapp" />
    </Link>
  );
}
