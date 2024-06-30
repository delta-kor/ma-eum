'use client';

import { revalidateTalkArticleHeart } from '@/actions/revalidate.action';
import useModal from '@/hooks/modal';
import { trpc } from '@/hooks/trpc';
import TalkUtil from '@/utils/talk.util';
import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  articleId: string;
  login: boolean;
}

export default function TalkArticleHeart({ articleId, login, children, ...props }: Props) {
  const modal = useModal();
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
        onSuccess: async () => {
          await revalidateTalkArticleHeart(articleId);
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
