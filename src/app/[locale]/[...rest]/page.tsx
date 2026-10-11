import { notFound } from 'next/navigation';

/** Any unknown path under a locale renders the localized 404 page. */
export async function generateStaticParams() {
  return [{ rest: ['404'] }];
}

export default function CatchAll() {
  notFound();
}
