'use client';

import Icon from '@/components/core/Icon';
import Translate from '@/components/core/Translate';
import useModal from '@/hooks/modal';
import { trpc } from '@/hooks/trpc';
import TalkUtil from '@/utils/talk.util';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function TalkSettings() {
  const modal = useModal();

  const [isActive, setIsActive] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const user = trpc.talk.getProfile.useQuery(undefined, {
    retry: false,
  });
  const updateUserNickname = trpc.talk.updateUserNickname.useMutation();

  const isLoading = user.isLoading;
  const data = user.data;
  const isUpdating = updateUserNickname.isPending;

  useEffect(() => {
    handleInputChange();
  }, [data?.nickname]);

  function handleInputChange() {
    const input = inputRef.current;
    if (!input || !data) return false;

    const newNickname = input.value;
    setIsActive(newNickname !== data.nickname);
  }

  function editClick() {
    const input = inputRef.current;
    if (!input || !data || !isActive) return false;

    const newNickname = input.value;
    if (newNickname === data.nickname) return false;

    const validateResult = TalkUtil.validateNickname(newNickname);
    if (validateResult.error) return modal.alert(validateResult.message!);

    const sanitizedNickname = validateResult.nickname!;
    updateUserNickname.mutate(
      { nickname: sanitizedNickname },
      {
        onError: error => {
          modal.alert(error.message);
        },
        onSuccess: () => {
          modal.alert('$settings_nickname_updated');
          void user.refetch();
        },
      }
    );
  }

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <div className="text-18 font-600 text-black">
            <Translate>$settings_nickname</Translate>
          </div>
          <div className="text-16 font-400 text-gray-500">
            <Translate>$settings_nickname_description</Translate>
          </div>
        </div>
        {isLoading ? (
          <div className="flex items-center gap-8 py-12">
            <Icon type="spinner" className="w-16 shrink-0 animate-spin text-gray-500" />
            <div className="text-16 font-400 text-gray-500">Loading...</div>
          </div>
        ) : data ? (
          <div className="flex items-center gap-8 lg:max-w-[520px]">
            <input
              ref={inputRef}
              defaultValue={data.nickname}
              type="text"
              onChange={handleInputChange}
              className="min-w-0 grow rounded-8 bg-gray-50 px-16 py-12 text-16 font-400 text-black"
            />
            <div
              data-active={isActive}
              onClick={editClick}
              className="flex cursor-not-allowed items-center gap-8 rounded-8 bg-gray-50 px-16 py-12 text-16 font-500 text-gray-500 data-[active=true]:cursor-pointer data-[active=true]:bg-gradient-primary data-[active=true]:text-white"
            >
              {isUpdating && (
                <Icon type="spinner" className="w-16 shrink-0 animate-spin text-white" />
              )}
              <Translate>$settings_edit</Translate>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-8 py-12">
            <div className="text-16 font-400 text-gray-500">
              <Translate>$settings_no_account</Translate>
            </div>
            <Link
              href={`/talk/login?next=/settings`}
              className="text-16 font-500 text-primary-500 underline underline-offset-2"
            >
              <Translate>$settings_create</Translate>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
