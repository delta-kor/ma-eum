import CalendarSuspense from '@/components/calendar/CalendarSuspense';
import ScheduleFeedList from '@/components/calendar/ScheduleFeedList';
import Mobile from '@/components/core/responsive/Mobile';
import Pc from '@/components/core/responsive/Pc';
import LandingLayer from '@/components/landing/LandingLayer';
import LandingWidget from '@/components/landing/LandingWidget';
import FeedListMenu from '@/components/menu/FeedListMenu';
import StrongMenu from '@/components/menu/StrongMenu';
import TrendingTalkArticlesMenu from '@/components/menu/TrendingTalkArticlesMenu';

export const revalidate = 60;

export default function MainPage() {
  return (
    <div className="flex min-h-dvh flex-col pb-24 lg:min-h-0">
      <LandingLayer />
      <div className="relative px-24">
        <div className="absolute left-0 top-0 -z-10 size-full max-h-[520px] bg-gradient-to-b from-primary-200 to-white lg:from-white" />
        <div className="relative flex grow flex-col gap-28 pt-48 lg:mx-auto lg:grid lg:max-w-screen-lg lg:grid-cols-2 lg:gap-48">
          <Mobile>
            <ScheduleFeedList />
          </Mobile>
          <Pc>
            <CalendarSuspense />
          </Pc>
          <div className="flex flex-col gap-28">
            <Pc className="-mb-12 self-start">
              <LandingWidget />
            </Pc>
            <StrongMenu />
            <TrendingTalkArticlesMenu />
          </div>
          <div className="col-span-full">
            <FeedListMenu />
          </div>
        </div>
      </div>
    </div>
  );
}
