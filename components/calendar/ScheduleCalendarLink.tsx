import GradientIcon from '@/components/core/GradientIcon';
import Translate from '@/components/core/Translate';
import Link from 'next/link';

export default function ScheduleCalendarLink() {
  return (
    <Link href={`/schedules`} className="flex cursor-pointer items-center gap-10">
      <GradientIcon type="calendar" className="h-18" />
      <div className="text-16 font-600 text-primary-500">
        <Translate>$view_calendar</Translate>
      </div>
    </Link>
  );
}
