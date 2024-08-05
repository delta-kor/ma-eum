'use client';

import Icon from '@/components/core/Icon';
import useModal from '@/hooks/modal';
import { trpc } from '@/hooks/trpc';
import TalkUtil from '@/utils/talk.util';

interface Props {
  login: boolean;
  pollId: null | string;
}

export default function TalkArticlePoll({ login, pollId }: Props) {
  const modal = useModal();

  const addBallot = trpc.talk.addBallotToPoll.useMutation();
  const pollMetadata = trpc.talk.getPollMetadata.useQuery(
    { pollId: pollId! },
    {
      enabled: !!pollId,
    }
  );

  function handleVote(option: number) {
    TalkUtil.checkLogin({
      action: () => handleAction(option),
      login,
      modal,
    });
  }

  function handleAction(option: number) {
    if (!pollId) return;

    let sanitizedOption: null | number = option;
    if (data && data.voted !== null && data.voted === option) sanitizedOption = null;

    addBallot.mutate(
      {
        option: sanitizedOption,
        pollId,
      },
      {
        onError: error => {
          modal.alert(error.message);
        },
        onSuccess: () => {
          pollMetadata.refetch();
        },
      }
    );
  }

  const isLoading = pollMetadata.isFetching || addBallot.isPending;
  const data = pollMetadata.data;
  if (!data) return null;

  return (
    <div className="flex flex-col gap-12 rounded-16 border-2 border-gray-100 p-20 md:max-w-[480px]">
      <div className="text-18 font-600 text-black">{data.title}</div>
      <div className="flex flex-col gap-8">
        {data.options.map((option, index) => (
          <div
            key={index}
            data-active={data.voted === index}
            onClick={() => handleVote(index)}
            className="relative -m-2 flex cursor-pointer items-center gap-8 overflow-hidden rounded-8 border-2 border-transparent bg-gray-50 px-16 py-14 transition-colors data-[active=true]:border-primary-500"
          >
            <div
              style={{
                width:
                  data.voted === null
                    ? '0px'
                    : `${(data.results[index] / data.participants) * 100}%`,
              }}
              className="absolute inset-y-0 left-0 bg-gray-200 transition-all duration-500"
            />
            <div className="relative grow text-16 font-400 text-black">{option}</div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-4 self-end">
        {isLoading && <Icon type="spinner" className="w-14 shrink-0 animate-spin text-gray-500" />}
        <div className="text-right text-14 font-600 text-gray-500">{data.participants} votes</div>
      </div>
    </div>
  );
}
