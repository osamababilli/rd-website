'use client';

import { useState, type ReactNode } from 'react';
import { WORK_CATEGORIES, type WorkCategory } from '@/content/data';
import { WorkCard } from './Sections';

type Filter = 'all' | WorkCategory;

export type WorkItem = { slug: string; cat: WorkCategory; title: string; tag: string; href?: string };

type Props = {
  items: WorkItem[];
  labels: { f: Record<Filter, string>; filterLabel: string; client: string; view: string; count?: string };
  /** 'home': first 6 under "All", filters beside the heading. 'page': all projects, counts, first card featured. */
  variant: 'home' | 'page';
  head?: ReactNode;
};

export function WorkGrid({ items, labels, variant, head }: Props) {
  const [filter, setFilter] = useState<Filter>('all');
  const page = variant === 'page';

  const filtered = filter === 'all' ? items : items.filter((w) => w.cat === filter);
  const shown = !page && filter === 'all' ? filtered.slice(0, 6) : filtered;
  const cats: Filter[] = ['all', ...WORK_CATEGORIES];

  const filters = (
    <div className="filters" role="group" aria-label={labels.filterLabel}>
      {cats.map((k) => (
        <button key={k} type="button" className="fbtn" aria-pressed={k === filter} onClick={() => setFilter(k)}>
          {labels.f[k]}
          {page && <span className="fcount">{k === 'all' ? items.length : items.filter((w) => w.cat === k).length}</span>}
        </button>
      ))}
    </div>
  );

  return (
    <>
      {page ? (
        <div className="row-head" style={{ alignItems: 'center', marginBottom: 32 }}>
          {filters}
          {labels.count && (
            <span style={{ color: 'var(--muted)', fontSize: 15 }} aria-live="polite">
              {labels.count.replace('{n}', String(shown.length))}
            </span>
          )}
        </div>
      ) : (
        <div className="work-head">
          {head}
          {filters}
        </div>
      )}
      <div className="work-grid">
        {shown.map((w, i) => (
          <WorkCard
            key={w.slug}
            art={w.cat}
            tag={w.tag}
            title={w.title}
            client={labels.client}
            href={w.href}
            view={labels.view}
            className={page && filter === 'all' && i === 0 ? 'featured' : ''}
          />
        ))}
      </div>
    </>
  );
}
