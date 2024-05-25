import Navigator from '@/components/core/Navigator';
import ArtisticHeader from '@/components/core/header/ArtisticHeader';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function StemLayout({ children }: Props) {
  return (
    <div className="pb-[69px]">
      <ArtisticHeader />
      {children}
      <Navigator />
    </div>
  );
}
