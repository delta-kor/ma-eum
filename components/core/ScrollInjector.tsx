'use client';

import useHistory from '@/hooks/history';
import { useEffect } from 'react';

export default function ScrollInjector() {
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, history.scroll);
  }, []);

  return null;
}
