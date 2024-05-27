'use client';

import { usePathname } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

interface Props {
  children: ReactNode;
}

export default function DetailsContent({ children }: Props) {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo(0, -1);
  }, [pathname]);

  return <div className="pt-[56px]">{children}</div>;
}
