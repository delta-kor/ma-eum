import CalendarSection from '@/components/calendar/CalendarSection';
import DetailsContent from '@/components/core/header/DetailsContent';
import { ScheduleService } from '@/services/schedule.service';
import { getKSTNow } from '@/utils/time.util';

export const revalidate = 0;

export default async function SchedulesPage() {
  const dateInfo = await ScheduleService.getCalendarDateInfo();
  const today = getKSTNow();

  return (
    <DetailsContent>
      <div className="px-24">
        <div className="pb-24 lg:mx-auto lg:max-w-screen-lg lg:pt-24">
          <CalendarSection dateInfo={dateInfo} today={today} />
        </div>
      </div>
    </DetailsContent>
  );
}
