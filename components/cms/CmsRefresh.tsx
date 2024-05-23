'use client';

import CmsButton from '@/components/cms/CmsButton';
import { revalidate } from '@/services/revalidate';

interface Props {
  path: string;
}

export default function CmsRefresh({ path }: Props) {
  async function handleClick() {
    await revalidate(path);
  }

  return <CmsButton onClick={handleClick}>Refresh</CmsButton>;
}
