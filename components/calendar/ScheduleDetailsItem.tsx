import Icon from '@/components/core/Icon';
import { Schedule } from '@prisma/client';

interface Props {
  schedule: Schedule;
}

export default function ScheduleDetailsItem({ schedule }: Props) {
  return (
    <div className="flex items-center gap-16 rounded-16 border-3 border-gray-100 px-24 py-16">
      <div className="rounded-8 bg-gradient-primary p-8">
        <Icon type="discover" className="w-18 text-white" />
      </div>
      <div className="flex flex-col gap-4">
        <div className="text-16 font-500 text-gray-500">
          {schedule.isAllDay ? '하루종일' : schedule.dateDetails}
        </div>
        <div className="text-18 font-600 text-black">{schedule.title}</div>
      </div>
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
