import type { ReactNode } from 'react';

/** Stroke icons drawn for the design (24×24, currentColor). */
const PATHS = {
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowBack: <path d="M19 12H5M11 6l-6 6 6 6" />,
  chevron: <path d="m9 6 6 6-6 6" />,
  chevronBack: <path d="m15 6-6 6 6 6" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" />
    </>
  ),
  moon: <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  plus: <path d="M12 5v14M5 12h14" />,
  alert: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5v5.5M12 16.5v.01" />
    </>
  ),
  exclaim: <path d="M12 7v6M12 16.5v.01" />,
  user: (
    <>
      <circle cx="12" cy="8.5" r="4" />
      <path d="M4 20.5a8 8 0 0 1 16 0" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M3.5 20.5l1.3-4.4A8.5 8.5 0 1 1 8 19.3z" />
      <path d="M9 8.2c-.4.3-.8 1-.5 2 .6 2 2.6 4 4.7 4.6 1 .3 1.6-.1 2-.5l.4-.9-1.9-1-.8.9c-.9-.4-1.9-1.4-2.3-2.3l.9-.8-1-1.9z" />
    </>
  ),
  chat: <path d="M3.5 20.5l1.3-4.4A8.5 8.5 0 1 1 8 19.3z" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
    </>
  ),
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />,
  pin: (
    <>
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  box: (
    <>
      <path d="M20 7 12 3 4 7v10l8 4 8-4z" />
      <path d="m4 7 8 4 8-4M12 11v10" />
    </>
  ),

  /* services */
  mkt: (
    <>
      <circle cx="11" cy="13" r="8" />
      <circle cx="11" cy="13" r="4" />
      <path d="M11 13 20 4M16 4h4v4" />
    </>
  ),
  ads: (
    <>
      <path d="M3 10v4a1 1 0 0 0 1 1h3l6 4V5L7 9H4a1 1 0 0 0-1 1z" />
      <path d="M17 8.5a5 5 0 0 1 0 7M19.5 6a8.5 8.5 0 0 1 0 12" />
    </>
  ),
  design: (
    <>
      <path d="M5 19c4-1 5.5-4.5 7-7s3.5-6 7-7" />
      <rect x="2.5" y="17.5" width="4" height="4" rx="1" />
      <rect x="17.5" y="2.5" width="4" height="4" rx="1" />
      <circle cx="12" cy="12" r="2" />
      <path d="M4.5 4.5h7M12.5 19.5h7" />
    </>
  ),
  web: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 8.5h18M9.5 12.5 7.5 14.5l2 2M14.5 12.5l2 2-2 2" />
    </>
  ),
  app: (
    <>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
      <path d="M10.5 18.5h3M9.5 7.5h5M9.5 11h3" />
    </>
  ),
  sys: (
    <>
      <rect x="3" y="3" width="7.5" height="9" rx="1.5" />
      <rect x="13.5" y="3" width="7.5" height="5" rx="1.5" />
      <rect x="13.5" y="11" width="7.5" height="10" rx="1.5" />
      <rect x="3" y="15" width="7.5" height="6" rx="1.5" />
    </>
  ),
  video: (
    <>
      <rect x="2.5" y="5" width="14.5" height="14" rx="2" />
      <path d="m17 10 4.5-2.5v9L17 14" />
      <path d="m8 9.5 4.5 2.5L8 14.5z" />
    </>
  ),

  /* why / values */
  team: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
      <path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14.5a6.5 6.5 0 0 1 3.5 5.5" />
    </>
  ),
  code: <path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z" />
    </>
  ),
  bolt: <path d="M13 2 4 14h7l-1 8 9-12h-7z" />,
  tag: (
    <>
      <path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9z" />
      <circle cx="7.5" cy="7.5" r="1.5" />
    </>
  ),
  support: (
    <>
      <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
      <rect x="3" y="13" width="4" height="6" rx="1.5" />
      <rect x="17" y="13" width="4" height="6" rx="1.5" />
      <path d="M19 19c0 1.5-2 2.5-5 2.5" />
    </>
  ),
  eye: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M2.5 12S6 5 12 5s9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7z" />
    </>
  ),
  star: <path d="m12 3 2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.6 6.6 19.5l1.2-6-4.5-4.2 6.1-.7z" />,

  /* engagement models */
  chart: <path d="M4 20h16M6 16V9M10 16V5M14 16v-6M18 16V8" />,
  repeat: (
    <>
      <path d="M21 12a9 9 0 1 1-3-6.7" />
      <path d="M21 4v5h-5" />
    </>
  ),
  bundle: (
    <>
      <rect x="3" y="3" width="7.5" height="7.5" rx="1.5" />
      <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5" />
      <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5" />
      <path d="M17.25 14v6.5M14 17.25h6.5" />
    </>
  ),

  /* website page */
  building: <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6M9 10h.01M15 10h.01" />,
  cart: (
    <>
      <path d="M3 4h2l2.4 11.2a1 1 0 0 0 1 .8h8.9a1 1 0 0 0 1-.8L20 8H6.2" />
      <circle cx="9" cy="20" r="1.3" />
      <circle cx="17" cy="20" r="1.3" />
    </>
  ),

  /* case study */
  warning: (
    <>
      <path d="M12 3 2.5 20h19z" />
      <path d="M12 10v4M12 17v.01" />
    </>
  ),
  bulb: <path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.4 1 1.1 1 1.8V16h5v-.3c0-.7.4-1.4 1-1.8A6 6 0 0 0 12 3z" />,

  /* social */
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r=".6" />
    </>
  ),
  linkedin: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
      <path d="M8 10.5v6M8 7.5v.01M11.5 16.5v-6M11.5 13a2.5 2.5 0 0 1 5 0v3.5" />
    </>
  ),
  tiktok: <path d="M14 3.5v11a3.5 3.5 0 1 1-3.5-3.5M14 3.5c.5 2.6 2.4 4.4 5 4.6" />,
  youtube: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="m10 9.5 5 2.5-5 2.5z" />
    </>
  ),
  facebook: (
    <path d="M14.5 21v-7.5h3l.5-3.5h-3.5V8c0-1 .4-1.6 1.7-1.6h1.9V3.3a22 22 0 0 0-2.7-.2c-2.7 0-4.4 1.6-4.4 4.6V10h-3v3.5h3V21" />
  ),

  /* placeholder client logos */
  logo1: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4" />
    </>
  ),
  logo2: <path d="M12 3 21 20H3z" />,
  logo3: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="M4 12h16" />
    </>
  ),
  logo4: <path d="M12 2.5 20.5 7v10L12 21.5 3.5 17V7z" />,
  logo5: <path d="M3 12c3-6 6-6 9 0s6 6 9 0" />,
  logo6: <path d="M12 3l9 9-9 9-9-9z" />,
} satisfies Record<string, ReactNode>;

export type IconName = keyof typeof PATHS;

export function Icon({ name, className, label }: { name: IconName; className?: string; label?: string }) {
  return (
    <svg
      className={className ? `ico ${className}` : 'ico'}
      viewBox="0 0 24 24"
      {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true })}
    >
      {PATHS[name]}
    </svg>
  );
}

/** The arrow used on CTAs; flips in RTL. */
export const Arrow = ({ className = '' }: { className?: string }) => <Icon name="arrow" className={`dir-ic ${className}`.trim()} />;
