import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children?: ReactNode;
}

export default function Mobile({ className, children, ...props }: Props) {
  return (
    <div className={`block lg:hidden ${className}`} {...props}>
      {children}
    </div>
  );
}

export function MobileX({ className, children, ...props }: Props) {
  return (
    <div className={`block lgx:hidden ${className}`} {...props}>
      {children}
    </div>
  );
}
