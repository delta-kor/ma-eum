import Icon from '@/components/core/Icon';
import Translate from '@/components/core/Translate';
import { AlbumService } from '@/services/album.service';
import { VideoService } from '@/services/video.service';
import { PromotionVideoMeta, getMetaFromVideo } from '@/utils/video.util';
import { Video } from '@prisma/client';
import { format } from 'date-fns';
import Link from 'next/link';

interface Props {
  promotionMeta: PromotionVideoMeta;
  video: Video;
}

export default async function PromotionMetaCard({ promotionMeta, video }: Props) {
  const albumId = promotionMeta.albumId;
  const albumData = AlbumService.getOne(albumId);
  const promotionVideosData = VideoService.getPromotionVideos(albumId);

  const [album, promotionVideos] = await Promise.all([albumData, promotionVideosData]);
  if (!album || promotionVideos.length === 0) return null;

  let currentVideoIndex = promotionVideos.findIndex(item => item.id === video.id);
  if (currentVideoIndex === -1) return null;
  if (currentVideoIndex === 0) currentVideoIndex = 1;
  if (currentVideoIndex === promotionVideos.length - 1)
    currentVideoIndex = promotionVideos.length - 2;

  const selectedVideos = promotionVideos.slice(currentVideoIndex - 1, currentVideoIndex + 2);

  return (
    <div className="flex flex-col gap-16 rounded-16 bg-gray-100 px-24 py-16">
      <div className="flex items-center justify-between">
        <div className="shrink-0 text-20 font-700 text-black">
          <Translate>$promotion</Translate>
        </div>
        <div className="text-16 font-500 text-gray-500">{album.title}</div>
      </div>
      <div className="relative flex flex-col gap-16 py-12">
        <div className="absolute left-16 top-0 h-full w-3 -translate-x-1/2 bg-gray-200" />
        {selectedVideos.map(item => (
          <Link
            key={item.id}
            href={`/video/${item.id}`}
            className="relative flex items-center gap-16"
          >
            <div
              data-active={item.id === video.id}
              className="shrink-0 rounded-8 bg-gray-200 p-8 data-[active=true]:bg-gradient-primary"
            >
              <Icon type="video" className="w-16 text-white" />
            </div>
            <div className="flex flex-col gap-4">
              <div className="line-clamp-2 text-16 font-600 text-black">
                {getMetaFromVideo<PromotionVideoMeta>(item, 'promotion')?.title || video.title}
              </div>
              <div className="text-14 font-500 text-gray-500">
                {format(item.date, 'yy. MM. dd.')}
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Link
        href={`/videos/albums/${album.id}/promotion`}
        className="-my-16 py-16 text-center text-16 font-600 text-gray-500"
      >
        View All
      </Link>
    </div>
  );
}
