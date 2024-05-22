import ScheduleSection from '@/components/calendar/ScheduleSection';
import LandingLayer from '@/components/landing/LandingLayer';

export default function MainPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <LandingLayer />
      <div className="grow bg-primary-100 pt-48">
        <ScheduleSection />
      </div>
    </div>
  );
}
