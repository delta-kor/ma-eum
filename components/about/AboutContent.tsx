import FluidVideo from '@/components/about/FluidVideo';
import AboutMainPage from '@/components/about/pages/MainPage';
import { AboutData } from '@/utils/about.util';

export default function AboutContent() {
  return (
    <div className="size-full">
      <FluidVideo src={AboutData.AboutVideoUrl} />
      <AboutMainPage />
    </div>
  );
}
