import MixerLyricsLine from '@/components/mixer/player/MixerLyricsLine';
import useMixerControl from '@/hooks/mixer-control';
import { Line } from '@/utils/lily.util';
import { Music } from '@prisma/client';

interface Props {
  lines: Line[];
  music: Music;
}

export default function MixerLyrics({ lines, music }: Props) {
  const mixerControl = useMixerControl();
  const activeLyrics = mixerControl.activeLyrics;
  if (activeLyrics.length !== 4) return null;

  return (
    <div className="relative flex flex-col items-center gap-8 overflow-hidden rounded-8 bg-gray-50 py-16">
      <div className="absolute top-[-13px] w-full px-8">
        <MixerLyricsLine lyric={activeLyrics[0]} hide />
      </div>
      <div className="w-full px-8">
        <MixerLyricsLine lyric={activeLyrics[1]} active />
      </div>
      <div className="w-full px-8">
        <MixerLyricsLine lyric={activeLyrics[2]} />
      </div>
      <div className="absolute bottom-[-13px] w-full px-8">
        <MixerLyricsLine lyric={activeLyrics[3]} hide />
      </div>
    </div>
  );
}
