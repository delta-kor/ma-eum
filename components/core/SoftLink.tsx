'use client';

import { HTMLProps, MouseEvent } from 'react';

interface Props extends HTMLProps<HTMLAnchorElement> {
  href: string;
  replace?: boolean;
}

export default function SoftLink({ href, replace, children, ...props }: Props) {
  function handleClick(e: MouseEvent) {
    e.preventDefault();
    if (replace) window.history.replaceState(null, '', href);
    else window.history.pushState(null, '', href);
  }

  return (
    <a href={href} {...props} onClick={handleClick}>
      {children}
    </a>
  );
}
