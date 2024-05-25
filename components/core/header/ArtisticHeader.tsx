'use client';

import ArtisticText from '@/components/core/ArtisticText';
import Icon from '@/components/core/Icon';
import { usePathname } from 'next/navigation';

export default function ArtisticHeader() {
  const pathname = usePathname();

  if (pathname === '/')
    return (
      <div className="fixed left-0 top-0 z-50 flex w-full items-center justify-between p-24">
        <ArtisticText type="maeum" className="h-24 text-white" />
        <Icon type="search" className="w-24 cursor-pointer text-white" />
      </div>
    );

  return null;
}
