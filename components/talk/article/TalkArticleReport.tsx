'use client';

import useModal from '@/hooks/modal';
import { trpc } from '@/hooks/trpc';
import { ModalResult } from '@/providers/ModalProvider';
import TalkUtil from '@/utils/talk.util';
import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  articleId: string;
  login: boolean;
}

export default function TalkArticleReport({ articleId, login, children, ...props }: Props) {
  const modal = useModal();
  const reportArticle = trpc.talk.reportArticle.useMutation();

  function handleClick() {
    TalkUtil.checkLogin({
      action: handleAction,
      login,
      modal,
    });
  }

  function handleAction() {
    modal.prompt('$article_report_enter_reason', '$article_report_reason', handleModalResolve);
  }

  function handleModalResolve(result: ModalResult) {
    if (result.type !== 'prompt') return;

    reportArticle.mutate(
      {
        articleId,
        reason: result.value,
      },
      {
        onError: error => {
          modal.alert(error.message);
        },
        onSuccess: async () => {
          modal.alert('신고가 접수되었습니다.');
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
