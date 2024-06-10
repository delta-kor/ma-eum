'use client';

import Icon from '@/components/core/Icon';
import { useRouter } from 'next/navigation';

export default function MixerCloseIcon() {
  const router = useRouter();

  function handleClick() {
    const referrer = document.referrer;
    console.log(referrer);
    router.back();
  }

  return (
    <div onClick={handleClick} className="-m-16 cursor-pointer p-16">
      <Icon type="close" className="w-24 text-black/70" />
    </div>
  );
}
