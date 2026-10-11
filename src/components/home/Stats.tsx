'use client';

import { useEffect, useRef } from 'react';

/**
 * Counters that run up once when scrolled into view.
 * The final numbers are rendered on the server, so they read correctly without JavaScript.
 */
export function Stats({ items, label }: { items: { value: number; suffix: string; label: string }[]; label: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || !('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (root.getBoundingClientRect().top < window.innerHeight) return; // already on screen

    const nodes = Array.from(root.querySelectorAll<HTMLElement>('[data-to]'));
    const render = (p: number) =>
      nodes.forEach((n) => {
        n.textContent = Math.round(Number(n.dataset.to) * p) + (n.dataset.suffix ?? '');
      });
    render(0);

    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        const t0 = performance.now();
        const step = (now: number) => {
          const p = Math.min(1, (now - t0) / 1600);
          render(1 - Math.pow(1 - p, 3));
          if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.35 },
    );
    io.observe(root);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      render(1);
    };
  }, []);

  return (
    <section className="stats-band dark-zone" aria-label={label}>
      <div className="wrap stats" ref={ref}>
        {items.map((x) => (
          <div className="stat" key={x.label}>
            <span className="v gold-text" data-to={x.value} data-suffix={x.suffix}>
              {x.value}
              {x.suffix}
            </span>
            <span className="l">{x.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
