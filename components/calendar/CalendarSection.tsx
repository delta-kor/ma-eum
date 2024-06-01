'use client';

import Calendar from '@/components/calendar/Calendar';
import ScheduleDetailsList from '@/components/calendar/ScheduleDetailsList';
import type { CalendarDateInfo } from '@/services/schedule.service';
import { useEffect, useState } from 'react';

interface Props {
  dateInfo: CalendarDateInfo;
  today: Date;
}

export default function CalendarSection({ dateInfo, today }: Props) {
  const [date, setDate] = useState<Date>(today);

  useEffect(() => {
    const today = new Date();
    setDate(new Date(today.getFullYear(), today.getMonth(), today.getDate()));
  }, []);

  function handleDateSelect(date: Date) {
    setDate(date);
  }

  return (
    <div className="flex flex-col gap-32">
      <Calendar dateInfo={dateInfo} selectedDate={date} onDateSelect={handleDateSelect} />
      <ScheduleDetailsList selectedDate={date} />
    </div>
  );
}
