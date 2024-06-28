'use client';

import { revalidateTalkArticleDelete } from '@/actions/revalidate.action';
import useModal from '@/hooks/modal';
import { trpc } from '@/hooks/trpc';
import { ModalResult } from '@/providers/ModalProvider';
import { useRouter } from 'next/navigation';
import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  articleId: string;
  login: boolean;
}

export default function TalkArticleDelete({ articleId, login, children, ...props }: Props) {
  const modal = useModal();
  const router = useRouter();
  const deleteArticle = trpc.talk.softDeleteArticle.useMutation();

  function handleClick() {
    modal.confirm('$talk_article_delete_confirm', handleModalResolve);
  }

  function handleModalResolve(result: ModalResult) {
    if (result.type !== 'confirm') return;

    deleteArticle.mutate(
      {
        articleId,
      },
      {
        onError: error => {
          modal.alert(error.message);
        },
        onSuccess: async () => {
          await revalidateTalkArticleDelete(articleId);
          router.replace('/talk');
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
