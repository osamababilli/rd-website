import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { Arrow, Icon, type IconName } from '@/components/Icon';
import { CtaBand, Faq, PageFallback, PageHero, SectionHead, Steps, WorkCard } from '@/components/Sections';
import type { ArtKind } from '@/components/WorkArt';
import { SERVICE_PAGE_SLUGS, hasCaseStudy, type ServicePageSlug } from '@/content/data';
import { getDictionary, getLocale } from '@/i18n/get-dictionary';
import { href } from '@/lib/paths';
import { pageMetadata } from '@/lib/seo';

const SLUGS = Object.values(SERVICE_PAGE_SLUGS) as ServicePageSlug[];
const isSlug = (s: string): s is ServicePageSlug => (SLUGS as string[]).includes(s);

export async function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<'/[locale]/services/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  if (!isSlug(slug)) return {};
  const [locale, t] = await Promise.all([getLocale(), getDictionary()]);
  const page = t.servicePages[slug];
  return pageMetadata({ locale, path: `/services/${slug}`, title: page.title, description: page.description });
}

const BUILD_ICONS: IconName[] = ['building', 'cart', 'mkt', 'sys'];

export default function ServiceDetailPage({ params }: PageProps<'/[locale]/services/[slug]'>) {
  return (
    <Suspense fallback={<PageFallback />}>
      <ServiceDetail params={params} />
    </Suspense>
  );
}

async function ServiceDetail({ params }: { params: PageProps<'/[locale]/services/[slug]'>['params'] }) {
  const { slug } = await params;
  if (!isSlug(slug)) notFound();
  const [locale, t] = await Promise.all([getLocale(), getDictionary()]);
  const p = t.servicePages[slug];
  const contact = href(locale, '/contact');

  return (
    <>
      <PageHero
        id="sw-t"
        crumbLabel={t.ui.breadcrumb}
        crumbs={[
          { label: t.ui.home, href: href(locale) },
          { label: t.nav.services, href: href(locale, '/services') },
          { label: p.crumb },
        ]}
        kick={p.kick}
        title={p.h1}
        gold={p.h1Gold}
        lead={p.lead}
        art={
          <div className="mock rise d2" aria-hidden="true">
            <div className="browser">
              <div className="bar">
                <i />
                <i />
                <i />
                <span className="url" />
              </div>
              <div className="bpage">
                <div>
                  <span className="ln g" style={{ width: '80%' }} />
                  <span className="ln" style={{ width: '95%' }} />
                  <span className="ln" style={{ width: '70%' }} />
                  <span className="btnm" />
                </div>
                <div className="img" />
                <div className="row3">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>
            <div className="phone">
              <span className="ln g" style={{ width: '70%' }} />
              <span className="ln" style={{ width: '50%' }} />
              <div className="img" />
              <span className="btnm" />
            </div>
            <div className="score">
              <b>{p.score.value}</b>
              <span>
                {p.score.label}
                <br />
                PageSpeed
              </span>
            </div>
          </div>
        }
      >
        <div className="ctas rise d3">
          <Link className="btn btn-gold" href={contact}>
            {p.ctaPrimary}
            <Arrow />
          </Link>
          <Link className="btn btn-line" href={href(locale, '/work')}>
            {p.ctaSecondary}
          </Link>
        </div>
      </PageHero>

      <section className="sec" aria-labelledby="sw-build-t">
        <div className="wrap">
          <SectionHead id="sw-build-t" kick={p.build.kick} title={p.build.title} />
          <div className="grid-auto">
            {p.build.items.map((b, i) => (
              <div className="card hov build reveal" key={b.t}>
                <div className="ic s48">
                  <Icon name={BUILD_ICONS[i] ?? 'web'} />
                </div>
                <h3>{b.t}</h3>
                <p>{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sec-alt" aria-labelledby="sw-feat-t">
        <div className="wrap">
          <SectionHead id="sw-feat-t" kick={p.features.kick} title={p.features.title} sub={p.features.sub} />
          <div className="feat-grid">
            {p.features.items.map((f) => (
              <div key={f.t}>
                <span className="chk">
                  <Icon name="check" />
                </span>
                <h3>{f.t}</h3>
                <p>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" aria-labelledby="sw-stack-t" style={{ paddingBottom: 32 }}>
        <div className="wrap">
          <SectionHead id="sw-stack-t" kick={p.stack.kick} title={p.stack.title} center small style={{ marginBottom: 28 }} />
          <div className="stack reveal">
            {p.stack.items.map((s) => (
              <span key={s}>{s}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" aria-labelledby="sw-proc-t">
        <div className="wrap">
          <SectionHead id="sw-proc-t" kick={p.process.kick} title={p.process.title} center />
          <Steps items={p.process.steps} />
        </div>
      </section>

      <section className="sec sec-alt" aria-labelledby="sw-work-t">
        <div className="wrap">
          <div className="row-head">
            <SectionHead id="sw-work-t" kick={p.related.kick} title={p.related.title} flat />
            <Link className="btn btn-line btn-sm" href={href(locale, '/work')}>
              {p.related.all}
              <Arrow />
            </Link>
          </div>
          <div className="grid-3">
            {p.related.items.map((w) => (
              <WorkCard
                key={w.title}
                art={w.art as ArtKind}
                tag={w.tag}
                title={w.title}
                client={t.work.client}
                view={t.work.view}
                href={hasCaseStudy(w.slug) ? href(locale, `/work/${w.slug}`) : undefined}
                className="reveal"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="sec" aria-labelledby="sw-faq-t">
        <div className="wrap faqw">
          <SectionHead
            id="sw-faq-t"
            kick={p.faq.kick}
            title={p.faq.title}
            flat
            sub={
              <>
                {p.faq.subBefore} <Link href={contact}>{p.faq.subLink}</Link> {p.faq.subAfter}
              </>
            }
          />
          <Faq items={p.faq.items} />
        </div>
      </section>

      <CtaBand id="sw-cta-t" kick={t.tagline} t1={p.cta.t1} t2={p.cta.t2} sub={p.cta.sub} flush>
        <Link className="btn btn-gold" href={contact}>
          {p.cta.primary}
          <Arrow />
        </Link>
        <Link className="btn btn-line" href={href(locale, '/services')}>
          {p.cta.secondary}
        </Link>
      </CtaBand>
    </>
  );
}
