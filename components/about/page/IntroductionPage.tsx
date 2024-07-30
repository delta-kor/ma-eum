import useAbout from '@/hooks/about';
import AboutUtil from '@/utils/about.util';
import { AnimatePresence, motion } from 'framer-motion';

export default function AboutIntroductionPage() {
  const { index, page, setPage } = useAbout();

  function handleNext() {
    const length = AboutUtil.getIntroductionLength();
    if (index + 1 < length) setPage('introduction', index + 1);
  }

  function handleHandleClick(index: number) {
    setPage('introduction', index);
  }

  const indexLength = AboutUtil.getIntroductionLength();
  const introductionText = AboutUtil.getIntroductionText(index);

  return (
    <motion.div
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      onClick={handleNext}
      className="relative flex size-full cursor-pointer flex-col justify-end gap-16 p-24"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          animate={{
            opacity: 1,
            transition: { duration: 0.5, ease: 'easeInOut' },
            y: 0,
          }}
          exit={{ opacity: 0, y: -10 }}
          initial={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="whitespace-pre-line text-20 font-400 leading-7 text-white"
        >
          {introductionText}
        </motion.div>
      </AnimatePresence>
      <div className="flex w-full items-center gap-4">
        {Array.from({ length: indexLength }).map((_, i) => (
          <motion.div
            key={i}
            animate={i === index && page === 'introduction' ? 'active' : 'initial'}
            initial="initial"
            variants={{
              active: { opacity: 1, transition: { delay: 0.5 } },
              initial: { opacity: 0.2 },
            }}
            onClick={e => {
              e.stopPropagation();
              handleHandleClick(i);
            }}
            className="-my-16 grow cursor-pointer py-16"
          >
            <div className="h-4 w-full rounded-full bg-white" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
