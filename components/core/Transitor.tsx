'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function Transistor({ children }: Props) {
  const pathname = usePathname();

  return children;

  // return (
  //   <div key={pathname} className="animate-fade">
  //     {children}
  //   </div>
  // );
}
