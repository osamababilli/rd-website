import type { Metadata } from 'next';
import Link from 'next/link';
import { Badge } from '@/components/Brand';
import { HomeServices } from '@/components/home/HomeServices';
import { QuoteForm } from '@/components/home/QuoteForm';
import { Stats } from '@/components/home/Stats';
import { Testimonials } from '@/components/home/Testimonials';
import { Arrow, Icon, type IconName } from '@/components/Icon';
import { CtaBand, Faq, Steps } from '@/components/Sections';
import { WorkGrid } from '@/components/WorkGrid';
import { PROJECTS, SERVICE_KEYS, hasCaseStudy } from '@/content/data';
import { LOCALE_LABELS } from '@/i18n/config';
import { getDictionary, getLocale } from '@/i18n/get-dictionary';
import { href, pad2 } from '@/lib/paths';
import { pageMetadata } from '@/lib/seo';
import { contactLinks, getSettings } from '@/lib/settings';

export async function generateMetadata(): Promise<Metadata> {
  const [locale, t] = await Promise.all([getLocale(), getDictionary()]);
  return {
    title: { absolute: t.meta.title },
    ...pageMetadata({ locale, path: '/', description: t.meta.description }),
  };
}

const WHY_ICONS: IconName[] = ['team', 'code', 'globe', 'bolt', 'tag', 'support'];
const CLIENT_LOGOS: IconName[] = ['logo1', 'logo2', 'logo3', 'logo4', 'logo5', 'logo6'];

