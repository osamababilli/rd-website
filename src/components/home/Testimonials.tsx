'use client';

import { useState } from 'react';
import { QuoteMark } from '../Brand';
import { Icon } from '../Icon';

type Props = {
  head: { kick: string; title: string; sub: string };
  items: { q: string; n: string; r: string }[];
  labels: { prev: string; next: string; slide: string };
};

const pad = (n: number) => String(n).padStart(2, '0');

export function Testimonials({ head, items, labels }: Props) {
  const [i, setI] = useState(0);
  const n = items.length;
  const cur = items[i];

  return (
    <section className="sec" aria-labelledby="home-tst-t">
      <div className="wrap tst">
        <div className="sh flat reveal">
          <span className="kick">{head.kick}</span>
          <h2 className="st" id="home-tst-t">
            {head.title}
          </h2>
          <p className="sd">{head.sub}</p>
          <div className="tctl">
            <button type="button" className="icon-btn" aria-label={labels.prev} onClick={() => setI((i - 1 + n) % n)}>
              <Icon name="chevronBack" className="dir-ic" />
            </button>
            <button type="button" className="icon-btn" aria-label={labels.next} onClick={() => setI((i + 1) % n)}>
              <Icon name="chevron" className="dir-ic" />
            </button>
            <div className="dots">
              {items.map((_, k) => (
                <button
                  key={k}
                  type="button"
                  aria-label={`${labels.slide} ${k + 1}`}
                  aria-current={k === i ? 'true' : undefined}
                  onClick={() => setI(k)}
                >
                  <span />
                </button>
              ))}
            </div>
            <span className="tcount">
              {pad(i + 1)} / {pad(n)}
            </span>
          </div>
        </div>
        <figure className="card qcard reveal" aria-live="polite">
          <QuoteMark />
          <blockquote>{cur.q}</blockquote>
          <figcaption className="who">
            <span className="av">
              <Icon name="user" />
            </span>
            <span>
              <b>{cur.n}</b>
              <span>{cur.r}</span>
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
