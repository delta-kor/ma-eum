import CmsNavigator from '@/components/cms/CmsNavigator';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function AdminLayout({ children }: Props) {
  return (
    <div className="flex flex-col gap-32 px-24 pt-24">
      <CmsNavigator />
      {children}
    </div>
  );
}
