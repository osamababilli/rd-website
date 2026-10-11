/**
 * Static site identity. Contact details, social links and homepage numbers are edited
 * from the dashboard (/admin/settings) and read with getSettings() from src/lib/settings.ts.
 */
export const site = {
  name: 'RD Group',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://rdgrouptr.com',
};
