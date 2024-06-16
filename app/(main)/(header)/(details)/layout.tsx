import DetailsHeader from '@/components/core/header/DetailsHeader';
import { MobileX } from '@/components/core/responsive/Mobile';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function LeafLayout({ children }: Props) {
  return (
    <div>
      <MobileX>
        <DetailsHeader />
      </MobileX>
      {children}
    </div>
  );
}
