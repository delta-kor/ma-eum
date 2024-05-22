export default function ScheduleItem() {
  return (
    <div className="flex cursor-pointer items-center gap-4 rounded-16 border-3 border-white bg-gradient-to-r from-white from-20% to-primary-200 px-24 py-16 shadow-primary-slated">
      <div className="flex grow flex-col gap-4">
        <div className="text-16 font-700 text-black">SBS 인기가요</div>
        <div className="text-14 font-500 text-gray-500">15:50 ~ 16:50</div>
      </div>
      <div className="text-16 font-500 text-primary-500">5m</div>
    </div>
  );
}
