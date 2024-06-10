import useMixerControl from '@/hooks/mixer-control';
import { useEffect, useRef } from 'react';
import YouTube, { YouTubeEvent } from 'react-youtube';

export default function MixerVideo() {
  const mixerControl = useMixerControl();
  const initialVideoIdRef = useRef<string>(mixerControl.video.sourceId);

  useEffect(() => {
    return handleDismount;
  }, []);

  function handleDismount() {
    mixerControl.setPlayer(null);
  }

  function handleReady(e: YouTubeEvent) {
    mixerControl.setPlayer(e.target);
  }

  return (
    <div className="sticky left-0 top-0 z-10 aspect-video w-full bg-black-real">
      <YouTube
        iframeClassName="w-full h-full"
        opts={{
          playerVars: {
            autoplay: 1,
          },
        }}
        videoId={initialVideoIdRef.current}
        onReady={handleReady}
        className="size-full"
      />
    </div>
  );
}
