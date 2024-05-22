import Icon from '@/components/core/Icon';

export default function ScheduleCalendarLink() {
  return (
    <div className="flex items-center gap-10">
      <Icon type="@calendar" className="h-18" />
      <div className="text-16 font-600 text-primary-500">View Calendar</div>
    </div>
  );
}
