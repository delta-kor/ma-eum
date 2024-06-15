'use client';

import useQuery from '@/hooks/query';
import { PerformanceMusicContext } from '@/providers/PerformanceMusicProvider';
import { Music } from '@prisma/client';
import Link from 'next/link';
import { useContext } from 'react';

interface Props {
  musics: Music[];
}

export default function PerformanceMusicMenu({ musics }: Props) {
  const query = useQuery();

  const selectedMusic = useContext(PerformanceMusicContext);
  const selectedMusicId = selectedMusic?.id;

  return (
    <div className="flex items-center justify-center gap-24">
      {musics.map(music => (
        <Link
          key={music.id}
          data-active={music.id === selectedMusicId}
          href={query.getQueryUpdatedUrl({ music: music.id })}
          replace
          className="group relative -m-8 p-8"
        >
          <div className="relative z-10 text-18 font-600 text-gray-200 group-data-[active=true]:text-black">
            {music.shortTitle}
          </div>
          <div className="absolute inset-x-2 bottom-6 h-10 group-data-[active=true]:bg-primary-200" />
        </Link>
      ))}
    </div>
  );
}
