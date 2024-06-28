import CalendarSection from '@/components/calendar/CalendarSection';
import { ScheduleService } from '@/services/schedule.service';

export default async function CalendarSuspense() {
  const dateInfo = await ScheduleService.getCalendarDateInfo();
  return <CalendarSection dateInfo={dateInfo} attached />;
}
