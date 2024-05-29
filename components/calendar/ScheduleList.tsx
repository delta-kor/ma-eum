import ScheduleCalendarLink from '@/components/calendar/ScheduleCalendarLink';
import ScheduleItem from '@/components/calendar/ScheduleItem';

export default function ScheduleList() {
  return (
    <div className="flex flex-col gap-12 px-24">
      <div className="text-22 font-700 text-primary-500">Schedule</div>
      <div className="flex flex-col items-center gap-20">
        <div className="flex flex-col gap-10 self-stretch">
          <ScheduleItem />
          <ScheduleItem />
        </div>
        <ScheduleCalendarLink />
      </div>
    </div>
  );
}
