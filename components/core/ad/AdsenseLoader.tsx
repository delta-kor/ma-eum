'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function AdsenseLoader() {
  const pathname = usePathname();

  useEffect(() => {
    // renderAds();
  }, []);

  function renderAds() {
    // @ts-ignore
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }

  return null;
}
