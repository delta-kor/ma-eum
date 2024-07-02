import ScheduleCalendarLink from '@/components/calendar/ScheduleCalendarLink';
import ScheduleFeedItem from '@/components/calendar/ScheduleFeedItem';
import { ScheduleService } from '@/services/schedule.service';
import { DateTime } from 'luxon';

export default async function ScheduleFeedList() {
  const today = DateTime.now()
    .setZone('Asia/Seoul')
    .set({ hour: 0, millisecond: 0, minute: 0, second: 0 });
  const feeds = await ScheduleService.getScheduleFeeds(today.toJSDate());

  return (
    <div className="flex flex-col gap-12">
      <div className="text-22 font-700 text-primary-500">Schedule</div>
      <div className="flex flex-col items-center gap-20">
        <div className="flex flex-col gap-10 self-stretch">
          {feeds.map(feed => (
            <ScheduleFeedItem key={feed.id} schedule={feed} />
          ))}
        </div>
        <ScheduleCalendarLink />
      </div>
    </div>
  );
}
