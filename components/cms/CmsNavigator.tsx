'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function CmsNavigator() {
  const pathname = usePathname();

  let title: string = 'CMS';

  if (pathname === '/cms') title = 'CMS';
  if (pathname === '/cms/albums') title = 'Albums';
  if (pathname === '/cms/categories') title = 'Categories';
  if (pathname === '/cms/musics') title = 'Musics';
  if (pathname === '/cms/videos') title = 'Videos';
  if (pathname === '/cms/schedules') title = 'Schedules';

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
        <Link href={'/cms/categories'} className="text-20 text-primary-500 underline">
          Categories
        </Link>
        <Link href={'/cms/musics'} className="text-20 text-primary-500 underline">
          Musics
        </Link>
        <Link href={'/cms/videos'} className="text-20 text-primary-500 underline">
          Videos
        </Link>
        <Link href={'/cms/schedules'} className="text-20 text-primary-500 underline">
          Schedules
        </Link>
      </div>
    </div>
  );
}
