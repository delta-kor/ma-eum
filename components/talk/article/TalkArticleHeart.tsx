'use client';

import useModal from '@/hooks/modal';
import { trpc } from '@/hooks/trpc';
import TalkUtil from '@/utils/talk.util';
import { useRouter } from 'next/navigation';
import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  articleId: string;
  login: boolean;
}

export default function TalkArticleHeart({ articleId, login, children, ...props }: Props) {
  const modal = useModal();
  const router = useRouter();

  const likeArticle = trpc.talk.likeArticle.useMutation();

  function handleClick() {
    TalkUtil.checkLogin({
      action: handleAction,
      login,
      modal,
    });
  }

  function handleAction() {
    likeArticle.mutate(
      {
        articleId,
      },
      {
        onError: error => {
          modal.alert(error.message);
        },
        onSuccess: () => {
          router.refresh();
        },
      }
    );
  }

  return (
    <div {...props} onClick={handleClick}>
      {children}
    </div>
  );
}
