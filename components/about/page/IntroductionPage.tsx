import Icon from '@/components/core/Icon';
import useAbout from '@/hooks/about';
import { AboutPage } from '@/providers/AboutProvider';
import AboutUtil from '@/utils/about.util';
import { AnimatePresence, motion } from 'framer-motion';

export default function AboutIntroductionPage() {
  const { index, page, setPage } = useAbout();
  const isEnded = index === AboutUtil.getIntroductionLength();

  function handleNext() {
    const length = AboutUtil.getIntroductionLength();
    if (index + 1 <= length) setPage('introduction', index + 1);
  }

  function handleHandleClick(index: number) {
    setPage('introduction', index);
  }

  function handleReplay() {
    setPage('introduction', 0);
  }

  function handleActionClick(page: AboutPage) {
    setPage(page, 0);
  }

  const indexLength = AboutUtil.getIntroductionLength();
  const introductionText = AboutUtil.getIntroductionText(index);

  return (
    <motion.div
      animate={{ opacity: 1 }}
      data-ended={isEnded}
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      onClick={handleNext}
      className="relative flex size-full flex-col justify-end gap-16 p-24 data-[ended=false]:cursor-pointer"
    >
      <AnimatePresence mode="wait">
        {!isEnded && (
          <motion.div
            key="contents"
            exit={{ opacity: 0 }}
            className="flex flex-col justify-end gap-16"
          >
            <AnimatePresence>
              {index === 0 && (
                <motion.div
                  animate={{ opacity: 0.3, transition: { delay: 1, duration: 0.5 } }}
                  exit={{ opacity: 0, y: -10 }}
                  initial={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="-mb-4 flex items-center gap-6"
                >
                  <span className="text-16 font-400 text-white">Tap anywhere to continue</span>
                  <Icon type="right" className="w-10 text-white" />
                </motion.div>
              )}
            </AnimatePresence>

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
        )}

        {isEnded && (
          <motion.div
            key="end"
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
          >
            <div className="flex items-center gap-12">
              <div
                onClick={() => handleActionClick('profile')}
                className="jelly grow basis-0 cursor-pointer rounded-16 bg-white px-12 py-16 text-center text-20 font-600 text-black hover:scale-[1.02]"
              >
                Profile
              </div>
              <div
                onClick={() => handleActionClick('discography')}
                className="jelly grow basis-0 cursor-pointer rounded-16 bg-white/20 px-12 py-16 text-center text-20 font-400 text-white hover:scale-[1.02]"
              >
                Discography
              </div>
            </div>

            <div
              onClick={handleReplay}
              className="jelly absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col items-center gap-8 rounded-8 bg-black-real/50 p-32 hover:scale-105"
            >
              <Icon type="replay" className="w-32 text-white" />
              <div className="text-20 font-500 text-white">Restart</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
