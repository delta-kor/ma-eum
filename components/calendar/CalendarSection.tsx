'use client';

import ScheduleDetailsList from '@/components/calendar/ScheduleDetailsList';
import type { CalendarDateInfo } from '@/services/schedule.service';
import { DateTime } from 'luxon';
import { useState } from 'react';
import Calendar from './Calendar';

interface Props {
  attached?: boolean;
  dateInfo: CalendarDateInfo;
  today: Date;
}

export default function CalendarSection({ attached, dateInfo, today }: Props) {
  const todayDateTime = DateTime.fromJSDate(today, { zone: 'Asia/Seoul' });
  const [date, setDate] = useState<DateTime>(todayDateTime);

  function handleDateSelect(date: DateTime) {
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
