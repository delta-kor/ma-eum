import Header from '@/components/core/Header';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function LeafLayout({ children }: Props) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
