import ScheduleSection from '@/components/calendar/ScheduleSection';
import LandingLayer from '@/components/landing/LandingLayer';
import StrongMenu from '@/components/menu/StrongMenu';

export default function MainPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <LandingLayer />
      <div className="flex grow flex-col gap-28 bg-gradient-to-b from-primary-200 to-white pt-48">
        <ScheduleSection />
        <StrongMenu />
      </div>
    </div>
  );
}
