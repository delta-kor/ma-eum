'use client';

import Icon from '@/components/core/Icon';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigator() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 flex w-full items-center justify-center justify-evenly border-t-1 border-gray-100 bg-white px-24 py-2">
      <Link
        data-active={pathname === '/'}
        href={'/'}
        className="flex basis-0 cursor-pointer flex-col gap-4 p-10 text-gray-200 data-[active=true]:text-primary-500"
      >
        <Icon type="home" className="h-20" />
        <div className="text-12 font-600">Home</div>
      </Link>
      <Link
        data-active={pathname === '/discover'}
        href={'/discover'}
        className="flex basis-0 cursor-pointer flex-col gap-4 p-10 text-gray-200 data-[active=true]:text-primary-500"
      >
        <Icon type="discover" className="h-20" />
        <div className="text-12 font-600">Discover</div>
      </Link>
      <Link
        data-active={pathname === '/mixer'}
        href={'/mixer'}
        className="flex basis-0 cursor-pointer flex-col gap-4 p-10 text-gray-200 data-[active=true]:text-primary-500"
      >
        <Icon type="mix" className="h-20" />
        <div className="text-12 font-600">Mixer</div>
      </Link>
    </div>
  );
}
