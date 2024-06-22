import { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

export default function VideosLayout({ children }: Props) {
  return <>{children}</>;
}
