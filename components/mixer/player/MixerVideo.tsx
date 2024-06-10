import useMixerControl from '@/hooks/mixer-control';
import YouTube from 'react-youtube';

export default function MixerVideo() {
  const mixerControl = useMixerControl();

  return (
    <YouTube
      iframeClassName="w-full h-full"
      videoId={mixerControl.video.sourceId}
      className="fixed left-0 top-0 aspect-video w-full"
    />
  );
}
