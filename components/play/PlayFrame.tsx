import MusicInfo from '@/components/play/MusicInfo';
import { MusicWithPlayData } from '@/services/music.service';
import { Album } from '@prisma/client';

interface Props {
  album: Album;
  music: MusicWithPlayData;
}

export default function PlayFrame({ album, music }: Props) {
  const [gradientFrom, gradientTo, gradientMid] = album.colors;

  return (
    <div
      style={{ background: `linear-gradient(180deg, ${gradientFrom} 7.15%, ${gradientMid} 96.7%)` }}
      className="h-dvh w-full p-24"
    >
      <MusicInfo album={album} music={music} />
    </div>
  );
}
