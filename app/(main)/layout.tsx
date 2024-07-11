import Transistor from '@/components/core/Transitor';
import ModalFrame from '@/components/core/modal/ModalFrame';
import HistoryProvider from '@/providers/HistoryProvider';
import ModalProvider from '@/providers/ModalProvider';
import SafeSearchParamsProvider from '@/providers/SafeSearchParamsProvider';
import TitleProvider from '@/providers/TitleProvider';
import MetaUtil from '@/utils/meta.util';
import { Metadata } from 'next';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <TitleProvider>
      <ModalProvider>
        <SafeSearchParamsProvider>
          <HistoryProvider>
            <Transistor>{children}</Transistor>
          </HistoryProvider>
        </SafeSearchParamsProvider>
        <ModalFrame />
      </ModalProvider>
    </TitleProvider>
  );
}

export function generateMetadata(): Metadata {
  return MetaUtil.getBase();
}
