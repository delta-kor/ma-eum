import GradientIcon from '@/components/core/GradientIcon';

export default function ScheduleCalendarLink() {
  return (
    <div className="flex cursor-pointer items-center gap-10">
      <GradientIcon type="calendar" className="h-18" />
      <div className="text-16 font-600 text-primary-500">View Calendar</div>
    </div>
  );
}
