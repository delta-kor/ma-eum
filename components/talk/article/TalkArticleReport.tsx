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
    modal.prompt('$talk_report_enter_reason', '$talk_report_reason', handleModalResolve);
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
          modal.alert('$talk_report_submitted');
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
