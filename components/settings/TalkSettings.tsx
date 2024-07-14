'use client';

import { trpc } from '@/hooks/trpc';
import Link from 'next/link';
import { useRef, useState } from 'react';

export default function TalkSettings() {
  const [isActive, setIsActive] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const user = trpc.talk.getProfile.useQuery(undefined, {
    retry: false,
  });

  function handleInputChange() {
    const input = inputRef.current;
    if (!input || !data) return false;

    const newNickname = input.value;
    setIsActive(newNickname !== data.nickname);
  }

  const isLoading = user.isLoading;
  const data = user.data;

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <div className="text-18 font-600 text-black">Nickname</div>
          <div className="text-16 font-400 text-gray-500">Edit your nickname.</div>
        </div>
        {isLoading ? (
          <div className="py-12">
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
              className="rounded-8 bg-gray-50 px-16 py-12 text-16 font-500 text-gray-500 data-[active=true]:bg-gradient-primary data-[active=true]:text-white"
            >
              Edit
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-8 py-12">
            <div className="text-16 font-400 text-gray-500">You do not have an account.</div>
            <Link href={`/talk/login?next=/settings`} className="text-16 font-500 text-primary-500">
              Create
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
