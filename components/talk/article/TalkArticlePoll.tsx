'use client';

import { trpc } from '@/hooks/trpc';

interface Props {
  pollId: null | string;
}

export default function TalkArticlePoll({ pollId }: Props) {
  if (!pollId) return null;

  const pollMetadata = trpc.talk.getPollMetadata.useQuery(
    { pollId },
    {
      enabled: !!pollId,
    }
  );

  const data = pollMetadata.data;
  if (!data) return null;

  return (
    <div className="flex flex-col gap-12 rounded-16 border-2 border-gray-100 p-20 md:max-w-[480px]">
      <div className="text-18 font-600 text-black">{data.title}</div>
      <div className="flex flex-col gap-8">
        {data.options.map((data, index) => (
          <div
            key={index}
            className="flex cursor-pointer items-center gap-8 rounded-8 bg-gray-50 px-16 py-14"
          >
            <div className="grow text-16 font-400 text-black">{data}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
