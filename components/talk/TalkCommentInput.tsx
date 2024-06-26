'use client';

import { revalidateTalkComment } from '@/actions/revalidate.action';
import Icon from '@/components/core/Icon';
import useModal from '@/hooks/modal';
import { trpc } from '@/hooks/trpc';
import { TalkCommentContext } from '@/providers/TalkCommentProvider';
import TalkUtil from '@/utils/talk.util';
import { ChangeEvent, useContext, useRef } from 'react';

interface Props {
  articleId: string;
  commentId?: string;
  login: boolean;
  onSubmit?: () => void;
}

export default function TalkCommentInput({ articleId, commentId, login, onSubmit }: Props) {
  const modal = useModal();
  const talkComment = useContext(TalkCommentContext);

  const addComment = trpc.talk.addCommentToArticle.useMutation();

  const formRef = useRef<HTMLFormElement>(null);

  function handleTextareaChange(e: ChangeEvent<HTMLTextAreaElement>) {
    const element = e.target;
    element.style.height = '80px';
    element.style.height = element.scrollHeight + 'px';
  }

  function handleSubmit(formData: FormData) {
    const content = formData.get('content');
    const validateResult = TalkUtil.validateComment(content);

    if (validateResult.error) return modal.alert(validateResult.message!);
    const sanitizedContent = validateResult.content!;

    TalkUtil.checkLogin({
      action: () => handleAction(sanitizedContent),
      login,
      modal,
    });
  }

  function resetForm() {
    formRef.current?.reset();
  }

  function handleAction(content: string) {
    addComment.mutate(
      { articleId, commentId, content },
      {
        onError: error => {
          modal.alert(error.message);
        },
        onSuccess: async () => {
          resetForm();
          await revalidateTalkComment(articleId);
          talkComment.refresh();
          onSubmit?.();
        },
      }
    );
  }

  const isLoading = addComment.isPending;

  return (
    <form ref={formRef} action={handleSubmit} className="flex items-stretch rounded-16 bg-gray-50">
      <textarea
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        maxLength={300}
        name="content"
        placeholder="댓글을 입력하세요"
        rows={2}
        spellCheck="false"
        onChange={handleTextareaChange}
        className="grow resize-none bg-transparent py-16 pl-20 text-16 font-500 leading-6 text-black outline-none placeholder:text-gray-500"
      />
      <button type="submit" className="flex items-center px-20">
        <Icon
          data-loading={isLoading}
          type={isLoading ? 'spinner' : 'send'}
          className="w-16 shrink-0 text-gray-500 data-[loading=true]:animate-spin"
        />
      </button>
    </form>
  );
}
