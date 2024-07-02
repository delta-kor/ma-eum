'use client';

import ScheduleDetailsList from '@/components/calendar/ScheduleDetailsList';
import type { CalendarDateInfo } from '@/services/schedule.service';
import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import Calendar from './Calendar';

interface Props {
  attached?: boolean;
  dateInfo: CalendarDateInfo;
}

export default function CalendarSection({ attached, dateInfo }: Props) {
  const todayDateTime = DateTime.now()
    .setZone('Asia/Seoul')
    .set({ hour: 0, millisecond: 0, minute: 0, second: 0 });

  const [date, setDate] = useState<DateTime>(todayDateTime);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const today = DateTime.now()
      .setZone('Asia/Seoul')
      .set({ hour: 0, millisecond: 0, minute: 0, second: 0 });

    setDate(today);
    setIsHydrated(true);
  }, []);

  function handleDateSelect(date: DateTime) {
    setDate(date);
  }

  return (
    <div
      data-attached={!!attached}
      className="flex flex-col gap-32 data-[attached=false]:grid-cols-[480px_1fr] data-[attached=false]:lg:grid data-[attached=true]:lg:gap-16"
    >
      <Calendar
        dateInfo={dateInfo}
        hydrated={isHydrated}
        selectedDate={date}
        onDateSelect={handleDateSelect}
      />
      <ScheduleDetailsList selectedDate={date} />
    </div>
  );
}
