import FluidVideo from '@/components/about/FluidVideo';
import AboutDiscographyPage from '@/components/about/page/DiscographyPage';
import AboutIntroductionPage from '@/components/about/page/IntroductionPage';
import AboutLandingPage from '@/components/about/page/LandingPage';
import AboutMemberPage from '@/components/about/page/MemberPage';
import AboutProfilePage from '@/components/about/page/ProfilePage';
import CloseButton from '@/components/about/ui/CloseButton';
import VolumeButton from '@/components/about/ui/VolumeButton';
import useAbout from '@/hooks/about';
import AboutUtil from '@/utils/about.util';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function AboutContent() {
  const { index, page } = useAbout();
  const [isInitial, setIsInitial] = useState(true);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    setIsInitial(false);
  }, []);

  return (
    <div className="relative size-full">
      <FluidVideo muted={muted} src={AboutUtil.getBackgroundVideo(page, index)} />
      <CloseButton />
      <VolumeButton muted={muted} setMuted={setMuted} />
      <AnimatePresence mode="wait">
        {page === 'landing' && <AboutLandingPage key="landing" initial={isInitial} />}
        {page === 'introduction' && <AboutIntroductionPage key="introduction" />}
        {page === 'profile' && <AboutProfilePage key="profile" />}
        {page === 'member' && <AboutMemberPage key="member" />}
        {page === 'discography' && <AboutDiscographyPage key="discography" />}
      </AnimatePresence>
    </div>
  );
}
