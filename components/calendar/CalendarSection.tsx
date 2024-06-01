import Calendar from '@/components/calendar/Calendar';
import { ScheduleService } from '@/services/schedule.service';

export default async function CalendarSection() {
  const dateInfo = await ScheduleService.getCalendarDateInfo();

  return (
    <div className="flex flex-col gap-32">
      <Calendar dateInfo={dateInfo} />
    </div>
  );
}
