import { Cairo, DM_Sans, IBM_Plex_Sans_Arabic, Poppins } from 'next/font/google';

const poppins = Poppins({ subsets: ['latin', 'latin-ext'], weight: ['500', '600', '700', '800'], variable: '--font-poppins', display: 'swap' });
const dmSans = DM_Sans({ subsets: ['latin', 'latin-ext'], variable: '--font-dm-sans', display: 'swap' });
const cairo = Cairo({ subsets: ['arabic', 'latin'], weight: ['600', '700', '800'], variable: '--font-cairo', display: 'swap' });
const plexArabic = IBM_Plex_Sans_Arabic({ subsets: ['arabic', 'latin'], weight: ['400', '500', '600'], variable: '--font-plex-arabic', display: 'swap' });

/** Class names that expose the font CSS variables used in globals.css. */
export const fontVariables = `${poppins.variable} ${dmSans.variable} ${cairo.variable} ${plexArabic.variable}`;

/** Runs before first paint: saved theme, else the OS preference (dark by default). */
export const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.setAttribute('data-theme',t)}catch(e){}})()`;
