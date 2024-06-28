'use client';

import useHistory from '@/hooks/history';
import { usePathname } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

interface Props {
  children?: ReactNode;
}

export default function DetailsContent({ children }: Props) {
  const pathname = usePathname();
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, history.scroll);
  }, [pathname]);

  return (
    <div className="pt-details-header-height lgx:pt-artistic-header-height-lg">{children}</div>
  );
}
