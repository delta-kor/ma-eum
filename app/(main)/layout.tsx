import Transistor from '@/components/core/Transitor';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function MainLayout({ children }: Props) {
  return <Transistor>{children}</Transistor>;
}
