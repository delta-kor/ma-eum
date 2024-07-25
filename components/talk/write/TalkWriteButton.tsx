'use client';

import Icon from '@/components/core/Icon';
import Translate from '@/components/core/Translate';
import useModal from '@/hooks/modal';
import TalkUtil from '@/utils/talk.util';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface Props {
  login: boolean;
}

export default function TalkWriteButton({ login }: Props) {
  const modal = useModal();
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/talk/write');
  }, []);

  function handleClick() {
    TalkUtil.checkLogin({
      action: handleAction,
      login,
      modal,
    });
  }

  function handleAction() {
    router.push('/talk/write');
  }

  return (
    <div
      onClick={handleClick}
      className="jelly flex cursor-pointer items-center gap-8 rounded-8 bg-gradient-primary px-16 py-8 hover:scale-105"
    >
      <Icon type="pencil" className="w-14 shrink-0 text-white" />
      <div className="text-16 font-600 text-white">
        <Translate>$write_article</Translate>
      </div>
    </div>
  );
}
