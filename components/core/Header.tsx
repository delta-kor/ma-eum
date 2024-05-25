'use client';

import ArtisticText from '@/components/core/ArtisticText';
import Icon from '@/components/core/Icon';
import { usePathname, useRouter } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  function handleBackClick() {
    router.back();
  }

  if (pathname === '/')
    return (
      <div className="fixed left-0 top-0 z-50 flex w-full items-center justify-between p-24">
        <ArtisticText type="maeum" className="h-24 text-white" />
        <Icon type="search" className="w-24 cursor-pointer text-white" />
      </div>
    );

  let title: string;
  switch (pathname) {
    case '/videos':
      title = 'Videos';
      break;
    case '/musics':
      title = 'Musics';
      break;
    case '/photocards':
      title = 'Photocards';
      break;
    default:
      return null;
  }

  return (
    <div className="sticky left-0 top-0 z-50 w-full items-center bg-white py-16">
      <div
        onClick={handleBackClick}
        className="absolute left-16 top-1/2 -translate-y-1/2 cursor-pointer p-8 "
      >
        <Icon type="left" className="w-16 text-gray-200" />
      </div>
      <div className="text-center text-20 font-700 text-black">{title}</div>
    </div>
  );
}
