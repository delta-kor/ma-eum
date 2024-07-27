import Icon from '@/components/core/Icon';
import Translate from '@/components/core/Translate';
import MetaWrapper from '@/components/video/player/meta/MetaWrapper';
import { AlbumService } from '@/services/album.service';
import { ExtendedVideo, VideoService } from '@/services/video.service';
import { formatTimeAsDate } from '@/utils/time.util';
import { PromotionVideoMeta, getMetaFromVideo, sliceVideosAround } from '@/utils/video.util';
import Link from 'next/link';

interface Props {
  promotionMeta: PromotionVideoMeta;
  video: ExtendedVideo;
}

export default async function PromotionMetaCard({ promotionMeta, video }: Props) {
  const albumId = promotionMeta.albumId;
  const albumData = AlbumService.getOne(albumId);
  const promotionVideosData = VideoService.getPromotionVideos(albumId);

  const [album, promotionVideos] = await Promise.all([albumData, promotionVideosData]);
  if (!album || promotionVideos.length === 0) return null;

  const selectedVideos = sliceVideosAround(promotionVideos, video, 1);

  return (
    <MetaWrapper
      topFor="promotion"
      className="flex flex-col gap-16 rounded-16 bg-gray-50 px-24 py-16"
    >
      <div className="flex items-center justify-between gap-16">
        <div className="shrink-0 text-20 font-700 text-black">
          <Translate>$promotion</Translate>
        </div>
        <div className="truncate text-16 font-500 text-gray-500">{album.title}</div>
      </div>
      <div className="relative flex flex-col gap-16 py-12">
        <div className="absolute left-16 top-0 h-full w-3 -translate-x-1/2 bg-gray-200" />
        {selectedVideos.map(item => (
          <Link
            key={item.id}
            href={{
              pathname: `/video/${item.id}`,
              query: { top: 'promotion' },
            }}
            prefetch
            className="jelly jelly-reduced relative flex items-center gap-16"
          >
            <div
              data-active={item.id === video.id}
              className="shrink-0 rounded-8 bg-gray-200 p-8 data-[active=true]:bg-gradient-primary"
            >
              <Icon type="video" className="w-16 text-white" />
            </div>
            <div className="jelly-meta flex grow flex-col gap-4">
              <div className="line-clamp-2 text-16 font-600 text-black">
                {getMetaFromVideo<PromotionVideoMeta>(item, 'promotion')?.title || video.title}
              </div>
              <div className="text-14 font-500 text-gray-500">{formatTimeAsDate(video.date)}</div>
            </div>
          </Link>
        ))}
      </div>
      <Link
        href={`/videos/albums/${album.id}/promotion`}
        className="jelly group -my-16 flex items-center justify-center py-16 text-16 font-600 text-gray-500"
      >
        <div className="-mx-8 -my-4 rounded-8 px-8 py-4 transition-colors group-hover:bg-gray-200/50">
          <Translate>$view_all</Translate>
        </div>
      </Link>
    </MetaWrapper>
  );
}
