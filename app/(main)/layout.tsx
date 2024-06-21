import Transistor from '@/components/core/Transitor';
import HistoryProvider from '@/providers/HistoryProvider';
import TitleProvider from '@/providers/TitleProvider';
import { ReactNode, Suspense } from 'react';

interface Props {
  children: ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <TitleProvider>
      <Suspense>
        <HistoryProvider>
          <Transistor>{children}</Transistor>
        </HistoryProvider>
      </Suspense>
    </TitleProvider>
  );
}
