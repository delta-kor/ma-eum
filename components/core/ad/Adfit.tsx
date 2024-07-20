'use client';

import { useEffect, useRef } from 'react';

interface Props {
  height: string;
  unit: string;
  width: string;
}

export default function Adfit({ height, unit, width }: Props) {
  const insRef = useRef<HTMLModElement>();
  const scriptRef = useRef<HTMLScriptElement>();

  useEffect(() => {
    loadAd();

    return () => {
      const ins = insRef.current;
      const script = scriptRef.current;

      ins?.remove();
      script?.remove();
    };
  }, []);

  useEffect(() => {
    const ins = insRef.current;
    const script = scriptRef.current;

    if (!ins || !script) return;

    ins.remove();
    script.remove();

    loadAd();
  }, [unit]);

  const loadAd = () => {
    const ins = document.createElement('ins');
    const script = document.createElement('script');

    ins.className = 'kakao_ad_area';
    ins.style.display = 'none;';

    ins.setAttribute('data-ad-width', width);
    ins.setAttribute('data-ad-height', height);
    ins.setAttribute('data-ad-unit', unit);

    script.async = true;
    script.type = 'text/javascript';
    script.src = '//t1.daumcdn.net/kas/static/ba.min.js';

    insRef.current = ins;
    scriptRef.current = script;

    document.querySelector('.adfit')?.appendChild(ins);
    document.querySelector('.adfit')?.appendChild(script);
  };

  return <aside className="adfit"></aside>;
}
