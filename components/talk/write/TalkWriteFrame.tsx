'use client';

import Icon from '@/components/core/Icon';
import Translate from '@/components/core/Translate';
import useHistory from '@/hooks/history';
import useTranslate from '@/hooks/translate';
import { trpc } from '@/hooks/trpc';
import { i18n } from '@/utils/i18n.util';
import TalkUtil from '@/utils/talk.util';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

export interface TalkEditData {
  articleId: string;
  content: string;
  title: string;
}

interface Props {
  edit?: TalkEditData;
  nickname: string;
}

export default function TalkWriteFrame({ edit, nickname }: Props) {
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const createArticle = trpc.talk.createArticle.useMutation();
  const editArticle = trpc.talk.editArticle.useMutation();

  const router = useRouter();
  const history = useHistory();
  const { language } = useTranslate();

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (edit) setIsActive(true);
    handleTextareaChange();
  }, []);

  function handleTextareaChange() {
    const element = textareaRef.current;
    if (!element) return false;

    element.style.height = '120px';
    element.style.height = element.scrollHeight + 'px';
  }

  function handleSubmit(formData: FormData) {
    if (isLoading) return;
    setError(null);

    const title = formData.get('title');
    const content = formData.get('content');
    const validateResult = TalkUtil.validateArticle(title, content);

    if (validateResult.error) return setError(validateResult.message!);
    const sanitizedTitle = validateResult.title!;
    const sanitizedContent = validateResult.content!;

    if (isEditMode) {
      editArticle.mutate(
        { articleId: edit.articleId, content: sanitizedContent, title: sanitizedTitle },
        {
          onError: error => {
            setError(error.message);
          },
          onSuccess: () => {
            router.push(`/talk/article/${edit!.articleId}`);
            router.refresh();
          },
        }
      );
    } else {
      createArticle.mutate(
        {
          content: sanitizedContent,
          poll: {
            options: ['option 1', 'option 2'],
            title: 'poll title',
          },
          title: sanitizedTitle,
        },
        {
          onError: error => {
            setError(error.message);
          },
          onSuccess: articleId => {
            history.reset();
            router.replace(`/talk/article/${articleId}`);
          },
        }
      );
    }
  }

  function handleChange(e: ChangeEvent<HTMLFormElement>) {
    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;

    setIsActive(!!title && !!content);
  }

  const isEditMode = !!edit;
  const isLoading =
    createArticle.isPending ||
    createArticle.isSuccess ||
    editArticle.isPending ||
    editArticle.isSuccess;

  return (
    <form action={handleSubmit} onChange={handleChange} className="flex flex-col gap-16">
      <div className="flex items-center gap-16">
        <div className="flex min-w-0 grow flex-col gap-8">
          <input
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            autoFocus={!isEditMode}
            defaultValue={edit?.title}
            name="title"
            placeholder={i18n('$talk_article_title_placeholder', language)}
            spellCheck="false"
            type="text"
            className="text-24 font-700 text-black outline-none placeholder:text-gray-200"
          />
          <div className="text-18 font-600 text-gray-200">{nickname}</div>
        </div>
        <button
          data-active={isActive}
          type="submit"
          className="jelly group flex shrink-0 cursor-not-allowed items-center gap-8 rounded-8 bg-gray-100 px-16 py-8 hover:scale-105 data-[active=true]:cursor-pointer data-[active=true]:bg-gradient-primary"
        >
          <div className="text-16 font-600 text-gray-200 group-data-[active=true]:text-white">
            <Translate>{isEditMode ? '$talk_article_edit' : '$talk_article_post'}</Translate>
          </div>
          {isLoading && (
            <Icon type="spinner" className="size-16 shrink-0 animate-spin text-white" />
          )}
        </button>
      </div>
      {error && (
        <div className="self-start whitespace-pre-line rounded-8 bg-c-red/20 px-16 py-8 text-16 text-c-red">
          <Translate>{error}</Translate>
        </div>
      )}
      <div className="h-2 bg-gray-100" />
      <textarea
        ref={textareaRef}
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        autoFocus={isEditMode}
        defaultValue={edit?.content}
        maxLength={1000}
        name="content"
        placeholder={i18n('$talk_article_content_placeholder', language)}
        rows={5}
        spellCheck="false"
        onChange={handleTextareaChange}
        className="resize-none text-16 font-400 leading-6 text-black outline-none placeholder:text-gray-200"
      />
      <div className="flex items-center">
        <div className="cursor-pointer rounded-8 bg-gray-50 p-8">
          <Icon type="poll" className="w-14 text-gray-500" />
          <div className="text-16 font-500 text-gray-500">Poll</div>
        </div>
      </div>
      <div className="text-14 font-400 leading-5 text-gray-500">
        <Translate>$talk_article_rules_header_1</Translate>
        <br />
        <Translate>$talk_article_rules_header_2</Translate>
        <ul className="mt-8 list-disc px-20 leading-5">
          <li>
            <Translate>$talk_article_rules_content_1</Translate>
          </li>
          <li>
            <Translate>$talk_article_rules_content_2</Translate>
          </li>
          <li>
            <Translate>$talk_article_rules_content_3</Translate>
          </li>
          <li>
            <Translate>$talk_article_rules_content_4</Translate>
          </li>
          <li>
            <Translate>$talk_article_rules_content_5</Translate>
          </li>
        </ul>
      </div>
    </form>
  );
}
