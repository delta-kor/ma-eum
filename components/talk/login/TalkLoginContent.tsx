import { revalidateTalkLogin } from '@/actions/revalidate.action';
import Icon from '@/components/core/Icon';
import Translate from '@/components/core/Translate';
import useHistory from '@/hooks/history';
import useQuery from '@/hooks/query';
import useTranslate from '@/hooks/translate';
import { trpc } from '@/hooks/trpc';
import { ModalResolver } from '@/providers/ModalProvider';
import { i18n } from '@/utils/i18n.util';
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
  const { language } = useTranslate();

  async function handleSubmit(formData: FormData) {
    if (isLoading) return;
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
            await revalidateTalkLogin();
            router.replace(next);
          } else {
            await revalidateTalkLogin();
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

  const isLoading = createUser.isPending || createUser.isSuccess;

  return (
    <form action={handleSubmit} className="flex flex-col gap-24">
      <div className="flex flex-col gap-24">
        <div className="flex flex-col gap-8">
          <div className="text-20 font-600 text-black">
            <Translate>$talk_login_enter_nickname</Translate>
          </div>
          <div className="text-16 font-500 text-gray-500">
            <Translate>$talk_login_nickname_can_be_changed</Translate>
          </div>
        </div>
        <input
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          maxLength={15}
          name="nickname"
          placeholder={i18n('$talk_login_placeholder', language)}
          spellCheck="false"
          type="text"
          autoFocus
          className="rounded-0 border-b-2 border-b-gray-100 pb-8 text-24 font-700 text-black outline-none transition-colors placeholder:text-gray-200 focus:border-b-gray-500"
        />
      </div>
      {error && (
        <div className="self-start rounded-8 bg-c-red/20 px-16 py-8 text-16 text-c-red">
          <Translate>{error}</Translate>
        </div>
      )}
      <div className="flex items-center justify-end gap-24">
        <button
          type="button"
          onClick={handleCancel}
          className="jelly -m-12 self-start rounded-8 p-12 text-16 font-400 text-gray-500 transition-colors hover:bg-gray-50 selected:bg-gray-50"
        >
          <Translate>$modal_cancel</Translate>
        </button>
        {isLoading ? (
          <div className="flex items-center gap-8 self-start text-16 font-400 text-gray-500">
            <Icon type="spinner" className="w-16 shrink-0 animate-spin" />
            <span>
              <Translate>$modal_confirm</Translate>
            </span>
          </div>
        ) : (
          <button
            type="submit"
            className="jelly -m-12 self-start rounded-8 p-12 text-16 font-700 text-primary-500 transition-colors hover:bg-gray-50 selected:bg-gray-50"
          >
            <Translate>$modal_confirm</Translate>
          </button>
        )}
      </div>
    </form>
  );
}
