import type { Metadata } from 'next';
import Link from 'next/link';
import { Arrow, Icon, type IconName } from '@/components/Icon';
import { CheckList, CtaBand, PageHero, SectionHead } from '@/components/Sections';
import { whatsappHref } from '@/config/site';
import { SERVICE_KEYS, SERVICE_PAGE_SLUGS, SERVICE_TOOLS } from '@/content/data';
import { getDictionary, getLocale } from '@/i18n/get-dictionary';
import { href, pad2 } from '@/lib/paths';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const [locale, t] = await Promise.all([getLocale(), getDictionary()]);
  return pageMetadata({ locale, path: '/services', title: t.servicesPage.title, description: t.servicesPage.description });
}

const MODEL_ICONS: IconName[] = ['chart', 'repeat', 'bundle'];

export default async function ServicesPage() {
  const [locale, t] = await Promise.all([getLocale(), getDictionary()]);
  const p = t.servicesPage;
  const contact = href(locale, '/contact');
  const wa = whatsappHref();

  const items = t.services.items.map((s, i) => {
    const key = SERVICE_KEYS[i];
    const page = (SERVICE_PAGE_SLUGS as Partial<Record<string, string>>)[key];
    return { ...s, key, id: `svc-${i + 1}`, num: pad2(i + 1), tools: SERVICE_TOOLS[key], page: page ? href(locale, `/services/${page}`) : null };
  });

  return (
    <>
      <PageHero
        id="svc-page-t"
        crumbLabel={t.ui.breadcrumb}
        crumbs={[{ label: t.ui.home, href: href(locale) }, { label: t.nav.services }]}
        kick={p.kick}
        title={p.h1}
        gold={p.h1Gold}
        lead={p.lead}
      >
        <nav className="jump rise d3" aria-label={p.jumpLabel}>
          {items.map((s) => (
            <a key={s.id} href={`#${s.id}`}>
              <span className="n">{s.num}</span>
              {s.short}
            </a>
          ))}
        </nav>
      </PageHero>

      <section className="sec" aria-label={p.listLabel} style={{ paddingBlock: 24 }}>
        <div className="wrap">
          {items.map((s, i) => (
            <article className={i % 2 ? 'svc-row rev' : 'svc-row'} id={s.id} key={s.id} aria-labelledby={`${s.id}-t`}>
              <div className="reveal">
                <span className="kick">{s.num} / 07</span>
                <h2 id={`${s.id}-t`}>{s.title}</h2>
                <p className="desc">{s.long}</p>
                <CheckList items={s.bullets} />
                <p className="deliv">
                  <Icon name="box" className="sm" />
                  <b>{p.delivLabel}</b> {s.deliv}
                </p>
                <div className="svc-acts">
                  <Link className="btn btn-gold btn-sm" href={contact}>
                    {p.request}
                    <Arrow />
                  </Link>
                  {s.page && (
                    <Link className="btn btn-line btn-sm" href={s.page}>
                      {p.fullPage}
                    </Link>
                  )}
                </div>
              </div>
              <div className="svc-vis reveal" aria-hidden="true">
                <div className="ring a spin">
                  <span className="orb" />
                </div>
                <div className="ring b" />
                <span className="vnum gold-text">{s.num}</span>
                <div className="big-ic">
                  <Icon name={s.key} />
                </div>
                <div className="vtools">
                  {s.tools.map((tool) => (
                    <span key={tool}>{tool}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="sec sec-alt" aria-labelledby="svc-models-t">
        <div className="wrap">
          <SectionHead id="svc-models-t" kick={p.models.kick} title={p.models.title} sub={p.models.sub} center />
          <div className="grid-3">
            {p.models.items.map((m, i) => (
              <div className={`card model reveal${i === 1 ? ' feat' : ''}`} key={m.t}>
                {i === 1 && <span className="flag">{p.models.flag}</span>}
                <div className="ic s48">
                  <Icon name={MODEL_ICONS[i]} />
                </div>
                <h3>{m.t}</h3>
                <p>{m.d}</p>
                <CheckList items={m.bullets} one />
                <p className="fit">
                  {p.models.fitLabel} {m.fit}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand id="svc-cta-t" kick={t.tagline} t1={p.cta.t1} t2={p.cta.t2} sub={p.cta.sub}>
        <Link className="btn btn-gold" href={contact}>
          {t.hero.cta1}
          <Arrow />
        </Link>
        {wa ? (
          <a className="btn btn-line" href={wa} target="_blank" rel="noopener noreferrer">
            {t.ui.wa}
          </a>
        ) : (
          <Link className="btn btn-line" href={contact}>
            {t.ui.wa}
          </Link>
        )}
      </CtaBand>
    </>
  );
}
