import Header from '@/components/core/Header';
import Navigator from '@/components/core/Navigator';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function StemLayout({ children }: Props) {
  return (
    <div className="pb-[69px]">
      <Header />
      {children}
      <Navigator />
    </div>
  );
}
