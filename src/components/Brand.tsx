/**
 * The RD badge is a stand-in drawn in the design. Swap it for the supplied logo file;
 * keep the same sizes (48 header, 38 sticky header).
 */

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

export function Badge({ className = 'badge' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 120" aria-hidden="true">
      <circle cx="60" cy="60" r="59" className="b-bg" />
      <circle cx="60" cy="60" r="55" className="b-ring" />
      <circle cx="60" cy="60" r="50" className="b-ring2" />
      <text x="60" y="76" className="b-txt">
        RD
      </text>
    </svg>
  );
}

export function QuoteMark() {
  return (
    <svg className="qmark dir-ic" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 18v-5c0-4 2.4-7 6-8l1 2c-2 .8-3.2 2.4-3.4 4.5H10V18zm10 0v-5c0-4 2.4-7 6-8l1 2c-2 .8-3.2 2.4-3.4 4.5H20V18z" />
    </svg>
  );
}
