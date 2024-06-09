import AlbumCardLarge from '@/components/card/AlbumCardLarge';
import DetailsContent from '@/components/core/header/DetailsContent';
import Title from '@/components/core/header/Title';
import PerformanceMusicMenu from '@/components/menu/PerformanceMusicMenu';
import OfficialVideoList from '@/components/video/OfficialVideoList';
import StageVideoList from '@/components/video/StageVideoList';
import PerformanceMusicProvider from '@/providers/PerformanceMusicProvider';
import { AlbumService } from '@/services/album.service';
import { MusicService } from '@/services/music.service';
import { notFound } from 'next/navigation';

export const revalidate = 0;

interface Props {
  params: {
    albumId: string;
  };
}

export default async function AlbumPerformancePage({ params: { albumId } }: Props) {
  const albumData = await AlbumService.getOne(albumId);
  const musicsData = await MusicService.getPerformedMusics(albumId);

  const [album, musics] = await Promise.all([albumData, musicsData]);
  if (!album || !musics.length) return notFound();

  return (
    <PerformanceMusicProvider musics={musics}>
      <DetailsContent>
        <Title>{album.title}</Title>
        <div className="px-24 pb-24">
          <div className="mx-auto flex max-w-screen-lg flex-col gap-20">
            <AlbumCardLarge album={album} horizontal />
            <PerformanceMusicMenu musics={musics} />
            <div className="h-1 self-stretch bg-gray-100" />
            <OfficialVideoList />
            <div className="h-1 self-stretch bg-gray-100" />
            <StageVideoList />
          </div>
        </div>
      </DetailsContent>
    </PerformanceMusicProvider>
  );
}
