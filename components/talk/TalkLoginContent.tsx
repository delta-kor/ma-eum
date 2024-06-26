import { revalidate } from '@/actions/revalidate.action';
import Icon from '@/components/core/Icon';
import Translate from '@/components/core/Translate';
import useHistory from '@/hooks/history';
import useQuery from '@/hooks/query';
import { trpc } from '@/hooks/trpc';
import { ModalResolver } from '@/providers/ModalProvider';
import TalkUtil from '@/utils/talk.util';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Props {
  type: 'modal' | 'page';
  onResolve?: ModalResolver;
}

export default function TalkLoginContent({ type, onResolve }: Props) {
  const [error, setError] = useState<null | string>(null);
  const createUser = trpc.talk.createUser.useMutation();

  const query = useQuery();
  const router = useRouter();
  const history = useHistory();

  async function handleSubmit(formData: FormData) {
    setError(null);

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
        onSuccess: async () => {
          if (type === 'page') {
            const next = query.get('next') || '/talk';
            await revalidate('/talk/write');
            router.replace(next);
          } else {
            await revalidate('/talk/write');
            onResolve?.({ type: 'confirm' });
          }
        },
      }
    );
  }

  function handleCancel() {
    if (type === 'page') {
      history.back();
    } else {
      onResolve?.({ type: 'cancel' });
    }
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
          autoFocus
          className="rounded-0 border-b-2 border-b-gray-100 pb-8 text-24 font-700 text-black outline-none transition-colors placeholder:text-gray-200 focus:border-b-gray-500"
        />
      </div>
      <div className="flex flex-col gap-16">
        {error && (
          <div className="self-start rounded-8 bg-c-red/20 px-16 py-8 text-16 text-c-red">
            <Translate>{error}</Translate>
          </div>
        )}
        <div className="flex items-center justify-end gap-32">
          <button
            type="button"
            onClick={handleCancel}
            className="-m-16 self-start p-16 text-16 font-500 text-gray-500"
          >
            취소
          </button>
          {createUser.isPending || createUser.isSuccess ? (
            <div className="flex items-center gap-8 self-start text-16 font-500 text-gray-500">
              <Icon type="spinner" className="w-16 animate-spin" />
              <span>잠시만 기다려 주세요...</span>
            </div>
          ) : (
            <button
              type="submit"
              className="-m-16 self-start p-16 text-16 font-700 text-primary-500"
            >
              확인
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
