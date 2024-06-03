import AlbumCardLarge from '@/components/card/AlbumCardLarge';
import DetailsContent from '@/components/core/header/DetailsContent';
import Title from '@/components/core/header/Title';
import PromotionList from '@/components/video/PromotionList';
import { AlbumService } from '@/services/album.service';
import { VideoService } from '@/services/video.service';
import { sortVideoByMeta } from '@/utils/sort.util';
import { notFound } from 'next/navigation';

export const revalidate = 0;

interface Props {
  params: {
    albumId: string;
  };
}

export default async function AlbumPromotionPage({ params: { albumId } }: Props) {
  const albumData = await AlbumService.getOne(albumId);
  const videosData = await VideoService.getPromotionVideos(albumId);

  const [album, videos] = await Promise.all([albumData, videosData]);
  if (!album) return notFound();

  const videosSorted = sortVideoByMeta(videos, 'promotion');

  return (
    <DetailsContent>
      <Title>{album.title}</Title>
      <div className="px-24">
        <div className="mx-auto flex max-w-screen-lg flex-col gap-20 lg:grid lg:grid-cols-[360px_1fr] lg:items-start">
          <AlbumCardLarge album={album} />
          <PromotionList videos={videosSorted} />
        </div>
      </div>
    </DetailsContent>
  );
}
