import CalendarSection from '@/components/calendar/CalendarSection';
import DetailsContent from '@/components/core/header/DetailsContent';

export const revalidate = 0;

export default async function SchedulesPage() {
  return (
    <DetailsContent>
      <CalendarSection />
    </DetailsContent>
  );
}
