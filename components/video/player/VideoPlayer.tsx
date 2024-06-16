'use client';

import { VideoSource } from '@prisma/client';
import YouTube from 'react-youtube';

interface Props {
  source: VideoSource;
  sourceId: string;
}

export default function VideoPlayer({ source, sourceId }: Props) {
  if (source !== VideoSource.YOUTUBE) throw new Error('Unsupported video source');

  return (
    <div className="fixed left-0 top-0 z-10 w-full lg:static">
      <div className="aspect-video-full w-full">
        <YouTube iframeClassName="size-full" videoId={sourceId} className="size-full" />
      </div>
    </div>
  );
}

export function VideoPlayerPlaceholder() {
  return <div className="-mx-24 aspect-video-full lg:hidden" />;
}
