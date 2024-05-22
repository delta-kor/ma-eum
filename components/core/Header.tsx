'use client';

import ArtisticText from '@/components/core/ArtisticText';

export default function Header() {
  return (
    <div className="flex items-center justify-between p-24">
      <ArtisticText type="maeum" className="h-24" />
    </div>
  );
}
