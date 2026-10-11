import type { Metadata } from 'next';
import Link from 'next/link';
import { Badge } from '@/components/Brand';
import { Arrow, Icon, type IconName } from '@/components/Icon';
import { CtaBand, PageHero, SectionHead, Steps } from '@/components/Sections';
import { getDictionary, getLocale } from '@/i18n/get-dictionary';
import { href } from '@/lib/paths';
import { pageMetadata } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const [locale, t] = await Promise.all([getLocale(), getDictionary()]);
  return pageMetadata({ locale, path: '/about', title: t.aboutPage.title, description: t.aboutPage.description });
}

const VALUE_ICONS: IconName[] = ['eye', 'star', 'team', 'bolt'];

export default async function AboutPage() {
  const [locale, t] = await Promise.all([getLocale(), getDictionary()]);
  const p = t.aboutPage;
  const contact = href(locale, '/contact');

  return (
    <>
      <PageHero
        id="about-t"
        crumbLabel={t.ui.breadcrumb}
        crumbs={[{ label: t.ui.home, href: href(locale) }, { label: t.nav.about }]}
        kick={p.kick}
        title={p.h1}
        gold={p.h1Gold}
        lead={p.lead}
        art={
          <div className="about-art rise d2" aria-hidden="true">
            <div className="ring a spin">
              <span className="orb" />
            </div>
            <div className="ring b" />
            <div className="ring c" />
            <Badge />
            <span className="pill p1">{p.pills[0]}</span>
            <span className="pill p2">{p.pills[1]}</span>
            <span className="pill p3">{p.pills[2]}</span>
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

      <section className="sec" aria-labelledby="about-story-t">
        <div className="wrap about-split">
          <div className="story reveal">
            <span className="kick">{p.story.kick}</span>
            <h2 className="st" id="about-story-t">
              {p.story.title}
            </h2>
            <p className="big">{p.story.big}</p>
            {p.story.paragraphs.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>
          <div className="facts reveal">
            {p.facts.map((f) => (
              <div key={f.l}>
                <span className="v gold-text">{f.v}</span>
                <span className="l">{f.l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sec-alt" aria-label={p.mvLabel}>
        <div className="wrap mv">
          {[p.mission, p.vision].map((x, i) => (
            <div className={`card reveal${i === 1 ? ' accent' : ''}`} key={x.kick}>
              <div className="ring" aria-hidden="true" />
              <span className="kick">{x.kick}</span>
              <h3>{x.t}</h3>
              <p>{x.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="sec" aria-labelledby="about-values-t">
        <div className="wrap">
          <SectionHead id="about-values-t" kick={p.values.kick} title={p.values.title} />
          <div className="values">
            {p.values.items.map((v, i) => (
              <div className="card value reveal" key={v.t}>
                <div className="ic s48">
                  <Icon name={VALUE_ICONS[i]} />
                </div>
                <h3>{v.t}</h3>
                <p>{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sec-alt" id="about-process" aria-labelledby="about-proc-t">
        <div className="wrap">
          <SectionHead id="about-proc-t" kick={t.process.kick} title={t.process.title} center />
          <Steps items={t.process.steps} />
        </div>
      </section>

      <section className="sec" aria-labelledby="about-team-t">
        <div className="wrap">
          <SectionHead id="about-team-t" kick={p.team.kick} title={p.team.title} />
          <div className="team">
            {p.team.roles.map((role) => (
              <div className="card member reveal" key={role}>
                <div className="ph">
                  <Icon name="user" />
                  <small>{p.team.photo}</small>
                </div>
                <div className="mb">
                  <b>{p.team.name}</b>
                  <span className="role">{role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sec-alt center" aria-labelledby="about-markets-t">
        <div className="wrap">
          <SectionHead id="about-markets-t" kick={p.markets.kick} title={p.markets.title} sub={p.markets.sub} center style={{ marginBottom: 28 }} />
          <div className="markets reveal">
            {p.markets.items.map((m) => (
              <span className="pill" key={m}>
                {m}
              </span>
            ))}
          </div>
        </div>
      </section>

      <CtaBand id="about-cta-t" kick={t.tagline} t1={p.cta.t1} t2={p.cta.t2} sub={p.cta.sub}>
        <Link className="btn btn-gold" href={contact}>
          {t.hero.cta1}
          <Arrow />
        </Link>
        <Link className="btn btn-line" href={href(locale, '/services')}>
          {p.cta.secondary}
        </Link>
      </CtaBand>
    </>
  );
}
