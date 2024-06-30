'use client';

import useHistory from '@/hooks/history';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function ScrollInjector() {
  const pathname = usePathname();
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, history.scroll);
  }, []);

  return null;
}
