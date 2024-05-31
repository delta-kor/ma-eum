import AlbumCard from '@/components/card/AlbumCard';
import { AlbumService } from '@/services/album.service';

export default async function AlbumCardList() {
  const albums = await AlbumService.getAll();

  return (
    <div className="flex flex-col gap-12 px-24">
      {albums.map(album => (
        <AlbumCard key={album.id} album={album} menu />
      ))}
    </div>
  );
}
