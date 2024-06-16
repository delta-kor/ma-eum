'use client';

import Icon from '@/components/core/Icon';
import { VideoUrl } from '@/utils/url.util';
import { VideoSource } from '@prisma/client';

interface Props {
  source: VideoSource;
  sourceId: string;
  title: string;
}

export default function VideoShare({ source, sourceId, title }: Props) {
  if (source !== VideoSource.YOUTUBE) throw new Error('Unsupported video source');

  function handleShareClick() {
    navigator.share
      ? navigator.share({
          text: title,
          title,
          url: VideoUrl.youtube(sourceId),
        })
      : alert('Your browser does not support the Web Share API');
  }

  return (
    <div className="flex items-center gap-6">
      <a
        href={VideoUrl.youtube(sourceId)}
        target="_blank"
        className="flex shrink-0 items-center gap-8 rounded-8 bg-gradient-red px-12 py-8"
      >
        <Icon type="play" className="w-14 shrink-0 text-white" />
        <div className="text-16 font-500 text-white">YouTube</div>
      </a>
      <div onClick={handleShareClick} className="shrink-0 p-10">
        <Icon type="share" className="w-16 text-gray-200" />
      </div>
    </div>
  );
}
