import AlbumCard from '@/components/card/AlbumCard';
import MusicCardItem from '@/components/card/MusicCardItem';
import { Album, Music } from '@prisma/client';

interface Props {
  album: Album;
  musics: Music[];
}

export default function MusicCard({ album, musics }: Props) {
  const sortedMusics = [...musics].sort((a, b) => a.order - b.order);

  return (
    <div className="flex flex-col gap-8">
      <AlbumCard album={album} />
      <div className="flex flex-col">
        {sortedMusics.map(music => (
          <MusicCardItem key={music.id} music={music} />
        ))}
      </div>
    </div>
  );
}
