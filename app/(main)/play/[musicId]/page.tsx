import PlayFrame from '@/components/play/PlayFrame';
import { AlbumService } from '@/services/album.service';
import { MusicService } from '@/services/music.service';
import MetaUtil from '@/utils/meta.util';
import { notFound } from 'next/navigation';

export const revalidate = 18000;

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
  if (process.env.GENERATE_STATIC_PAGES !== '1') return [];

  const musics = await MusicService.getAll();
  return musics.map(music => ({ musicId: music.id }));
}

export async function generateMetadata({ params: { musicId } }: Props) {
  const music = await MusicService.getOne(musicId);
  if (!music) return notFound();

  const title = `${music.shortTitle}`;
  return MetaUtil.getSubpage(
    title,
    'Explore and enjoy the latest tracks from CSR(첫사랑).',
    `/play/${musicId}`
  );
}
