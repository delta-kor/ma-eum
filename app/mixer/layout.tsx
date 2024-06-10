import BackgroundInjector from '@/components/mixer/BackgroundInjector';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function MixerLayout({ children }: Props) {
  return (
    <>
      <BackgroundInjector />
      {children}
    </>
  );
}
