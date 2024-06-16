'use client';

import ArtisticText from '@/components/core/ArtisticText';
import Icon from '@/components/core/Icon';
import Pc from '@/components/core/responsive/Pc';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ArtisticHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [isFloating, setIsFloating] = useState(pathname !== '/');

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  function handleScroll() {
    const top = window.scrollY;
    if (pathname !== '/') return setIsFloating(true);
    setIsFloating(top > 30);
  }

  function handlePush(path: string) {
    router.push(path);
  }

  const isDisplayedOnMobile = ['/', '/discover', '/mixer'].includes(pathname);
  const isExpanded = pathname.startsWith('/video/');

  return (
    <div
      data-expanded={isExpanded}
      data-floating={isFloating}
      data-mobile={isDisplayedOnMobile}
      className="group fixed left-1/2 top-0 z-50 w-full max-w-screen-lgx -translate-x-1/2 p-24 text-white transition-all data-[mobile=false]:hidden data-[expanded=true]:max-w-screen-xlgx data-[floating=true]:bg-gray-50/80 data-[floating=true]:py-20 data-[floating=true]:text-black data-[floating=true]:backdrop-blur-lg data-[expanded=true]:lg:block lgx:rounded-full data-[expanded=true]:lgx:!top-16 data-[floating=true]:lgx:top-8 data-[mobile=false]:lgx:block data-[expanded=true]:lgx:w-artistic-header-expanded-width-lg data-[floating=true]:lgx:px-28 data-[floating=true]:lgx:py-16 data-[expanded=true]:xlgx:w-full"
    >
      <div className="flex items-center justify-between lg:mx-auto lg:max-w-screen-lg group-data-[expanded=true]:lg:max-w-screen-xl">
        <div className="flex items-center gap-48">
          <ArtisticText
            type="maeum"
            onClick={() => handlePush('/')}
            className="h-24 cursor-pointer transition-all group-data-[floating=true]:h-20 group-data-[floating=true]:text-primary-500"
          />
          <Pc>
            <div className="flex items-center gap-24">
              <div
                data-active={pathname === '/'}
                onClick={() => handlePush('/')}
                className="cursor-pointer text-20 font-500 opacity-60 transition-all data-[active=true]:font-700 data-[active=true]:opacity-100 group-data-[floating=true]:text-16"
              >
                Home
              </div>
              <div
                data-active={pathname === '/discover'}
                onClick={() => handlePush('/discover')}
                className="cursor-pointer text-20 font-500 opacity-60 transition-all data-[active=true]:font-700 data-[active=true]:opacity-100 group-data-[floating=true]:text-16"
              >
                Discover
              </div>
              <div
                data-active={pathname === '/mixer'}
                onClick={() => handlePush('/mixer')}
                className="cursor-pointer text-20 font-500 opacity-60 transition-all data-[active=true]:font-700 data-[active=true]:opacity-100 group-data-[floating=true]:text-16"
              >
                Stage Mixer
              </div>
            </div>
          </Pc>
        </div>
        <Icon
          type="search"
          className="w-24 cursor-pointer transition-all group-data-[floating=true]:w-20 group-data-[floating=true]:text-gray-500"
        />
      </div>
    </div>
  );

  return null;
}
