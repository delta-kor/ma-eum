'use client';

import useSafeSearchParams from '@/hooks/safe-search-params';
import { HTMLProps, MouseEvent } from 'react';

interface Props extends HTMLProps<HTMLAnchorElement> {
  href: string;
  replace?: boolean;
  scroll?: boolean;
}

export default function SoftLink({ href, replace, scroll, children, ...props }: Props) {
  const { update } = useSafeSearchParams();

  function handleClick(e: MouseEvent) {
    e.preventDefault();

    if (replace) {
      window.history.replaceState(null, '', href);
      update();
    } else window.history.pushState(null, '', href);

    if (scroll) window.scrollTo(0, 0);
  }

  return (
    <a href={href} {...props} onClick={handleClick}>
      {children}
    </a>
  );
}
