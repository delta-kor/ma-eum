import Translate from '@/components/core/Translate';
import { trpc } from '@/hooks/trpc';
import TalkUtil from '@/utils/talk.util';
import { useState } from 'react';

export default function TalkLoginContent() {
  const [error, setError] = useState<null | string>(null);
  const createUser = trpc.talk.createUser.useMutation();

  async function handleSubmit(formData: FormData) {
    const nickname = formData.get('nickname');
    const validateResult = TalkUtil.validateNickname(nickname);

    if (validateResult.error) return setError(validateResult.message!);
    const sanitizedNickname = validateResult.nickname!;

    createUser.mutate(
      { nickname: sanitizedNickname },
      {
        onError: error => {
          setError(error.message);
        },
      }
    );
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-24">
      <div className="flex flex-col gap-24">
        <div className="flex flex-col gap-8">
          <div className="text-20 font-600 text-black">사용하실 닉네임을 입력해주세요</div>
          <div className="text-16 font-500 text-gray-500">닉네임은 나중에 바꿀 수 있어요.</div>
        </div>
        <input
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          maxLength={15}
          name="nickname"
          placeholder="닉네임"
          spellCheck="false"
          type="text"
          className="rounded-0 border-b-2 border-b-gray-100 pb-8 text-24 font-700 text-black outline-none transition-colors placeholder:text-gray-200 focus:border-b-gray-500"
        />
      </div>
      <div className="flex flex-col gap-16">
        {error && (
          <div className="self-start rounded-8 bg-c-red/20 px-16 py-8 text-16 text-c-red">
            <Translate>{error}</Translate>
          </div>
        )}
        <button
          data-active={!createUser.isPending}
          type="submit"
          className="-m-16 self-start p-16 text-16 font-700 text-primary-500"
        >
          확인
        </button>
      </div>
    </form>
  );
}
