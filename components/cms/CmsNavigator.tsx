'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function CmsNavigator() {
  const pathname = usePathname();

  let title: string = 'CMS';

  if (pathname === '/cms') title = 'CMS';
  if (pathname === '/cms/albums') title = 'Albums';

  return (
    <div className="flex flex-col gap-12">
      <div className="text-32 font-700">{title}</div>
      <div className="flex gap-16">
        <Link href={'/'} className="text-20 text-primary-500 underline">
          Exit
        </Link>
        <Link href={'/cms'} className="text-20 text-primary-500 underline">
          Dashboard
        </Link>
        <Link href={'/cms/albums'} className="text-20 text-primary-500 underline">
          Albums
        </Link>
      </div>
    </div>
  );
}
