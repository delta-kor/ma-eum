'use client';

import useTitle from '@/hooks/title';
import { useEffect } from 'react';

interface Props {
  children: string;
}

export default function Title({ children }: Props) {
  const title = useTitle();

  useEffect(() => {
    title.setTitle(children);
  }, [children]);

  return null;
}
