import CalendarSection from '@/components/calendar/CalendarSection';
import DetailsContent from '@/components/core/header/DetailsContent';
import { ScheduleService } from '@/services/schedule.service';
import MetaUtil from '@/utils/meta.util';
import { Metadata } from 'next';

export const revalidate = 3600;

export default async function SchedulesPage() {
  const dateInfo = await ScheduleService.getCalendarDateInfo();

  return (
    <DetailsContent>
      <div className="px-24">
        <div className="pb-24 lg:mx-auto lg:max-w-screen-lg lg:pt-24">
          <CalendarSection dateInfo={dateInfo} />
        </div>
      </div>
    </DetailsContent>
  );
}

export function generateMetadata(): Metadata {
  return MetaUtil.getSubpage(
    'Schedules',
    'Stay updated with the latest events and appearances of CSR(첫사랑).',
    '/schedules'
  );
}
