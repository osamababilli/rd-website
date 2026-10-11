/** Placeholder project thumbnails from the design. Replace with real screenshots (next/image) when available. */

export type ArtKind =
  | 'branding'
  | 'web'
  | 'apps'
  | 'systems'
  | 'ads'
  | 'video'
  | 'web-corp'
  | 'web-landing'
  | 'cs-home'
  | 'cs-product'
  | 'cs-checkout';

export function WorkArt({ kind }: { kind: ArtKind }) {
  switch (kind) {
    case 'branding':
      return (
        <svg className="tart" viewBox="0 0 240 150" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          <circle cx="96" cy="75" r="42" className="s" />
          <circle cx="96" cy="75" r="34" className="s2" />
          <text x="96" y="86" className="tx">Aa</text>
          <rect x="152" y="44" width="40" height="18" rx="4" className="f" />
          <rect x="152" y="66" width="40" height="18" rx="4" className="p" />
          <rect x="152" y="88" width="40" height="18" rx="4" className="f1" />
        </svg>
      );
    case 'web':
      return (
        <svg className="tart" viewBox="0 0 240 150" aria-hidden="true">
          <rect x="36" y="20" width="168" height="110" rx="8" className="p" />
          <circle cx="48" cy="31" r="2.5" className="f" />
          <circle cx="57" cy="31" r="2.5" className="f2" />
          <circle cx="66" cy="31" r="2.5" className="f2" />
          <rect x="50" y="52" width="86" height="10" rx="5" className="f1" />
          <rect x="50" y="68" width="62" height="6" rx="3" className="f2" />
          <rect x="50" y="80" width="70" height="6" rx="3" className="f2" />
          <rect x="50" y="98" width="46" height="16" rx="8" className="f" />
          <rect x="146" y="50" width="44" height="64" rx="6" className="f2" />
        </svg>
      );
    case 'apps':
      return (
        <svg className="tart" viewBox="0 0 240 150" aria-hidden="true">
          <rect x="78" y="14" width="56" height="122" rx="12" className="p" />
          <rect x="88" y="34" width="36" height="6" rx="3" className="f1" />
          <rect x="88" y="48" width="36" height="34" rx="6" className="f2" />
          <rect x="88" y="90" width="36" height="12" rx="6" className="f" />
          <rect x="122" y="28" width="56" height="112" rx="12" className="p" />
          <circle cx="150" cy="62" r="14" className="s" />
          <rect x="134" y="88" width="32" height="5" rx="2.5" className="f2" />
          <rect x="134" y="98" width="24" height="5" rx="2.5" className="f2" />
        </svg>
      );
    case 'systems':
      return (
        <svg className="tart" viewBox="0 0 240 150" aria-hidden="true">
          <rect x="30" y="18" width="180" height="114" rx="8" className="p" />
          <rect x="30" y="18" width="38" height="114" rx="8" className="f2" />
          <rect x="40" y="32" width="18" height="4" rx="2" className="f" />
          <rect x="40" y="44" width="18" height="4" rx="2" className="f2" />
          <rect x="40" y="56" width="18" height="4" rx="2" className="f2" />
          <rect x="80" y="30" width="56" height="26" rx="5" className="f2" />
          <rect x="142" y="30" width="56" height="26" rx="5" className="f2" />
          <rect x="84" y="96" width="12" height="24" rx="2" className="f2" />
          <rect x="102" y="84" width="12" height="36" rx="2" className="f" />
          <rect x="120" y="90" width="12" height="30" rx="2" className="f2" />
          <rect x="138" y="72" width="12" height="48" rx="2" className="f1" />
          <rect x="156" y="80" width="12" height="40" rx="2" className="f2" />
          <rect x="174" y="66" width="12" height="54" rx="2" className="f" />
        </svg>
      );
    case 'ads':
      return (
        <svg className="tart" viewBox="0 0 240 150" aria-hidden="true">
          <rect x="34" y="22" width="172" height="106" rx="10" className="p" />
          <path d="M50 108 82 90l28 6 34-32 46-20" className="s" />
          <path d="M174 42h16v16" className="s" />
          <circle cx="82" cy="90" r="3" className="f1" />
          <circle cx="110" cy="96" r="3" className="f1" />
          <circle cx="144" cy="64" r="3" className="f1" />
          <rect x="50" y="34" width="50" height="8" rx="4" className="f2" />
        </svg>
      );
    case 'video':
      return (
        <svg className="tart" viewBox="0 0 240 150" aria-hidden="true">
          <rect x="34" y="18" width="172" height="100" rx="10" className="p" />
          <circle cx="120" cy="68" r="22" className="f" />
          <path d="M113 57l18 11-18 11z" className="k" />
          <rect x="34" y="128" width="172" height="4" rx="2" className="f2" />
          <rect x="34" y="128" width="66" height="4" rx="2" className="f" />
          <circle cx="100" cy="130" r="5" className="f1" />
        </svg>
      );
    case 'web-corp':
      return (
        <svg className="tart" viewBox="0 0 240 150" aria-hidden="true">
          <rect x="30" y="20" width="180" height="110" rx="8" className="p" />
          <rect x="30" y="20" width="180" height="40" rx="8" className="f2" />
          <rect x="44" y="34" width="70" height="8" rx="4" className="f1" />
          <rect x="44" y="74" width="46" height="40" rx="6" className="f2" />
          <rect x="98" y="74" width="46" height="40" rx="6" className="f2" />
          <rect x="152" y="74" width="46" height="40" rx="6" className="f" />
        </svg>
      );
    case 'web-landing':
      return (
        <svg className="tart" viewBox="0 0 240 150" aria-hidden="true">
          <rect x="60" y="16" width="120" height="118" rx="8" className="p" />
          <rect x="76" y="32" width="88" height="12" rx="6" className="f1" />
          <rect x="86" y="50" width="68" height="6" rx="3" className="f2" />
          <rect x="76" y="66" width="88" height="34" rx="6" className="f2" />
          <rect x="92" y="108" width="56" height="16" rx="8" className="f" />
        </svg>
      );
    case 'cs-home':
      return (
        <svg className="tart" viewBox="0 0 240 200" aria-hidden="true">
          <rect x="24" y="20" width="192" height="160" rx="10" className="p" />
          <rect x="24" y="20" width="192" height="18" rx="9" className="f2" />
          <rect x="40" y="54" width="90" height="12" rx="6" className="f1" />
          <rect x="40" y="72" width="70" height="6" rx="3" className="f2" />
          <rect x="40" y="90" width="44" height="16" rx="8" className="f" />
          <rect x="140" y="50" width="60" height="70" rx="8" className="f2" />
          <rect x="40" y="132" width="50" height="36" rx="6" className="f2" />
          <rect x="96" y="132" width="50" height="36" rx="6" className="f2" />
          <rect x="152" y="132" width="50" height="36" rx="6" className="f2" />
        </svg>
      );
    case 'cs-product':
      return (
        <svg className="tart" viewBox="0 0 240 150" aria-hidden="true">
          <rect x="30" y="20" width="180" height="110" rx="8" className="p" />
          <rect x="44" y="34" width="70" height="82" rx="8" className="f2" />
          <rect x="126" y="38" width="66" height="10" rx="5" className="f1" />
          <rect x="126" y="56" width="40" height="6" rx="3" className="f2" />
          <circle cx="132" cy="76" r="5" className="f" />
          <circle cx="146" cy="76" r="5" className="f2" />
          <circle cx="160" cy="76" r="5" className="f2" />
          <rect x="126" y="96" width="66" height="16" rx="8" className="f" />
        </svg>
      );
    case 'cs-checkout':
      return (
        <svg className="tart" viewBox="0 0 240 150" aria-hidden="true">
          <rect x="62" y="12" width="56" height="126" rx="12" className="p" />
          <rect x="72" y="30" width="36" height="8" rx="4" className="f1" />
          <rect x="72" y="46" width="36" height="30" rx="5" className="f2" />
          <rect x="72" y="104" width="36" height="14" rx="7" className="f" />
          <rect x="126" y="12" width="56" height="126" rx="12" className="p" />
          <circle cx="154" cy="56" r="14" className="s" />
          <path d="m147 56 5 5 9-10" className="s" />
          <rect x="138" y="84" width="32" height="6" rx="3" className="f2" />
        </svg>
      );
  }
}
