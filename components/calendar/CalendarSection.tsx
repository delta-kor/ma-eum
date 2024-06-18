'use client';

import Calendar from '@/components/calendar/Calendar';
import ScheduleDetailsList from '@/components/calendar/ScheduleDetailsList';
import type { CalendarDateInfo } from '@/services/schedule.service';
import { removeTime } from '@/utils/time.util';
import { useEffect, useState } from 'react';

interface Props {
  attached?: boolean;
  dateInfo: CalendarDateInfo;
  today: Date;
}

export default function CalendarSection({ attached, dateInfo, today }: Props) {
  const [date, setDate] = useState<Date>(today);

  useEffect(() => {
    const today = removeTime(new Date());
    setDate(today);
  }, []);

  function handleDateSelect(date: Date) {
    setDate(date);
  }

  return (
    <div
      data-attached={!!attached}
      className="flex flex-col gap-32 data-[attached=false]:grid-cols-[480px_1fr] data-[attached=false]:lg:grid data-[attached=true]:lg:gap-16"
    >
      <Calendar dateInfo={dateInfo} selectedDate={date} onDateSelect={handleDateSelect} />
      <ScheduleDetailsList selectedDate={date} />
    </div>
  );
}
