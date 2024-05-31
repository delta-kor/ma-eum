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
      <div className="flex flex-col gap-20">
        <div className="px-24">
          <AlbumCardLarge album={album} />
        </div>
        <PromotionList videos={videosSorted} />
      </div>
    </DetailsContent>
  );
}
