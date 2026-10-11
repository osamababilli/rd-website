import Link from 'next/link';
import { mailHref, site, telHref, whatsappHref } from '@/config/site';
import { CASE_STUDY_SLUGS, SERVICE_KEYS, SERVICE_PAGE_SLUGS } from '@/content/data';
import type { Dictionary } from '@/i18n/get-dictionary';
import type { Locale } from '@/i18n/config';
import { href } from '@/lib/paths';
import { Badge } from './Brand';
import { Icon, type IconName } from './Icon';
import { LangSwitch } from './LangSwitch';

const SOCIAL: { key: keyof typeof site.social; label: string }[] = [
  { key: 'instagram', label: 'Instagram' },
  { key: 'linkedin', label: 'LinkedIn' },
  { key: 'tiktok', label: 'TikTok' },
  { key: 'youtube', label: 'YouTube' },
  { key: 'facebook', label: 'Facebook' },
];

export function SocialLinks({ only }: { only?: (keyof typeof site.social)[] }) {
  return (
    <div className="social">
      {SOCIAL.filter((s) => !only || only.includes(s.key)).map((s) => (
        <a key={s.key} className="icon-btn" href={site.social[s.key]} aria-label={s.label} target="_blank" rel="noopener noreferrer">
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

export function Footer({ locale, t }: { locale: Locale; t: Dictionary }) {
  const quick = [
    { label: t.nav.home, href: href(locale) },
    { label: t.nav.services, href: href(locale, '/services') },
    { label: t.nav.work, href: href(locale, '/work') },
    { label: t.footer.caseStudies, href: href(locale, `/work/${CASE_STUDY_SLUGS[0]}`) },
    { label: t.nav.about, href: href(locale, '/about') },
    { label: t.nav.contact, href: href(locale, '/contact') },
  ];
  const tel = telHref();
  const wa = whatsappHref();
  const mail = mailHref();

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
            <SocialLinks />
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
                {tel ? <a href={tel} dir="ltr">{site.phoneDisplay}</a> : <span dir="ltr">{site.phoneDisplay}</span>}
              </li>
              <li>
                <Icon name="chat" />
                {wa ? <a href={wa} dir="ltr">{site.whatsappDisplay}</a> : <span dir="ltr">{site.whatsappDisplay}</span>}
              </li>
              <li>
                <Icon name="mail" />
                {mail ? <a href={mail} dir="ltr">{site.email}</a> : <span dir="ltr">{site.email}</span>}
              </li>
              <li>
                <Icon name="pin" />
                <span>{t.footer.addr}</span>
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

export function WhatsAppFab({ locale, label }: { locale: Locale; label: string }) {
  const wa = whatsappHref();
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
