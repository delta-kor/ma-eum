'use client';

import Calendar from '@/components/calendar/Calendar';
import ScheduleDetailsList from '@/components/calendar/ScheduleDetailsList';
import type { CalendarDateInfo } from '@/services/schedule.service';
import { useState } from 'react';

interface Props {
  dateInfo: CalendarDateInfo;
}

export default function CalendarSection({ dateInfo }: Props) {
  const today = new Date();
  const [date, setDate] = useState<Date>(today);

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
