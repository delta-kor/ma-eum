'use client';

import Icon from '@/components/core/Icon';
import useModal from '@/hooks/modal';
import useTranslate from '@/hooks/translate';
import { trpc } from '@/hooks/trpc';
import { TalkCommentContext } from '@/providers/TalkCommentProvider';
import { i18n } from '@/utils/i18n.util';
import TalkUtil from '@/utils/talk.util';
import { useRouter } from 'next/navigation';
import { FormEvent, useContext, useRef, useState } from 'react';

interface Props {
  articleId: string;
  commentId?: string;
  login: boolean;
  onSubmit?: () => void;
}

export default function TalkCommentInput({ articleId, commentId, login, onSubmit }: Props) {
  const modal = useModal();
  const router = useRouter();
  const talkComment = useContext(TalkCommentContext);
  const { language } = useTranslate();

  const [isActive, setIsActive] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const addComment = trpc.talk.addCommentToArticle.useMutation();

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function handleTextareaChange() {
    const element = textareaRef.current;
    if (!element) return;

    element.style.height = '80px';
    element.style.height = element.scrollHeight + 'px';

    setIsActive(!!element.value);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
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
    textareaRef.current!.value = '';
    handleTextareaChange();
  }

  function handleAction(content: string) {
    addComment.mutate(
      { articleId, commentId, content },
      {
        onError: error => {
          modal.alert(error.message);
        },
        onSuccess: async () => {
          setIsRefreshing(true);
          await talkComment.refresh();
          router.refresh();
          setIsRefreshing(false);

          onSubmit?.();
          resetForm();
        },
      }
    );
  }

  const isLoading = addComment.isPending || isRefreshing;

  return (
    <form onSubmit={handleSubmit} className="flex items-stretch rounded-16 bg-gray-50">
      <textarea
        ref={textareaRef}
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        maxLength={300}
        name="content"
        placeholder={i18n('$talk_comment_placeholder', language)}
        rows={2}
        spellCheck="false"
        onChange={handleTextareaChange}
        className="grow resize-none bg-transparent py-16 pl-20 text-16 font-400 leading-6 text-black outline-none placeholder:text-gray-500"
      />
      <button type="submit" className="flex items-center px-20">
        <Icon
          data-active={isActive}
          data-loading={isLoading}
          type={isLoading ? 'spinner' : 'send'}
          className="w-16 shrink-0 text-gray-200 transition-colors data-[loading=true]:animate-spin data-[active=true]:text-primary-500"
        />
      </button>
    </form>
  );
}
