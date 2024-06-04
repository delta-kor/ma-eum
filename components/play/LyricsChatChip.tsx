import { Chip, OffsetDelay, rangePercentage } from '@/utils/lily.util';

interface Props {
  chip: Chip;
  color: string;
  currentTime: number;
}

export default function LyricsChatChip({ chip, color, currentTime }: Props) {
  if (chip.type === 'punctuation')
    return <span className="whitespace-pre text-18 font-600 text-gray-200">{chip.text}</span>;

  if (chip.type === 'text') {
    const percentage = rangePercentage(
      (Math.max(currentTime - chip.start + OffsetDelay, 0) / (chip.end - chip.start)) * 100
    );
    return (
      <span className="relative">
        <div className="text-18 font-600 text-gray-200">{chip.text}</div>
        <div
          style={{
            color,
            width: `${percentage}%`,
          }}
          className="absolute left-0 top-0 h-full overflow-hidden text-18 font-600"
        >
          {chip.text}
        </div>
      </span>
    );
  }
}
