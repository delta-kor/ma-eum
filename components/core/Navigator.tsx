'use client';

import Icon from '@/components/core/Icon';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigator() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 flex w-full items-center justify-evenly border-t-1 border-gray-100 bg-white px-24 py-2">
      <Link
        data-active={pathname === '/'}
        href={`/`}
        className="jelly jelly-increased flex min-w-[70px] basis-0 cursor-pointer flex-col items-center gap-4 rounded-8 p-10 text-gray-200 data-[active=true]:text-primary-500 selected:bg-gray-50 selected:text-gray-300"
      >
        <Icon type="home" className="h-20" />
        <div className="text-12 font-600">Home</div>
      </Link>
      <Link
        data-active={pathname === '/discover'}
        href={`/discover`}
        className="jelly jelly-increased flex min-w-[70px] basis-0 cursor-pointer flex-col items-center gap-4 rounded-8 p-10 text-gray-200 data-[active=true]:text-primary-500 selected:bg-gray-50 selected:text-gray-300"
      >
        <Icon type="discover" className="h-20" />
        <div className="text-12 font-600">Discover</div>
      </Link>
      <Link
        data-active={pathname === '/talk'}
        href={`/talk`}
        className="jelly jelly-increased flex min-w-[70px] basis-0 cursor-pointer flex-col items-center gap-4 rounded-8 p-10 text-gray-200 data-[active=true]:text-primary-500 selected:bg-gray-50 selected:text-gray-300"
      >
        <Icon type="talk" className="h-20" />
        <div className="text-12 font-600">Talk</div>
      </Link>
      <Link
        data-active={pathname === '/spark'}
        href={`/spark`}
        className="jelly jelly-increased flex min-w-[70px] basis-0 cursor-pointer flex-col items-center gap-4 rounded-8 p-10 text-gray-200 data-[active=true]:text-primary-500 selected:bg-gray-50 selected:text-gray-300"
      >
        <Icon type="spark" className="h-20" />
        <div className="text-12 font-600">Spark</div>
      </Link>
    </div>
  );
}
