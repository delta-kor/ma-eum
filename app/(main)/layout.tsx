import Transistor from '@/components/core/Transitor';
import ArtisticHeader from '@/components/core/header/ArtisticHeader';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <Transistor>
      <ArtisticHeader />
      {children}
    </Transistor>
  );
}
