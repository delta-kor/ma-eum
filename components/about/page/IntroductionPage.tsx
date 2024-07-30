import useAbout from '@/hooks/about';
import AboutUtil from '@/utils/about.util';
import { AnimatePresence, motion } from 'framer-motion';

export default function AboutIntroductionPage() {
  const { index, setPage } = useAbout();

  function handleNext() {
    console.log('next');
    const length = AboutUtil.getIntroductionLength();
    if (index + 1 < length) setPage('introduction', index + 1);
  }

  const introductionText = AboutUtil.getIntroductionText(index);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      onClick={handleNext}
      className="relative flex size-full cursor-pointer flex-col items-center justify-center"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          animate={{
            opacity: 1,
            transition: { delay: 0.2, duration: 0.5, ease: 'easeInOut' },
            y: 0,
          }}
          exit={{ opacity: 0, y: -20 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="absolute inset-x-24 bottom-24 whitespace-pre-line text-20 font-400 leading-7 text-white"
        >
          {introductionText}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
