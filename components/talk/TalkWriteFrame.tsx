'use client';

import { revalidateTalkWrite } from '@/actions/revalidate.action';
import Icon from '@/components/core/Icon';
import Translate from '@/components/core/Translate';
import { trpc } from '@/hooks/trpc';
import TalkUtil from '@/utils/talk.util';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';

interface Props {
  nickname: string;
}

export default function TalkWriteFrame({ nickname }: Props) {
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const createArticle = trpc.talk.createArticle.useMutation();

  const router = useRouter();

  function handleTextareaChange(e: ChangeEvent<HTMLTextAreaElement>) {
    const element = e.target;
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

    createArticle.mutate(
      { content: sanitizedContent, title: sanitizedTitle },
      {
        onError: error => {
          setError(error.message);
        },
        onSuccess: async articleId => {
          await revalidateTalkWrite();
          router.replace(`/talk/article/${articleId}`);
        },
      }
    );
  }

  function handleChange(e: ChangeEvent<HTMLFormElement>) {
    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;

    setIsActive(!!title && !!content);
  }

  const isLoading = createArticle.isPending || createArticle.isSuccess;

  return (
    <form action={handleSubmit} onChange={handleChange} className="flex flex-col gap-16">
      <div className="flex items-center gap-16">
        <div className="flex min-w-0 grow flex-col gap-8">
          <input
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            name="title"
            placeholder="제목"
            spellCheck="false"
            type="text"
            autoFocus
            className="text-24 font-700 text-black outline-none placeholder:text-gray-200"
          />
          <div className="text-18 font-600 text-gray-200">{nickname}</div>
        </div>
        <button
          data-active={isActive}
          type="submit"
          className="group flex cursor-not-allowed items-center gap-8 rounded-8 bg-gray-100 px-16 py-8 data-[active=true]:cursor-pointer data-[active=true]:bg-gradient-primary"
        >
          <div className="text-16 font-600 text-gray-200 group-data-[active=true]:text-white">
            <Translate>$article_post</Translate>
          </div>
          {isLoading && (
            <Icon type="spinner" className="size-16 shrink-0 animate-spin text-white" />
          )}
        </button>
      </div>
      {error && (
        <div className="self-start rounded-8 bg-c-red/20 px-16 py-8 text-16 text-c-red">
          <Translate>{error}</Translate>
        </div>
      )}
      <div className="h-2 bg-gray-100" />
      <textarea
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
        name="content"
        placeholder="내용을 입력해주세요."
        rows={5}
        spellCheck="false"
        onChange={handleTextareaChange}
        className="resize-none text-16 font-400 leading-6 text-black outline-none placeholder:text-gray-200"
      />
      <div className="text-14 font-400 leading-5 text-gray-500">
        마음토크는 모두를 위한 공간입니다.
        <br />
        따뜻한 소통을 위해 다음과 같은 글은 삼가해 주시기 바랍니다:
        <ul className="mt-8 list-disc px-20 leading-5">
          <li>욕설 및 비하</li>
          <li>차별적 발언</li>
          <li>정치적 내용</li>
          <li>비슷한 내용의 도배</li>
          <li>관련 없는 홍보</li>
        </ul>
      </div>
    </form>
  );
}
