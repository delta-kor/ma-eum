import AlbumCardLarge from '@/components/card/AlbumCardLarge';
import DetailsContent from '@/components/core/header/DetailsContent';
import Title from '@/components/core/header/Title';
import PromotionSection from '@/components/video/PromotionSection';
import { AlbumService } from '@/services/album';
import { VideoService } from '@/services/video';
import { PromotionVideoMeta, getMetaFromVideo } from '@/utils/video';
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

  const videosSorted = [...videos].sort(
    (a, b) =>
      (getMetaFromVideo<PromotionVideoMeta>(a, 'promotion')?.order || -1) -
      (getMetaFromVideo<PromotionVideoMeta>(b, 'promotion')?.order || -1)
  );

  return (
    <DetailsContent>
      <div className="flex flex-col gap-20">
        <Title key={album.title}>{album.title}</Title>
        <div className="px-24">
          <AlbumCardLarge album={album} />
        </div>
        <PromotionSection videos={videosSorted} />
      </div>
    </DetailsContent>
  );
}
