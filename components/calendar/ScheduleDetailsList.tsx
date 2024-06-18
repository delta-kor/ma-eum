import ScheduleDetailsItem, {
  ScheduleDetailsItemPlaceholder,
} from '@/components/calendar/ScheduleDetailsItem';
import NoItems from '@/components/core/NoItems';
import { trpc } from '@/hooks/trpc';
import { format } from 'date-fns';
import { DateTime } from 'luxon';

interface Props {
  selectedDate: DateTime;
}

export default function ScheduleDetailsList({ selectedDate }: Props) {
  const utcDate = selectedDate.toJSDate();

  const schedules = trpc.schedule.getSchedules.useQuery(
    {
      date: utcDate,
    },
    {
      queryHash: format(utcDate, 'yyyy-MM-dd'),
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  const items = schedules.data;

  return (
    <div className="flex flex-col gap-16">
      {items ? (
        items.length > 0 ? (
          items.map(schedule => <ScheduleDetailsItem key={schedule.id} schedule={schedule} />)
        ) : (
          <NoItems />
        )
      ) : (
        <>
          <ScheduleDetailsItemPlaceholder />
          <ScheduleDetailsItemPlaceholder />
          <ScheduleDetailsItemPlaceholder />
        </>
      )}
    </div>
  );
}
