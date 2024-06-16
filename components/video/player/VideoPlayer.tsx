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
    <div className="-mx-24">
      <div className="sticky inset-x-0 top-0 aspect-video w-full">
        <YouTube iframeClassName="size-full" videoId={sourceId} className="size-full" />
      </div>
    </div>
  );
}
