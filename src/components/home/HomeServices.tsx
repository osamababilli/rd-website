'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import type { ServiceKey } from '@/content/data';
import { Arrow, Icon } from '../Icon';

type Item = { key: ServiceKey; num: string; title: string; short: string; desc: string; bullets: string[] };

type Props = {
  items: Item[];
  head: { kick: string; title: string; sub: string; more: string; ctaT: string; ctaD: string };
  detail: { kick: string; title: string; inc: string; cta: string };
  links: { quote: string; quoteLabel: string; work: string; workLabel: string };
};

/** Service cards (#services) and the tabbed service detail panel (#service-detail) share selection state. */
export function HomeServices({ items, head, detail, links }: Props) {
  const [sel, setSel] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const strip = useRef<HTMLDivElement>(null);
  const cur = items[sel];

  // On narrow screens the tabs scroll sideways: keep the selected one centred in the strip.
  useEffect(() => {
    const box = strip.current;
    const tab = tabs.current[sel];
    if (!box || !tab || box.scrollWidth <= box.clientWidth) return;
    const b = box.getBoundingClientRect();
    const r = tab.getBoundingClientRect();
    box.scrollBy({ left: r.left + r.width / 2 - (b.left + b.width / 2), behavior: 'smooth' });
  }, [sel]);

  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    const rtl = document.documentElement.dir === 'rtl';
    const step: Record<string, number> = { ArrowDown: 1, ArrowUp: -1, ArrowRight: rtl ? -1 : 1, ArrowLeft: rtl ? 1 : -1 };
    let next = sel;
    if (e.key in step) next = (sel + step[e.key] + items.length) % items.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = items.length - 1;
    else return;
    e.preventDefault();
    setSel(next);
    tabs.current[next]?.focus();
  };

  return (
    <>
      <section id="services" className="sec" aria-labelledby="home-svc-t">
        <div className="wrap">
          <div className="sh reveal">
            <span className="kick">{head.kick}</span>
            <h2 className="st" id="home-svc-t">
              {head.title}
            </h2>
            <p className="sd">{head.sub}</p>
          </div>
          <div className="svc-grid">
            {items.map((s, i) => (
              <article className="card hov svc-card reveal" key={s.key}>
                <span className="num">{s.num}</span>
                <div className="ic">
                  <Icon name={s.key} />
                </div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <a className="more" href="#service-detail" onClick={() => setSel(i)}>
                  {head.more}
                  <span className="sr-only">: {s.short}</span>
                  <Arrow />
                </a>
              </article>
            ))}
            <div className="svc-cta reveal">
              <div>
                <h3>{head.ctaT}</h3>
                <p>{head.ctaD}</p>
              </div>
              <Link className="btn btn-gold btn-sm" href={links.quote}>
                {links.quoteLabel}
                <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="service-detail" className="sec sec-alt" aria-labelledby="home-sd-t">
        <div className="wrap">
          <div className="sh reveal">
            <span className="kick">{detail.kick}</span>
            <h2 className="st" id="home-sd-t">
              {detail.title}
            </h2>
          </div>
          <div className="sdw">
            <div className="tabs" role="tablist" aria-label={detail.kick} ref={strip}>
              {items.map((s, i) => (
                <button
                  key={s.key}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`sd-tab-${i}`}
                  className="tab"
                  aria-selected={i === sel}
                  aria-controls="sd-panel"
                  tabIndex={i === sel ? 0 : -1}
                  onClick={() => setSel(i)}
                  onKeyDown={onKey}
                >
                  <span className="tn">{s.num}</span>
                  <span>{s.short}</span>
                </button>
              ))}
            </div>
            <div className="panel" role="tabpanel" id="sd-panel" aria-labelledby={`sd-tab-${sel}`}>
              <div>
                <span className="kick">{cur.num} / 07</span>
                <h3>{cur.title}</h3>
                <p>{cur.desc}</p>
                <p className="inc">{detail.inc}</p>
                <ul className="bul">
                  {cur.bullets.map((b) => (
                    <li key={b}>
                      <span className="chk">
                        <Icon name="check" />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="pact">
                  <Link className="btn btn-gold" href={links.quote}>
                    {detail.cta}
                    <Arrow />
                  </Link>
                  <a className="btn btn-line" href="#work">
                    {links.workLabel}
                  </a>
                </div>
              </div>
              <div className="panel-art" aria-hidden="true">
                <div className="ring r1">
                  <span className="orb" />
                </div>
                <div className="ring r2" />
                <div className="ring r3" />
                <span className="big gold-text">{cur.num}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
