import ArtisticHeader from '@/components/core/header/ArtisticHeader';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <>
      <ArtisticHeader />
      {children}
    </>
  );
}
