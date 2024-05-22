'use client';

import ArtisticText from '@/components/core/ArtisticText';
import Icon from '@/components/core/Icon';

export default function Header() {
  return (
    <div className="flex items-center justify-between bg-black p-24">
      <ArtisticText type="maeum" className="h-24" />
      <Icon type="search" className="w-24 text-primary-500" />
    </div>
  );
}
