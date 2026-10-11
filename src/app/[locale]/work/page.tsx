import type { Metadata } from 'next';
import Link from 'next/link';
import { Arrow } from '@/components/Icon';
import { CtaBand, PageHero } from '@/components/Sections';
import { WorkGrid } from '@/components/WorkGrid';
import { PROJECTS, hasCaseStudy } from '@/content/data';
import { getDictionary, getLocale } from '@/i18n/get-dictionary';
import { href } from '@/lib/paths';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const [locale, t] = await Promise.all([getLocale(), getDictionary()]);
  return pageMetadata({ locale, path: '/work', title: t.workPage.title, description: t.workPage.description });
}

export default async function WorkPage() {
  const [locale, t] = await Promise.all([getLocale(), getDictionary()]);
  const p = t.workPage;

  const items = PROJECTS.map((pr) => ({
    slug: pr.slug,
    cat: pr.cat,
    title: t.work.projects[pr.slug].title,
    tag: `${t.work.f[pr.cat]} · ${t.work.projects[pr.slug].sector}`,
    href: hasCaseStudy(pr.slug) ? href(locale, `/work/${pr.slug}`) : undefined,
  }));

  return (
    <>
      <PageHero
        id="work-page-t"
        crumbLabel={t.ui.breadcrumb}
        crumbs={[{ label: t.ui.home, href: href(locale) }, { label: t.nav.work }]}
        kick={p.kick}
        title={p.h1}
        gold={p.h1Gold}
        lead={p.lead}
        short
      />

      <section className="sec" aria-label={p.listLabel} style={{ paddingTop: 48 }}>
        <div className="wrap">
          <WorkGrid
            variant="page"
            items={items}
            labels={{ f: t.work.f, filterLabel: p.filterLabel, client: t.work.client, view: t.work.view, count: p.count }}
          />
        </div>
      </section>

      <CtaBand id="work-cta-t" kick={p.cta.kick} t1={p.cta.t1} t2={p.cta.t2} sub={p.cta.sub} flush>
        <Link className="btn btn-gold" href={href(locale, '/contact')}>
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
