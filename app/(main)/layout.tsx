import Transistor from '@/components/core/Transitor';
import HistoryProvider from '@/providers/HistoryProvider';
import TitleProvider from '@/providers/TitleProvider';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <TitleProvider>
      <HistoryProvider>
        <Transistor>{children}</Transistor>
      </HistoryProvider>
    </TitleProvider>
  );
}
