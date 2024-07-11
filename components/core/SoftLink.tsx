'use client';

import { HTMLProps, MouseEvent } from 'react';

interface Props extends HTMLProps<HTMLAnchorElement> {
  href: string;
  replace?: boolean;
  scroll?: boolean;
}

export default function SoftLink({ href, replace, scroll, children, ...props }: Props) {
  function handleClick(e: MouseEvent) {
    e.preventDefault();

    if (replace) window.history.replaceState(null, '', href);
    else window.history.pushState(null, '', href);

    if (scroll) window.scrollTo(0, 0);
  }

  return (
    <a href={href} {...props} onClick={handleClick}>
      {children}
    </a>
  );
}
