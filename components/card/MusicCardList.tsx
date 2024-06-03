import MusicCard from '@/components/card/MusicCard';
import { AlbumService } from '@/services/album.service';
import { MusicService } from '@/services/music.service';
import { Music } from '@prisma/client';

export default async function MusicCardList() {
  const musicsData = MusicService.getAll();
  const albumsData = AlbumService.getAll();

  const [musics, albums] = await Promise.all([musicsData, albumsData]);

  const albumsMap = new Map<string, Music[]>(albums.map(album => [album.id, []]));

  musics.forEach(music => {
    const albumId = music.albumId;
    albumId && albumsMap.get(albumId)!.push(music);
  });

  return (
    <div className="flex flex-col gap-24 lg:grid lg:grid-cols-2">
      {albums.map(album => (
        <MusicCard key={album.id} album={album} musics={albumsMap.get(album.id)!} />
      ))}
    </div>
  );
}
