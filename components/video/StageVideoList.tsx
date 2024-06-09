'use client';

import NoItems from '@/components/core/NoItems';
import SessionVideoList from '@/components/video/SessionVideoList';
import { trpc } from '@/hooks/trpc';
import { PerformanceMusicContext } from '@/providers/PerformanceMusicProvider';
import { useContext } from 'react';

export default function StageVideoList() {
  const selectedMusic = useContext(PerformanceMusicContext);
  const selectedMusicId = selectedMusic?.id;

  const sessions = trpc.session.getSessionsByMusicId.useQuery(
    {
      member: null,
      musicId: selectedMusicId!,
    },
    {
      enabled: !!selectedMusicId,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    }
  );

  const items = sessions.data;

  return (
    <div className="flex flex-col gap-12">
      <div className="text-20 font-700 text-black">Stages</div>
      {sessions.isFetching || !items ? (
        <></>
      ) : items.length > 0 ? (
        <div className="flex flex-col gap-16">
          {items.map(session => (
            <SessionVideoList key={session.id} session={session} />
          ))}
        </div>
      ) : (
        <NoItems />
      )}
    </div>
  );
}
