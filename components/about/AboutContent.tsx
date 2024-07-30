import FluidVideo from '@/components/about/FluidVideo';
import AboutLandingPage from '@/components/about/pages/LandingPage';
import CloseButton from '@/components/about/ui/CloseButton';
import useAbout from '@/hooks/about';
import AboutUtil from '@/utils/about.util';
import { AnimatePresence } from 'framer-motion';

export default function AboutContent() {
  const { index, page } = useAbout();

  return (
    <div className="relative size-full">
      <FluidVideo src={AboutUtil.getBackgroundVideo(page, index)} />
      <CloseButton />
      <AnimatePresence mode="wait">{page === 'landing' && <AboutLandingPage />}</AnimatePresence>
    </div>
  );
}
