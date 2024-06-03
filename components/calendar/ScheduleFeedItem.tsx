import Translate from '@/components/core/Translate';
import { getRelativeTime } from '@/utils/date.util';
import { Schedule } from '@prisma/client';

interface Props {
  schedule: Schedule;
  today: Date;
}

export default function ScheduleFeedItem({ schedule, today }: Props) {
  return (
    <div className="flex cursor-pointer items-center gap-8 rounded-16 border-3 border-white bg-gradient-to-r from-white from-20% to-primary-200 px-24 py-16 shadow-primary-slated">
      <div className="flex grow flex-col gap-4">
        <div className="text-16 font-700 text-black">{schedule.title}</div>
        <div className="text-14 font-500 text-gray-500">
          <Translate>{schedule.isAllDay ? '$all_day' : schedule.dateDetails!}</Translate>
        </div>
      </div>
      <div className="shrink-0 text-16 font-500 text-primary-500">
        {getRelativeTime(schedule.date, today, schedule.isAllDay)}
      </div>
    </div>
  );
}