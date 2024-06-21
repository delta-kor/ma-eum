'use client';

import { VideoSource } from '@prisma/client';
import YouTube from 'react-youtube';

interface Props {
  shorts: boolean;
  source: VideoSource;
  sourceId: string;
}

export default function VideoPlayer({ shorts, source, sourceId }: Props) {
  if (source !== VideoSource.YOUTUBE) throw new Error('Unsupported video source');

  return (
    <div className="fixed left-0 top-0 z-10 w-full lg:static">
      <div
        data-shorts={shorts}
        className="group aspect-video-full w-full data-[shorts=true]:aspect-shorts-full data-[shorts=true]:max-h-[40vh] lg:!max-h-none lg:data-[shorts=true]:aspect-shorts-full"
      >
        <YouTube
          iframeClassName="size-full"
          opts={{
            playerVars: {
              autoplay: 1,
              iv_load_policy: 3,
            },
          }}
          videoId={sourceId}
          className="size-full group-data-[shorts=true]:max-h-[40vh] lg:!max-h-none"
        />
      </div>
    </div>
  );
}

interface PlaceholderProps {
  shorts: boolean;
}

export function VideoPlayerPlaceholder({ shorts }: PlaceholderProps) {
  return (
    <div
      data-shorts={shorts}
      className="aspect-video-full w-full data-[shorts=true]:aspect-shorts-full data-[shorts=true]:max-h-[40vh] lg:hidden"
    />
  );
}
