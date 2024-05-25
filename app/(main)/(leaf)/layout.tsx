import DetailsHeader from '@/components/core/header/DetailsHeader';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function LeafLayout({ children }: Props) {
  return (
    <div className="mt-[56px]">
      <DetailsHeader />
      {children}
    </div>
  );
}
