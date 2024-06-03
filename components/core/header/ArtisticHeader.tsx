'use client';

import ArtisticText from '@/components/core/ArtisticText';
import Icon from '@/components/core/Icon';
import { usePathname } from 'next/navigation';

export default function ArtisticHeader() {
  const pathname = usePathname();

  if (pathname === '/')
    return (
      <div className="fixed left-0 top-0 z-50 w-full">
        <div className="flex items-center justify-between p-24 lg:mx-auto lg:max-w-screen-lg lg:px-0">
          <ArtisticText type="maeum" className="h-24 text-white" />
          <Icon type="search" className="w-24 cursor-pointer text-white" />
        </div>
      </div>
    );

  return null;
}
