import Link from 'next/link';
import { Arrow } from '@/components/Icon';
import { getDictionary, getLocale } from '@/i18n/get-dictionary';
import { href } from '@/lib/paths';

export default async function NotFound() {
  const [locale, t] = await Promise.all([getLocale(), getDictionary()]);
  return (
    <section className="wrap nf">
      <div>
        <div className="code gold-text">404</div>
        <h1>{t.notFound.title}</h1>
        <p>{t.notFound.text}</p>
        <Link className="btn btn-gold" href={href(locale)}>
          {t.notFound.back}
          <Arrow />
        </Link>
      </div>
    </section>
  );
}
