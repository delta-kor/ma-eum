import CmsNavigator from '@/components/cms/CmsNavigator';
import Secure from '@/utils/secure.util';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function CmsLayout({ children }: Props) {
  if (!Secure.isAuthorized()) return notFound();

  return (
    <div className="flex flex-col gap-32 px-24 pt-24">
      <CmsNavigator />
      {children}
    </div>
  );
}
