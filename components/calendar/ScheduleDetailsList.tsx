import ScheduleDetailsItem, {
  ScheduleDetailsItemPlaceholder,
} from '@/components/calendar/ScheduleDetailsItem';
import NoItems from '@/components/core/NoItems';
import { trpc } from '@/hooks/trpc';
import { format } from 'date-fns';

interface Props {
  selectedDate: Date;
}

export default function ScheduleDetailsList({ selectedDate }: Props) {
  const schedules = trpc.schedule.getSchedules.useQuery(
    {
      date: selectedDate,
    },
    {
      queryHash: format(selectedDate, 'yyyy-MM-dd'),
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
