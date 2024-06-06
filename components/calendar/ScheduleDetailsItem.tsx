import ScheduleTypeChip from '@/components/calendar/ScheduleTypeChip';
import Icon from '@/components/core/Icon';
import Translate from '@/components/core/Translate';
import { Schedule } from '@prisma/client';

interface Props {
  schedule: Schedule;
}

export default function ScheduleDetailsItem({ schedule }: Props) {
  return (
    <div className="flex flex-col gap-12 rounded-16 border-3 border-gray-100 px-24 py-16">
      <div className="flex items-center gap-16">
        <ScheduleTypeChip kind="icon" type={schedule.type} />
        <div className="flex min-w-0 flex-col gap-4">
          <div className="text-16 font-500 text-gray-500">
            <Translate>{schedule.isAllDay ? '$all_day' : schedule.dateDetails!}</Translate>
          </div>
          <div className="text-18 font-600 text-black">{schedule.title}</div>
        </div>
      </div>
      {schedule.url && (
        <a href={schedule.url} target="_blank" className="flex items-center gap-8">
          <Icon type="link" className="w-14 shrink-0 text-gray-500" />
          <div className="truncate text-14 font-600 text-gray-500 underline">{schedule.url}</div>
        </a>
      )}
    </div>
  );
}

export function ScheduleDetailsItemPlaceholder() {
  return (
    <div className="flex animate-pulse items-center gap-16 rounded-16 border-3 border-gray-100 px-24 py-16">
      <div className="rounded-8 bg-gray-100 p-8">
        <div className="size-18" />
      </div>
      <div className="flex grow flex-col gap-4">
        <div className="h-[19px] w-64 rounded-4 bg-gray-100" />
        <div className="h-[21px] w-full rounded-4 bg-gray-100" />
      </div>
    </div>
  );
}
