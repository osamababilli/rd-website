'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon, type IconName } from '@/components/Icon';

const ITEMS: { href: string; label: string; icon: IconName }[] = [
  { href: '/admin', label: 'نظرة عامة', icon: 'chart' },
  { href: '/admin/leads', label: 'طلبات العملاء', icon: 'mail' },
  { href: '/admin/settings', label: 'إعدادات الموقع', icon: 'sys' },
];

export function AdminNav() {
  const path = usePathname() ?? '';
  return (
    <nav className="adm-nav" aria-label="لوحة التحكم">
      {ITEMS.map((item) => {
        const active = item.href === '/admin' ? path === '/admin' : path.startsWith(item.href);
        return (
          <Link key={item.href} href={item.href} className="adm-link" aria-current={active ? 'page' : undefined}>
            <Icon name={item.icon} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
