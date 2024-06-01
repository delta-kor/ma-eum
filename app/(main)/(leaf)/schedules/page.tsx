import CalendarSection from '@/components/calendar/CalendarSection';
import DetailsContent from '@/components/core/header/DetailsContent';
import { ScheduleService } from '@/services/schedule.service';

export const revalidate = 0;

export default async function SchedulesPage() {
  const dateInfo = await ScheduleService.getCalendarDateInfo();
  const today = new Date();

  return (
    <DetailsContent>
      <CalendarSection dateInfo={dateInfo} today={today} />
    </DetailsContent>
  );
}
