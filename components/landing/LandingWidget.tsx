'use client';

import Icon from '@/components/core/Icon';
import { useEffect, useState } from 'react';

export default function LandingWidget() {
  const [day, setDay] = useState(0);

  useEffect(() => {
    const today = new Date();
    const debut = new Date(2022, 6, 27);
    const diff = today.getTime() - debut.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const day = Math.floor(diff / oneDay);
    setDay(day);
  }, []);

  return (
    <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 translate-y-1/2 items-center gap-12 rounded-16 bg-gradient-primary px-16 py-8 shadow-primary">
      <Icon type="csr" className="h-20 text-white" />
      <div className="text-22 font-700 text-white">D+{day}</div>
    </div>
  );
}
