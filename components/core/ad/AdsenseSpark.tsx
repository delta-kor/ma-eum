'use client';

import { useEffect } from 'react';

export default function AdsenseSpark() {
  useEffect(() => {
    process.env.NEXT_PUBLIC_ENABLE_ADSENSE === '1' && renderAd();
  }, []);

  function renderAd() {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {}
  }

  return (
    <ins
      data-ad-client="ca-pub-7478560982899387"
      data-ad-format="auto"
      data-ad-slot="1868836318"
      data-full-width-responsive="true"
      style={{ display: 'block', overflow: 'hidden' }}
      className="adsbygoogle aspect-square w-full lg:aspect-auto lg:max-h-[120px]"
    ></ins>
  );
}
