import { Line } from '@/utils/lily.util';
import { motion } from 'framer-motion';

interface Props {
  active?: boolean;
  hide?: boolean;
  index: number;
  line: Line | null;
}

export default function MixerLyricsLine({ active, hide, index, line }: Props) {
  if (!line) return <div className="h-[21px]" />;

  const content = line.chips.map(chip => chip.text).join('');
  const opacity = active ? 1 : 0.5;

  return (
    <motion.div
      key={index}
      animate={{ opacity: hide ? 0 : opacity }}
      data-active={active}
      initial={{ opacity: hide ? 0 : opacity }}
      layoutId={`${index}`}
      className="truncate text-center text-18 font-500"
    >
      {content}
    </motion.div>
  );
}
