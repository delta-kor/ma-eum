import Navigator from '@/components/core/Navigator';
import Mobile from '@/components/core/responsive/Mobile';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function StemLayout({ children }: Props) {
  return (
    <div className="pb-[69px] lg:pb-0">
      {children}
      <Mobile>
        <Navigator />
      </Mobile>
    </div>
  );
}
