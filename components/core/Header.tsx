'use client';

import ArtisticText from '@/components/core/ArtisticText';
import Icon from '@/components/core/Icon';

export default function Header() {
  return (
    <div className="fixed left-0 top-0 z-50 flex w-full items-center justify-between p-24">
      <ArtisticText type="maeum" className="h-24" />
      <Icon type="search" className="w-24 cursor-pointer text-white" />
    </div>
  );
}
