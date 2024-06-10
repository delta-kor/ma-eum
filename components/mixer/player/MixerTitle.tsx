import useMixerControl from '@/hooks/mixer-control';
import useMixerControlTime from '@/hooks/mixer-control-time';
import { ExtendedMusic } from '@/services/music.service';

interface Props {
  music: ExtendedMusic;
}

export default function MixerTitle({ music }: Props) {
  const mixerControl = useMixerControl();
  const mixerControlTime = useMixerControlTime();

  const title = music.title;
  const percentage = (mixerControlTime / mixerControl.duration) * 100;

  return (
    <div className="relative h-40 w-full cursor-pointer bg-white/10">
      <div
        style={{
          width: `${percentage}%`,
        }}
        className="h-full bg-gradient-primary"
      />
      <div className="absolute left-0 top-1/2 w-full -translate-y-1/2 text-center text-16 font-600 text-white">
        {title}
      </div>
    </div>
  );
}
