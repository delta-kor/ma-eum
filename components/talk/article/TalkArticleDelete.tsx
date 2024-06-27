'use client';

import { revalidateTalkHeart } from '@/actions/revalidate.action';
import useModal from '@/hooks/modal';
import { trpc } from '@/hooks/trpc';
import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  articleId: string;
  login: boolean;
}

export default function TalkArticleDelete({ articleId, login, children, ...props }: Props) {
  const modal = useModal();
  const deleteArticle = trpc.talk.softDeleteArticle.useMutation();

  function handleClick() {}

  function handleAction() {
    deleteArticle.mutate(
      {
        articleId,
      },
      {
        onError: error => {
          modal.alert(error.message);
        },
        onSuccess: async () => {
          await revalidateTalkHeart(articleId);
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
