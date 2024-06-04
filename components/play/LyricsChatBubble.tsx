import LazyImage from '@/components/core/LazyImage';
import Translate from '@/components/core/Translate';
import LyricsChatChip from '@/components/play/LyricsChatChip';
import { Line } from '@/utils/lily.util';
import { ImageUrl } from '@/utils/url.util';
import { Member, getMemberName } from '@/utils/video.util';
import { AnimatePresence, motion } from 'framer-motion';

interface Props {
  color: string;
  currentTime: number;
  index: number;
  lines: Line[];
  members: (Member | null)[];
}

export default function LyricsChatBubble({ color, currentTime, index, lines, members }: Props) {
  const member = members.length > 1 ? null : members[0];

  const transition = { duration: 0.5, ease: 'circOut' };

  return (
    <motion.div
      key={index}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      initial={{ opacity: 1, scale: 0 }}
      transition={transition}
      className="flex min-w-0 items-start gap-12"
    >
      <motion.div layout="position" layoutId={`image_${index}`} transition={transition}>
        <LazyImage
          src={ImageUrl.member(member)}
          className="size-[42px] shrink-0 rounded-full border-3 border-white bg-gray-100"
        />
      </motion.div>
      <div className="flex min-w-0 flex-col items-start justify-end gap-6">
        <motion.div
          layout="position"
          layoutId={`member_${index}`}
          transition={transition}
          className="text-16 font-600 text-white"
        >
          <Translate>{getMemberName(member)}</Translate>
        </motion.div>
        <motion.div
          layoutId={`bubble_${index}`}
          transition={transition}
          layout
          className="flex flex-col items-start justify-end gap-10 rounded-8 bg-white p-16"
        >
          <AnimatePresence>
            {lines.map((line, lineIndex) => (
              <motion.div
                key={lineIndex}
                animate={{ scale: 1 }}
                initial={{ scale: 0 }}
                layoutId={`text_${index}_${lineIndex}`}
                transition={transition}
                className="flex flex-wrap"
              >
                {line.chips.map((chip, chipIndex) => (
                  <LyricsChatChip
                    key={chipIndex}
                    chip={chip}
                    color={color}
                    currentTime={currentTime}
                  />
                ))}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}
