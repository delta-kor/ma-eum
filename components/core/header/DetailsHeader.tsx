'use client';

import Icon from '@/components/core/Icon';
import { usePathname, useRouter } from 'next/navigation';

export default function DetailsHeader() {
  const pathname = usePathname();
  const router = useRouter();

  function handleBackClick() {
    router.back();
  }

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
    <div className="fixed left-0 top-0 z-50 w-full items-center bg-white py-16">
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
