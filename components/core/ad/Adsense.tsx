'use client';

import { useEffect } from 'react';

export default function Adsense() {
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
      data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
      data-ad-format="fluid"
      data-ad-layout="in-article"
      data-ad-slot="4181667710"
      style={{ display: 'block', overflow: 'hidden', textAlign: 'center' }}
      className="adsbygoogle"
    />
  );
}
