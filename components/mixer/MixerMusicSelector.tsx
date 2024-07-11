'use client';

import Icon from '@/components/core/Icon';
import LazyImage from '@/components/core/LazyImage';
import MixerEnterButton from '@/components/mixer/MixerEnterButton';
import StageVideoList from '@/components/video/StageVideoList';
import useQuery from '@/hooks/query';
import PerformanceMusicProvider from '@/providers/PerformanceMusicProvider';
import { getTime } from '@/utils/time.util';
import { ImageUrl } from '@/utils/url.util';
import { Music } from '@prisma/client';
import { useState } from 'react';

interface Props {
  musics: Music[];
}

export default function MixerMusicSelector({ musics }: Props) {
  const query = useQuery();
  const initialMusic = musics.find(music => music.id === query.get('music')) || musics[0];
  const [selectedMusic, setSelectedMusic] = useState<Music>(initialMusic);

  function handleMove(direction: number) {
    const currentIndex = musics.findIndex(music => music.id === selectedMusic.id);
    const nextIndex = (currentIndex + direction + musics.length) % musics.length;
    const nextMusic = musics[nextIndex];

    setSelectedMusic(nextMusic);
    query.softSet({ music: nextMusic.id });
  }

  return (
    <div className="flex flex-col gap-32">
      <div className="flex flex-col gap-16 lg:gap-24">
        <div className="-mx-24 flex items-center justify-evenly self-stretch">
          <div onClick={() => handleMove(-1)} className="-m-16 cursor-pointer p-16">
            <Icon type="left" className="w-20 text-gray-200" />
          </div>
          <LazyImage
            key={selectedMusic.id}
            src={ImageUrl.album(selectedMusic.albumId!)}
            className="size-[240px] select-none rounded-16 bg-gray-100"
          />
          <div onClick={() => handleMove(1)} className="-m-16 cursor-pointer p-16">
            <Icon type="right" className="w-20 text-gray-200" />
          </div>
        </div>
        <div className="flex flex-col items-center gap-8">
          <div className="select-none text-20 font-600 text-black lg:text-24">
            {selectedMusic.title}
          </div>
          <div className="select-none text-16 font-400 text-gray-500 lg:text-18">
            {getTime(selectedMusic.duration!)}
          </div>
        </div>
      </div>
      <div className="w-[320px] self-center">
        <MixerEnterButton music={selectedMusic} />
      </div>
      <PerformanceMusicProvider musics={musics}>
        <StageVideoList attached />
      </PerformanceMusicProvider>
    </div>
  );
}
