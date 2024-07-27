import Transistor from '@/components/core/Transitor';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function NeutralLayout({ children }: Props) {
  return <Transistor>{children}</Transistor>;
}
