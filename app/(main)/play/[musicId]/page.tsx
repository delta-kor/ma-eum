import PlayFrame from '@/components/play/PlayFrame';
import { AlbumService } from '@/services/album.service';
import { MusicService } from '@/services/music.service';
import { notFound } from 'next/navigation';

export const revalidate = 3600;

interface Props {
  params: {
    musicId: string;
  };
}

export default async function PlayPage({ params: { musicId } }: Props) {
  const music = await MusicService.getOneWithPlayData(musicId);
  if (!music || !music.albumId || !music.playData || !music.playData.lyrics) return notFound();

  const album = await AlbumService.getOne(music.albumId);
  if (!album) return notFound();

  return <PlayFrame album={album} music={music} />;
}

export async function generateStaticParams() {
  const musics = await MusicService.getAll();
  return musics.map(music => ({ musicId: music.id }));
}
