/**
 * Business details used across the site.
 * Values in [brackets] are placeholders from the design — replace them before launch.
 */
export const site = {
  name: 'RD Group',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://rdgrouptr.com',

  /** Shown as text. */
  phoneDisplay: '[+90 XXX XXX XX XX]',
  whatsappDisplay: '[+90 5XX XXX XX XX]',
  email: '[hello@rdgrouptr.com]',

  /** Used in links: digits only, with country code (e.g. 905321234567). */
  phoneHref: '',
  whatsappNumber: '',
  emailHref: '',

  /** Google Maps link for "Get directions". */
  mapsUrl: '',

  /** Replace with the agency's profile URLs. */
  social: {
    instagram: 'https://www.instagram.com/',
    linkedin: 'https://www.linkedin.com/',
    tiktok: 'https://www.tiktok.com/',
    youtube: 'https://www.youtube.com/',
    facebook: 'https://www.facebook.com/',
  },
};

export const whatsappHref = (text?: string) =>
  site.whatsappNumber
    ? `https://wa.me/${site.whatsappNumber}${text ? `?text=${encodeURIComponent(text)}` : ''}`
    : null;

export const telHref = () => (site.phoneHref ? `tel:+${site.phoneHref}` : null);
export const mailHref = () => (site.emailHref ? `mailto:${site.emailHref}` : null);
