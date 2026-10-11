import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { Crumbs, PageFallback } from '@/components/Sections';
import { LEGAL_DOCS, type LegalDoc } from '@/content/data';
import { getDictionary, getLocale } from '@/i18n/get-dictionary';
import { href } from '@/lib/paths';
import { pageMetadata } from '@/lib/seo';

const isDoc = (d: string): d is LegalDoc => (LEGAL_DOCS as readonly string[]).includes(d);

export async function generateStaticParams() {
  return LEGAL_DOCS.map((doc) => ({ doc }));
}

export async function generateMetadata({ params }: PageProps<'/[locale]/legal/[doc]'>): Promise<Metadata> {
  const { doc } = await params;
  if (!isDoc(doc)) return {};
  const [locale, t] = await Promise.all([getLocale(), getDictionary()]);
  return pageMetadata({ locale, path: `/legal/${doc}`, title: t.legal[doc].title, description: t.legal[doc].title });
}

export default function LegalPage({ params }: PageProps<'/[locale]/legal/[doc]'>) {
  return (
    <Suspense fallback={<PageFallback light />}>
      <Legal params={params} />
    </Suspense>
  );
}

async function Legal({ params }: { params: PageProps<'/[locale]/legal/[doc]'>['params'] }) {
  const { doc } = await params;
  if (!isDoc(doc)) notFound();
  const [locale, t] = await Promise.all([getLocale(), getDictionary()]);
  const page = t.legal[doc];

  return (
    <>
      <section className="phero short" aria-labelledby="legal-t">
        <div className="glow" aria-hidden="true" />
        <div className="wrap phero-in">
          <Crumbs label={t.ui.breadcrumb} items={[{ label: t.ui.home, href: href(locale) }, { label: page.title }]} />
          <h1 className="ph-t rise d1" id="legal-t">
            {page.title}
          </h1>
        </div>
      </section>
      <section className="sec">
        <div className="wrap prose">
          {page.body.map((para) => (
            <p key={para}>{para}</p>
          ))}
        </div>
      </section>
    </>
  );
}
