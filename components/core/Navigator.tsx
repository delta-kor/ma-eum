'use client';

import Icon from '@/components/core/Icon';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigator() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 flex w-full items-center justify-evenly border-t-1 border-gray-100 bg-white py-4">
      <Link
        data-active={pathname === '/'}
        href={'/'}
        className="cursor-pointer p-16 text-gray-200 data-[active=true]:text-primary-500"
      >
        <Icon type="home" className="h-28" />
      </Link>
      <Link
        data-active={pathname === '/discover'}
        href={'/discover'}
        className="cursor-pointer p-16 text-gray-200 data-[active=true]:text-primary-500"
      >
        <Icon type="discover" className="h-28" />
      </Link>
      <Link
        data-active={pathname === '/mixer'}
        href={'/mixer'}
        className="cursor-pointer p-16 text-gray-200 data-[active=true]:text-primary-500"
      >
        <Icon type="mix" className="h-28" />
      </Link>
    </div>
  );
}
