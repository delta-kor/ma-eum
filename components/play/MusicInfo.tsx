import Icon from '@/components/core/Icon';
import Mobile from '@/components/core/responsive/Mobile';
import useHistory from '@/hooks/history';
import { ExtendedMusic } from '@/services/music.service';
import { Album } from '@prisma/client';
import { ReactNode } from 'react';

interface Props {
  album: Album;
  music: ExtendedMusic;
  children: ReactNode;
}

export default function MusicInfo({ album, music, children }: Props) {
  const history = useHistory();

  function handleBackClick() {
    history.back();
  }

  return (
    <div className="flex shrink-0 items-center gap-16 lg:flex-col lg:items-stretch">
      <Mobile>
        <div onClick={handleBackClick} className="-m-16 shrink-0 cursor-pointer p-16">
          <Icon type="left" className="w-16 text-white" />
        </div>
      </Mobile>
      {children}
      <div className="flex min-w-0 flex-col gap-4">
        <div className="line-clamp-2 text-20 font-600 text-white lg:text-28">{music.title}</div>
        <div className="truncate text-18 font-500 text-white/70 lg:text-24">{album.title}</div>
      </div>
    </div>
  );
}
