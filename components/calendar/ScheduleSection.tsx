import ScheduleItem from '@/components/calendar/ScheduleItem';

export default function ScheduleSection() {
  return (
    <div className="flex flex-col gap-12 px-24">
      <div className="text-22 font-700 text-primary-500">Schedule</div>
      <div className="flex flex-col gap-10">
        <ScheduleItem />
      </div>
    </div>
  );
}
