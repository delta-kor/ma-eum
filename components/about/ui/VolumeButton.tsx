import Icon from '@/components/core/Icon';
import useAbout from '@/hooks/about';
import AboutUtil from '@/utils/about.util';
import { AnimatePresence, motion } from 'framer-motion';

interface Props {
  muted: boolean;
  setMuted: (muted: boolean) => void;
}

export default function VolumeButton({ muted, setMuted }: Props) {
  const { page } = useAbout();
  const isMutedPage = AboutUtil.isMutedPage(page);

  function handleClick() {
    setMuted(!muted);
  }

  return (
    <AnimatePresence>
      {!isMutedPage && (
        <motion.div
          key="volume"
          animate={{ opacity: 1 }}
          data-muted={muted}
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          onClick={handleClick}
          className="absolute right-32 top-32 z-10 -m-16 flex cursor-pointer items-center gap-8 rounded-8 p-16 transition-colors data-[muted=true]:bg-white/10"
        >
          <AnimatePresence>
            {muted && (
              <motion.div
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="h-16 select-none text-16 font-500 text-white"
              >
                Unmute
              </motion.div>
            )}
          </AnimatePresence>
          <Icon type={muted ? 'volumeMuted' : 'volumeHigh'} className="w-16 text-white" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
