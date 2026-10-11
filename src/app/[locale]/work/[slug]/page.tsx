import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { QuoteMark } from '@/components/Brand';
import { Arrow, Icon } from '@/components/Icon';
import { CheckList, PageFallback, PageHero, SectionHead } from '@/components/Sections';
import { WorkArt } from '@/components/WorkArt';
import { CASE_STUDY_SLUGS, PROJECTS, hasCaseStudy, type WorkCategory } from '@/content/data';
import { getDictionary, getLocale } from '@/i18n/get-dictionary';
import { href } from '@/lib/paths';
import { pageMetadata } from '@/lib/seo';

/** Language-independent facts about each case study. */
const META: Record<(typeof CASE_STUDY_SLUGS)[number], { cats: WorkCategory[] }> = {
  'fashion-store': { cats: ['web', 'branding', 'ads'] },
};

export async function generateStaticParams() {
  return CASE_STUDY_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<'/[locale]/work/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  if (!hasCaseStudy(slug)) return {};
  const [locale, t] = await Promise.all([getLocale(), getDictionary()]);
  const cs = t.caseStudies[slug];
  return pageMetadata({ locale, path: `/work/${slug}`, title: cs.title, description: cs.description });
}

export default function CaseStudyPage({ params }: PageProps<'/[locale]/work/[slug]'>) {
  return (
    <Suspense fallback={<PageFallback light />}>
      <CaseStudy params={params} />
    </Suspense>
  );
}

async function CaseStudy({ params }: { params: PageProps<'/[locale]/work/[slug]'>['params'] }) {
  const { slug } = await params;
  if (!hasCaseStudy(slug)) notFound();
  const [locale, t] = await Promise.all([getLocale(), getDictionary()]);
  const cs = t.caseStudies[slug];
  const ui = t.caseStudyUi;

  // "Next project": the following project in the portfolio order.
  const idx = PROJECTS.findIndex((p) => p.slug === slug);
  const next = PROJECTS[(idx + 1) % PROJECTS.length];
  const nextHref = hasCaseStudy(next.slug) ? href(locale, `/work/${next.slug}`) : href(locale, '/work');
  const metaKeys = ['client', 'sector', 'services', 'duration', 'market'] as const;

  return (
    <>
      <PageHero
        id="cs-t"
        crumbLabel={t.ui.breadcrumb}
        crumbs={[
          { label: t.ui.home, href: href(locale) },
          { label: t.nav.work, href: href(locale, '/work') },
          { label: cs.crumb },
        ]}
        title={cs.h1}
        gold={cs.h1Gold}
        lead={cs.lead}
        dark={false}
        grid={false}
        narrow
        above={
          <div className="pills rise">
            {META[slug].cats.map((c) => (
              <span className="pill" key={c}>
                {t.work.f[c]}
              </span>
            ))}
          </div>
        }
      >
        <dl className="meta-grid rise d3">
          {metaKeys.map((k) => (
            <div key={k}>
              <dt>{ui.metaLabels[k]}</dt>
              <dd>{cs.meta[k]}</dd>
            </div>
          ))}
        </dl>
        <div className="cs-hero-vis rise d3" aria-hidden="true">
          <div className="mock">
            <div className="browser">
              <div className="bar">
                <i />
                <i />
                <i />
                <span className="url" />
              </div>
              <div className="bpage">
                <div>
                  <span className="ln g" style={{ width: '70%' }} />
                  <span className="ln" style={{ width: '90%' }} />
                  <span className="ln" style={{ width: '60%' }} />
                  <span className="btnm" />
                </div>
                <div className="img" style={{ minHeight: 170 }} />
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
          </div>
        </div>
      </PageHero>

      <section className="sec" aria-labelledby="cs-story-t">
        <div className="wrap">
          <SectionHead id="cs-story-t" kick={ui.storyKick} title={ui.storyTitle} />
          <div className="cs-two">
            <div className="card cs-box reveal">
              <h3>
                <span className="ic s48">
                  <Icon name="warning" />
                </span>
                {ui.challenge}
              </h3>
              <p>{cs.challenge.text}</p>
              <CheckList items={cs.challenge.points} one icon="exclaim" />
            </div>
            <div className="card cs-box accent reveal">
              <h3>
                <span className="ic s48">
                  <Icon name="bulb" />
                </span>
                {ui.solution}
              </h3>
              <p>{cs.solution.text}</p>
              <CheckList items={cs.solution.points} one />
            </div>
          </div>
        </div>
      </section>

      <section className="sec sec-alt" aria-labelledby="cs-res-t">
        <div className="wrap">
          <SectionHead id="cs-res-t" kick={ui.resultsKick} title={ui.resultsTitle} center />
          <div className="res-grid">
            {cs.results.map((r) => (
              <div className="card res reveal" key={r.l}>
                <span className="v gold-text">{r.v}</span>
                <span className="l">{r.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" aria-labelledby="cs-gal-t">
        <div className="wrap">
          <SectionHead id="cs-gal-t" kick={ui.galleryKick} title={ui.galleryTitle} />
          <div className="gallery">
            {(['cs-home', 'cs-product', 'cs-checkout'] as const).map((art, i) => (
              <figure className={`gtile reveal${i === 0 ? ' g1' : ''}`} key={art}>
                <WorkArt kind={art} />
                <figcaption>{cs.gallery[i]}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sec-alt" aria-label={ui.quoteLabel}>
        <div className="wrap narrow-wrap">
          <figure className="card qcard reveal">
            <QuoteMark />
            <blockquote>{cs.quote.q}</blockquote>
            <figcaption className="who">
              <span className="av">
                <Icon name="user" />
              </span>
              <span>
                <b>{cs.quote.n}</b>
                <span>{cs.quote.r}</span>
              </span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="sec" aria-labelledby="cs-next-t">
        <div className="wrap">
          <Link className="card hov next-proj reveal" href={nextHref}>
            <div>
              <span className="kick">{ui.next}</span>
              <h3 id="cs-next-t">{t.work.projects[next.slug].title}</h3>
              <span className="more">
                {hasCaseStudy(next.slug) ? ui.nextCta : ui.allWork}
                <Arrow />
              </span>
            </div>
            <div className="thumb">
              <WorkArt kind={next.cat} />
            </div>
          </Link>
          <div className="ctas" style={{ justifyContent: 'center', marginTop: 48 }}>
            <Link className="btn btn-gold" href={href(locale, '/contact')}>
              {ui.similar}
              <Arrow />
            </Link>
            <Link className="btn btn-line" href={href(locale, '/work')}>
              {ui.allWork}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
