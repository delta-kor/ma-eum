'use client';

import { revalidate } from '@/actions/revalidate';
import CmsButton from '@/components/cms/CmsButton';

interface Props {
  path: string;
}

export default function CmsRefresh({ path }: Props) {
  async function handleClick() {
    await revalidate(path);
  }

  return <CmsButton onClick={handleClick}>Refresh</CmsButton>;
}
