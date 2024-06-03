import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children?: ReactNode;
}

export default function Pc({ className, children, ...props }: Props) {
  return (
    <div className={`hidden lg:block ${className}`} {...props}>
      {children}
    </div>
  );
}
