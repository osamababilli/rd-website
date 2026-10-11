import type { Metadata } from 'next';
import { Badge } from '@/components/Brand';
import { ContactWizard } from '@/components/contact/ContactWizard';
import { SocialLinks } from '@/components/Footer';
import { Arrow, Icon, type IconName } from '@/components/Icon';
import { Faq, PageHero, SectionHead } from '@/components/Sections';
import { mailHref, site, telHref, whatsappHref } from '@/config/site';
import { getDictionary, getLocale } from '@/i18n/get-dictionary';
import { href } from '@/lib/paths';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const [locale, t] = await Promise.all([getLocale(), getDictionary()]);
  return pageMetadata({ locale, path: '/contact', title: t.contactPage.title, description: t.contactPage.description });
}

export default async function ContactPage() {
  const [locale, t] = await Promise.all([getLocale(), getDictionary()]);
  const p = t.contactPage;

  const channels: { icon: IconName; label: string; value: string; link: string | null; ltr?: boolean; external?: boolean }[] = [
    { icon: 'whatsapp', label: p.channels.whatsapp, value: site.whatsappDisplay, link: whatsappHref(), ltr: true, external: true },
    { icon: 'phone', label: p.channels.phone, value: site.phoneDisplay, link: telHref(), ltr: true },
    { icon: 'mail', label: p.channels.email, value: site.email, link: mailHref(), ltr: true },
    { icon: 'pin', label: p.channels.office, value: t.footer.addr, link: '#office' },
  ];

  return (
    <>
      <PageHero
        id="contact-t"
        crumbLabel={t.ui.breadcrumb}
        crumbs={[{ label: t.ui.home, href: href(locale) }, { label: p.crumb }]}
        kick={p.kick}
        title={p.h1}
        gold={p.h1Gold}
        lead={p.lead}
        short
      />

      <section className="sec" aria-label={p.formLabel} style={{ paddingTop: 56 }}>
        <div className="wrap contact-grid">
          <aside>
            <div className="citems">
              {channels.map((c) => {
                const body = (
                  <>
                    <span className="ic">
                      <Icon name={c.icon} />
                    </span>
                    <span>
                      <small>{c.label}</small>
                      <b className={c.ltr ? 'ltr' : undefined}>{c.value}</b>
                    </span>
                    {c.link && <Icon name="arrow" className="sm go dir-ic" />}
                  </>
                );
                return c.link ? (
                  <a key={c.icon} className="citem" href={c.link} {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                    {body}
                  </a>
                ) : (
                  <div key={c.icon} className="citem">
                    {body}
                  </div>
                );
              })}
            </div>
            <div className="hours">
              <Icon name="clock" />
              <span>{p.hours}</span>
            </div>
            <div style={{ marginTop: 20 }}>
              <SocialLinks only={['instagram', 'linkedin', 'tiktok']} />
            </div>
          </aside>

          <div className="card wizard">
            <ContactWizard t={p.wizard} f={t.form} locale={locale} />
          </div>
        </div>
      </section>

      <section className="sec sec-alt" id="office" aria-labelledby="contact-office-t">
        <div className="wrap">
          <SectionHead id="contact-office-t" kick={p.office.kick} title={p.office.title} />
          <div className="map reveal">
            <div className="mgrid" aria-hidden="true" />
            <svg className="roads" viewBox="0 0 1200 420" preserveAspectRatio="none" aria-hidden="true">
              <path className="m" d="M-20 300C200 260 380 320 620 200S980 120 1220 160" />
              <path d="M300 -20C340 120 300 260 380 440" />
              <path d="M760 -20C720 140 820 260 780 440" />
              <path d="M-20 120C260 140 520 90 1220 60" />
            </svg>
            <div className="pin" role="img" aria-label={p.office.mapLabel}>
              <Badge className="badge pb" />
            </div>
            <div className="addr">
              <b>RD Group</b>
              <span>{t.footer.addr}</span>
              <small>{p.office.hours}</small>
              {site.mapsUrl && (
                <a className="more" href={site.mapsUrl} target="_blank" rel="noopener noreferrer">
                  {p.office.directions}
                  <Arrow />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="sec" aria-labelledby="contact-faq-t">
        <div className="wrap faqw">
          <SectionHead id="contact-faq-t" kick={p.faq.kick} title={p.faq.title} flat />
          <Faq items={p.faq.items} />
        </div>
      </section>
    </>
  );
}
