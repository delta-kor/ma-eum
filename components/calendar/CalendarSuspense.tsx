import CalendarSection from '@/components/calendar/CalendarSection';
import { ScheduleService } from '@/services/schedule.service';
import { DateTime } from 'luxon';

export default async function CalendarSuspense() {
  const dateInfo = await ScheduleService.getCalendarDateInfo();
  const today = DateTime.local({ zone: 'Asia/Seoul' }).toJSDate();

  return <CalendarSection dateInfo={dateInfo} today={today} attached />;
}
