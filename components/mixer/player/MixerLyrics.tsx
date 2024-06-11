import MixerLyricsLine from '@/components/mixer/player/MixerLyricsLine';
import useMixerControl from '@/hooks/mixer-control';
import useMixerControlTime from '@/hooks/mixer-control-time';
import { Line, OffsetDelay } from '@/utils/lily.util';
import { getVideoRelativeTime } from '@/utils/session.util';
import { Music } from '@prisma/client';

interface Props {
  lines: Line[];
  music: Music;
}

export default function MixerLyrics({ lines, music }: Props) {
  const mixerControl = useMixerControl();
  const mixerControlTime = useMixerControlTime();
  const currentTime = getVideoRelativeTime(music, mixerControl.video, mixerControlTime);

  const breakPoints: number[] = lines.map(
    // @ts-ignore
    line => line.chips.find(chip => chip.type === 'text').start
  );
  let lineIndex = breakPoints.findIndex(breakPoint => breakPoint! > currentTime + OffsetDelay) - 1;

  if (lineIndex === -1) lineIndex = 0;
  if (lineIndex === -2) lineIndex = breakPoints.length - 1;

  const slicedLines: (Line | null)[] = [];
  for (let i = 0; i < 4; i++) {
    const line = lines[lineIndex + i - 1];
    slicedLines.push(line || null);
  }

  return (
    <div className="relative flex flex-col items-center gap-8 overflow-hidden rounded-8 bg-gray-50 py-16">
      <div className="absolute top-[-13px] w-full px-8">
        <MixerLyricsLine index={lineIndex} line={slicedLines[0]} hide />
      </div>
      <div className="w-full px-8">
        <MixerLyricsLine index={lineIndex + 1} line={slicedLines[1]} active />
      </div>
      <div className="w-full px-8">
        <MixerLyricsLine index={lineIndex + 2} line={slicedLines[2]} />
      </div>
      <div className="absolute bottom-[-13px] w-full px-8">
        <MixerLyricsLine index={lineIndex + 3} line={slicedLines[3]} hide />
      </div>
    </div>
  );
}
