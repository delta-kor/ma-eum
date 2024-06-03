'use client';

import ArtisticText from '@/components/core/ArtisticText';
import Icon from '@/components/core/Icon';
import Pc from '@/components/core/responsive/Pc';
import { usePathname } from 'next/navigation';

export default function ArtisticHeader() {
  const pathname = usePathname();

  if (pathname === '/')
    return (
      <div className="fixed left-0 top-0 z-50 w-full p-24">
        <div className="flex items-center justify-between lg:mx-auto lg:max-w-screen-lg">
          <div className="flex items-center gap-48">
            <ArtisticText type="maeum" className="h-24 text-white" />
            <Pc>
              <div className="!flex items-center gap-24">
                <div className="cursor-pointer text-20 font-700 text-white">Home</div>
                <div className="cursor-pointer text-20 font-500 text-white/70">Discover</div>
                <div className="cursor-pointer text-20 font-500 text-white/70">Settings</div>
              </div>
            </Pc>
          </div>
          <Icon type="search" className="w-24 cursor-pointer text-white" />
        </div>
      </div>
    );

  return null;
}
