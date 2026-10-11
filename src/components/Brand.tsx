import Image from 'next/image';
import badge from '@/assets/rd-badge.png';

/** Gold gradient referenced by the badge, the quote mark and other SVGs (url(#rdg)). Render once. */
export function GoldDefs() {
  return (
    <svg className="defs" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="rdg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F6EBA0" />
          <stop offset=".45" stopColor="#D4AF37" />
          <stop offset=".8" stopColor="#A67C1F" />
          <stop offset="1" stopColor="#E6CF7A" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/** The round RD Group badge from the official logo (decorative: links around it carry the label). */
export function Badge({ className = 'badge', priority = false }: { className?: string; priority?: boolean }) {
  return <Image className={className} src={badge} alt="" aria-hidden="true" sizes="(max-width: 960px) 180px, 230px" priority={priority} />;
}

export function QuoteMark() {
  return (
    <svg className="qmark dir-ic" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 18v-5c0-4 2.4-7 6-8l1 2c-2 .8-3.2 2.4-3.4 4.5H10V18zm10 0v-5c0-4 2.4-7 6-8l1 2c-2 .8-3.2 2.4-3.4 4.5H20V18z" />
    </svg>
  );
}