export default async function HomePage() {
  const [locale, t] = await Promise.all([getLocale(), getDictionary()]);
  const contact = href(locale, '/contact');
  const settings = await getSettings();
  const { whatsapp: wa, tel, mail } = contactLinks(settings);

  const services = t.services.items.map((s, i) => ({
    key: SERVICE_KEYS[i],
    num: pad2(i + 1),
    title: s.title,
    short: s.short,
    desc: s.desc,
    bullets: s.bullets,
  }));

  const work = PROJECTS.map((p) => ({
    slug: p.slug,
    cat: p.cat,
    title: t.work.projects[p.slug].title,
    tag: t.work.f[p.cat],
    href: hasCaseStudy(p.slug) ? href(locale, `/work/${p.slug}`) : undefined,
  }));

  return (
    <>
      {/* HERO */}
      <section id="home" className="hero dark-zone" aria-labelledby="home-hero-t">
        <div className="hero-grid" aria-hidden="true" />
        <div className="wrap hero-in">
          <div>
            <span className="eyebrow rise">
              <span className="dot" />
              {t.hero.eyebrow}
            </span>
            <h1 className="hero-t rise d1" id="home-hero-t">
              <span className="l1">{t.hero.t1}</span> <span className="l2 gold-text">{t.hero.t2}</span>
            </h1>
            <p className="lead rise d2">{t.hero.sub}</p>
            <div className="hero-ctas rise d3">
              <a className="btn btn-gold" href="#contact">
                {t.hero.cta1}
                <Arrow />
              </a>
              <a className="btn btn-line" href="#work">
                {t.hero.cta2}
              </a>
            </div>
            <div className="hero-langs rise d4">
              <span>{t.hero.langs}</span>
              {(['ar', 'en', 'tr'] as const).map((code) => (
                <span key={code} style={{ display: 'contents' }}>
                  <span className="sep" />
                  <span lang={code}>{LOCALE_LABELS[code].native}</span>
                </span>
              ))}
            </div>
          </div>
          <div className="art rise d2" aria-hidden="true">
            <div className="glow" />
            <div className="ring r1">
              <span className="orb" />
            </div>
            <div className="ring r2" />
            <div className="ring r3">
              <span className="orb o2" />
            </div>
            <Badge className="badge badge-big" />
            <div className="fc fc-web">
              <div className="fc-bar">
                <span />
                <span />
                <span />
              </div>
              <div className="fc-body">
                <span className="ln g w50" />
                <span className="ln w85" />
                <span className="ln w70" />
                <div className="bars">
                  {[38, 54, 46, 70, 62, 92].map((h) => (
                    <span key={h} style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
            </div>
            <div className="fc fc-phone">
              <span className="notch" />
              <span className="ln g w70" />
              <span className="ln w50" />
              <div className="ph-card" />
              <div className="ph-card" />
            </div>
            <div className="fc fc-chip">
              <Icon name="mkt" />
              <span>{t.hero.chip}</span>
            </div>
          </div>
        </div>
      </section>

      {/* TRUSTED BY — placeholder logos */}
      <section className="trust" aria-label={t.trust}>
        <div className="wrap">
          <p>{t.trust}</p>
          <div className="logos">
            {CLIENT_LOGOS.map((name, i) => (
              <span className="clogo" key={name}>
                <Icon name={name} />
                CLIENT {pad2(i + 1)}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES + SERVICE DETAIL */}
      <HomeServices
        items={services}
        head={{ kick: t.services.kick, title: t.services.title, sub: t.services.sub, more: t.services.more, ctaT: t.services.ctaT, ctaD: t.services.ctaD }}
        detail={t.detail}
        links={{ quote: contact, quoteLabel: t.nav.quote, work: '#work', workLabel: t.hero.cta2 }}
      />

      {/* WHY */}
      <section id="why" className="sec" aria-labelledby="home-why-t">
        <div className="wrap">
          <div className="sh reveal">
            <span className="kick">{t.why.kick}</span>
            <h2 className="st" id="home-why-t">
              {t.why.title}
            </h2>
            <p className="sd">{t.why.sub}</p>
          </div>
          <div className="why-grid">
            {t.why.items.map((w, i) => (
              <div className="why reveal" key={w.t}>
                <div className="ic">
                  <Icon name={WHY_ICONS[i]} />
                </div>
                <h3>{w.t}</h3>
                <p>{w.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="sec sec-alt" aria-labelledby="home-proc-t">
        <div className="wrap">
          <div className="sh center reveal">
            <span className="kick">{t.process.kick}</span>
            <h2 className="st" id="home-proc-t">
              {t.process.title}
            </h2>
          </div>
          <Steps items={t.process.steps} />
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="sec" aria-labelledby="home-work-t">
        <div className="wrap">
          <WorkGrid
            variant="home"
            items={work}
            labels={{ f: t.work.f, filterLabel: t.work.kick, client: t.work.client, view: t.work.view }}
            head={
              <div className="sh flat reveal">
                <span className="kick">{t.work.kick}</span>
                <h2 className="st" id="home-work-t">
                  {t.work.title}
                </h2>
              </div>
            }
          />
        </div>
      </section>

      {/* STATS */}
      <Stats label={t.ui.stats} items={settings.stats.map((value, i) => ({ value, suffix: '+', label: t.stats[i] }))} />

      {/* TESTIMONIALS */}
      <Testimonials head={t.testi} items={t.testi.items} labels={{ prev: t.ui.prev, next: t.ui.next, slide: t.ui.slide }} />

      {/* QUOTE FORM */}
      <section id="contact" className="sec sec-alt" aria-labelledby="home-q-t">
        <div className="wrap quote">
          <div>
            <div className="sh reveal" style={{ marginBottom: 28 }}>
              <span className="kick">{t.form.kick}</span>
              <h2 className="st" id="home-q-t">
                {t.form.title}
              </h2>
              <p className="sd">{t.form.sub}</p>
            </div>
            <div className="contact-list">
              <ContactItem icon="whatsapp" label="WhatsApp" value={settings.whatsapp} link={wa} external />
              <ContactItem icon="mail" label={t.form.emailL} value={settings.email} link={mail} />
              <ContactItem icon="phone" label={t.form.phoneL} value={settings.phone} link={tel} />
            </div>
            <p className="note">
              <Icon name="lock" className="sm" />
              {t.form.privacy}
            </p>
          </div>
          <div className="card fcard">
            <QuoteForm t={t.form} services={t.services.items.map((s) => s.short)} locale={locale} />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="sec" aria-labelledby="home-faq-t">
        <div className="wrap faqw">
          <div className="sh flat reveal">
            <span className="kick">{t.faq.kick}</span>
            <h2 className="st" id="home-faq-t">
              {t.faq.title}
            </h2>
            <p className="sd">{t.faq.sub}</p>
          </div>
          <Faq items={t.faq.items} />
        </div>
      </section>

      {/* CTA */}
      <CtaBand id="home-cta-t" kick={t.tagline} t1={t.cta.t1} t2={t.cta.t2} sub={t.cta.sub} flush>
        <a className="btn btn-gold" href="#contact">
          {t.hero.cta1}
          <Arrow />
        </a>
        {wa ? (
          <a className="btn btn-line" href={wa} target="_blank" rel="noopener noreferrer">
            <Icon name="whatsapp" />
            {t.cta.wa}
          </a>
        ) : (
          <Link className="btn btn-line" href={contact}>
            <Icon name="whatsapp" />
            {t.cta.wa}
          </Link>
        )}
      </CtaBand>
    </>
  );
}

function ContactItem({
  icon,
  label,
  value,
  link,
  external,
}: {
  icon: IconName;
  label: string;
  value: string;
  link: string | null;
  external?: boolean;
}) {
  const body = (
    <>
      <span className="ic">
        <Icon name={icon} />
      </span>
      <span>
        <small>{label}</small>
        <b className="ltr">{value}</b>
      </span>
    </>
  );
  return link ? (
    <a className="citem" href={link} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {body}
    </a>
  ) : (
    <div className="citem">{body}</div>
  );
}
