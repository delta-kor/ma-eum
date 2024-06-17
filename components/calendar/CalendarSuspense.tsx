import CalendarSection from '@/components/calendar/CalendarSection';
import { ScheduleService } from '@/services/schedule.service';
import { getKSTNow } from '@/utils/time.util';

export default async function CalendarSuspense() {
  const dateInfo = await ScheduleService.getCalendarDateInfo();
  const today = getKSTNow();

  return <CalendarSection dateInfo={dateInfo} today={today} attached />;
}
