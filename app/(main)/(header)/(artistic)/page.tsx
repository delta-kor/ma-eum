import ScheduleFeedList from '@/components/calendar/ScheduleFeedList';
import Pc from '@/components/core/responsive/Pc';
import LandingLayer from '@/components/landing/LandingLayer';
import LandingWidget from '@/components/landing/LandingWidget';
import StrongMenu from '@/components/menu/StrongMenu';
import TrendingTalkArticlesMenu from '@/components/menu/TrendingTalkArticlesMenu';
import SnsList from '@/components/sns/SnsList';

export const revalidate = 60;

export default function MainPage() {
  return (
    <div className="flex min-h-dvh flex-col pb-24 lg:min-h-0">
      <LandingLayer />
      <div className="relative px-24">
        <div className="absolute left-0 top-0 -z-10 size-full max-h-[520px] bg-gradient-to-b from-primary-200 to-white lg:from-white" />
        <div className="relative flex grow flex-col gap-28 pt-48 lg:mx-auto lg:grid lg:max-w-screen-lg lg:grid-cols-2 lg:gap-x-48 lg:gap-y-24">
          <div className="flex flex-col gap-28">
            <Pc className="-mb-12 self-start">
              <LandingWidget />
            </Pc>
            <ScheduleFeedList />
            <StrongMenu />
          </div>
          <div className="flex flex-col gap-28">
            <TrendingTalkArticlesMenu />
          </div>
          <div className="col-span-full">
            <SnsList />
          </div>
        </div>
      </div>
    </div>
  );
}
