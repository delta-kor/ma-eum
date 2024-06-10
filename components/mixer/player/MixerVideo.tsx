import useMixerControl from '@/hooks/mixer-control';
import { useEffect } from 'react';
import YouTube, { YouTubeEvent } from 'react-youtube';

export default function MixerVideo() {
  const mixerControl = useMixerControl();

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
    <YouTube
      iframeClassName="w-full h-full"
      videoId={mixerControl.video.sourceId}
      onReady={handleReady}
      className="sticky left-0 top-0 z-10 aspect-video w-full"
    />
  );
}
