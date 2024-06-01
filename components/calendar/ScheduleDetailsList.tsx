import ScheduleDetailsItem from '@/components/calendar/ScheduleDetailsItem';
import NoItems from '@/components/core/NoItems';
import { trpc } from '@/hooks/trpc';

interface Props {
  selectedDate: Date;
}

export default function ScheduleDetailsList({ selectedDate }: Props) {
  const schedules = trpc.schedule.getSchedules.useQuery(
    {
      date: selectedDate,
    },
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  const items = schedules.data;

  return (
    <div className="flex flex-col gap-16 px-24 pb-24">
      {items ? (
        items.length > 0 ? (
          items.map(schedule => <ScheduleDetailsItem key={schedule.id} schedule={schedule} />)
        ) : (
          <NoItems />
        )
      ) : (
        <></>
      )}
    </div>
  );
}
