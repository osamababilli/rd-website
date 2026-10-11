import Link from 'next/link';
import type { ReactNode } from 'react';
import { Arrow, Icon } from './Icon';
import { Badge } from './Brand';
import { WorkArt, type ArtKind } from './WorkArt';

export function Crumbs({ items, label }: { items: { label: string; href?: string }[]; label: string }) {
  return (
    <nav aria-label={label}>
      <ol className="crumbs rise">
        {items.map((item, i) => (
          <li key={item.label}>
            {i > 0 && (
              <span aria-hidden="true">
                <Icon name="chevron" className="dir-ic" />
              </span>
            )}
            {item.href ? (
              <Link href={item.href}>{item.label}</Link>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Inner-page hero: breadcrumb, kicker, H1 with a gold tail, lead and optional art column. */
export function PageHero({
  id,
  crumbs,
  crumbLabel,
  kick,
  title,
  gold,
  lead,
  children,
  art,
  dark = true,
  short = false,
  narrow = false,
  grid = true,
  above,
}: {
  id: string;
  crumbs: { label: string; href?: string }[];
  crumbLabel: string;
  kick?: string;
  title: string;
  gold: string;
  lead: ReactNode;
  children?: ReactNode;
  art?: ReactNode;
  dark?: boolean;
  short?: boolean;
  narrow?: boolean;
  grid?: boolean;
  above?: ReactNode;
}) {
  const text = (
    <div>
      <Crumbs items={crumbs} label={crumbLabel} />
      {kick && <span className="kick rise">{kick}</span>}
      {above}
      <h1 className={`ph-t rise d1${narrow ? ' narrow' : ''}`} id={id}>
        {title} <span className="gold-text">{gold}</span>
      </h1>
      <p className="lead rise d2">{lead}</p>
      {children}
    </div>
  );
  return (
    <section className={`phero${dark ? ' dark-zone' : ''}${short ? ' short' : ''}`} aria-labelledby={id}>
      {grid && <div className="grid-bg" aria-hidden="true" />}
      <div className="glow" aria-hidden="true" />
      <div className={`wrap phero-in${art ? ' phero-split' : ''}`}>
        {text}
        {art}
      </div>
    </section>
  );
}

/** Placeholder shown while a slug page resolves during client navigation. */
export function PageFallback({ light }: { light?: boolean }) {
  return <section className={light ? 'phero' : 'phero dark-zone'} style={{ minHeight: '70vh' }} aria-busy="true" />;
}

export function SectionHead({
  id,
  kick,
  title,
  sub,
  center,
  flat,
  small,
  style,
}: {
  id?: string;
  kick: string;
  title: string;
  sub?: ReactNode;
  center?: boolean;
  flat?: boolean;
  small?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <div className={`sh reveal${center ? ' center' : ''}${flat ? ' flat' : ''}`} style={style}>
      <span className="kick">{kick}</span>
      <h2 className={`st${small ? ' sm' : ''}`} id={id}>
        {title}
      </h2>
      {sub && <p className="sd">{sub}</p>}
    </div>
  );
}

export function CtaBand({
  id,
  kick,
  t1,
  t2,
  sub,
  children,
  flush,
}: {
  id: string;
  kick: string;
  t1: string;
  t2: string;
  sub: string;
  children: ReactNode;
  flush?: boolean;
}) {
  return (
    <section className={`cta-sec${flush ? ' flush' : ''}`} aria-labelledby={id}>
      <div className="wrap">
        <div className="cta-band dark-zone">
          <div>
            <span className="kick">{kick}</span>
            <h2 id={id}>
              {t1} <span className="gold-text">{t2}</span>
            </h2>
            <p>{sub}</p>
            <div className="ctas">{children}</div>
          </div>
          <div className="cta-art" aria-hidden="true">
            <div className="ring r1">
              <span className="orb" />
            </div>
            <div className="ring r2" />
            <div className="ring r3" />
            <Badge />
          </div>
        </div>
      </div>
    </section>
  );
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="faq">
      {items.map((item, i) => (
        <details key={item.q} open={i === 0}>
          <summary>
            {item.q}
            <span className="pm" aria-hidden="true">
              <Icon name="plus" />
            </span>
          </summary>
          <p>{item.a}</p>
        </details>
      ))}
    </div>
  );
}

export function Steps({ items }: { items: { t: string; d: string }[] }) {
  return (
    <ol className="steps">
      {items.map((step, i) => (
        <li className="step reveal" key={step.t}>
          <span className="sdot">{String(i + 1).padStart(2, '0')}</span>
          <h3>{step.t}</h3>
          <p>{step.d}</p>
        </li>
      ))}
    </ol>
  );
}

export function CheckList({ items, one, icon = 'check' }: { items: string[]; one?: boolean; icon?: 'check' | 'exclaim' }) {
  return (
    <ul className={`bul${one ? ' one' : ''}`}>
      {items.map((b) => (
        <li key={b}>
          <span className="chk">
            <Icon name={icon} />
          </span>
          {b}
        </li>
      ))}
    </ul>
  );
}

/** Project card. Links to the case study when there is one; otherwise renders as a static card. */
export function WorkCard({
  art,
  tag,
  title,
  client,
  href,
  view,
  className = '',
}: {
  art: ArtKind;
  tag: string;
  title: string;
  client: string;
  href?: string;
  view: string;
  className?: string;
}) {
  const inner = (
    <>
      <div className="thumb">
        <WorkArt kind={art} />
      </div>
      <div className="wbody">
        <span className="wtag">{tag}</span>
        <h3>{title}</h3>
        <div className="wmeta">
          <span>{client}</span>
          {href && (
            <span className="more">
              {view}
              <Arrow />
            </span>
          )}
        </div>
      </div>
    </>
  );
  return href ? (
    <Link className={`card wcard ${className}`.trim()} href={href}>
      {inner}
    </Link>
  ) : (
    <article className={`card wcard ${className}`.trim()}>{inner}</article>
  );
}
