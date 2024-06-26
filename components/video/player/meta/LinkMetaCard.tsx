import Icon from '@/components/core/Icon';
import LazyImage from '@/components/core/LazyImage';
import MetaWrapper from '@/components/video/player/meta/MetaWrapper';
import { VideoService } from '@/services/video.service';
import { ImageUrl } from '@/utils/url.util';
import { LinkVideoMeta } from '@/utils/video.util';
import { VideoSource } from '@prisma/client';
import { format } from 'date-fns';
import Link from 'next/link';

interface Props {
  linkMeta: LinkVideoMeta;
}

export default async function LinkMetaCard({ linkMeta }: Props) {
  const videoId = linkMeta.videoId;
  const videoData = VideoService.getOne(videoId);

  const [video] = await Promise.all([videoData]);
  if (!video || video.source !== VideoSource.YOUTUBE) return null;

  return (
    <MetaWrapper topFor="link" alwaysTop size>
      <Link href={`/video/${video.id}`} className="flex items-center gap-16">
        <LazyImage
          src={ImageUrl.youtubeThumbnail(video.sourceId)}
          className="aspect-video h-48 shrink-0 rounded-8 bg-gray-100"
        />
        <div className="flex min-w-0 grow flex-col gap-4">
          <div className="line-clamp-2 text-16 font-600 text-black">{video.title}</div>
          <div className="text-14 font-500 text-gray-500">{format(video.date, 'yy. MM. dd.')}</div>
        </div>
        <Icon type="right" className="w-16 shrink-0 text-gray-200" />
      </Link>
    </MetaWrapper>
  );
}
