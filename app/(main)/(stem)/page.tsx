import CalendarSuspense from '@/components/calendar/CalendarSuspense';
import ScheduleFeedList from '@/components/calendar/ScheduleFeedList';
import Mobile from '@/components/core/responsive/Mobile';
import Pc from '@/components/core/responsive/Pc';
import LandingLayer from '@/components/landing/LandingLayer';
import LandingWidget from '@/components/landing/LandingWidget';
import StrongMenu from '@/components/menu/StrongMenu';
import { Suspense } from 'react';

export default function MainPage() {
  return (
    <div className="flex min-h-dvh flex-col pb-24 lg:min-h-0">
      <LandingLayer />
      <div className="bg-gradient-to-b from-primary-200 to-white px-24 lg:from-white">
        <div className="flex grow flex-col gap-28 pt-48 lg:mx-auto lg:grid lg:max-w-screen-lg lg:grid-cols-2 lg:gap-48">
          <Mobile>
            <ScheduleFeedList />
          </Mobile>
          <Pc>
            <Suspense fallback={<div />}>
              <CalendarSuspense />
            </Suspense>
          </Pc>
          <div className="flex flex-col gap-16">
            <Pc className="self-start">
              <LandingWidget />
            </Pc>
            <StrongMenu />
          </div>
        </div>
      </div>
    </div>
  );
}
