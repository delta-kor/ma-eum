'use client';

import { revalidateTalkComment } from '@/actions/revalidate.action';
import Icon from '@/components/core/Icon';
import useModal from '@/hooks/modal';
import { trpc } from '@/hooks/trpc';
import TalkUtil from '@/utils/talk.util';
import { ChangeEvent } from 'react';

interface Props {
  articleId: string;
  login: boolean;
}

export default function TalkCommentInput({ articleId, login }: Props) {
  const modal = useModal();
  const addComment = trpc.talk.addCommentToArticle.useMutation();

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

  function handleAction(content: string) {
    addComment.mutate(
      { articleId, content },
      {
        onError: error => {
          modal.alert(error.message);
        },
        onSuccess: async () => {
          await revalidateTalkComment(articleId);
        },
      }
    );
  }

  const isLoading = addComment.isPending;

  return (
    <form action={handleSubmit} className="flex items-stretch rounded-16 bg-gray-50">
      <textarea
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        maxLength={500}
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
