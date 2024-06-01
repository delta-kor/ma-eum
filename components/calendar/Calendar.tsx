'use client';

import Icon from '@/components/core/Icon';
import type { CalendarDateInfo } from '@/services/schedule.service';
import {
  addDays,
  differenceInCalendarDays,
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import { useMemo, useState } from 'react';

interface Props {
  dateInfo: CalendarDateInfo;
}

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function Calendar({}: Props) {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<number>(new Date().getMonth());

  const currentDate = new Date(year, month);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const dates = useMemo(() => {
    const monthArray = [];
    let day = startDate;
    while (differenceInCalendarDays(endDate, day) >= 0) {
      monthArray.push(day);
      day = addDays(day, 1);
    }
    return monthArray;
  }, [startDate, endDate]);

  return (
    <div className="flex flex-col items-center gap-24">
      <div className="flex items-center gap-36">
        <Icon type="left" className="w-16 text-gray-200" />
        <div className="text-24 font-700 text-primary-500">
          {year}. {month + 1}.
        </div>
        <Icon type="right" className="w-16 text-gray-200" />
      </div>
      <div className="flex flex-col gap-16 self-stretch px-24">
        <div className="flex items-center justify-between">
          {days.map(day => (
            <div
              key={day}
              className="w-40 shrink-0 text-center text-14 font-600 uppercase text-gray-500"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-[repeat(7,40px)] justify-between gap-y-24">
          {dates.map(date => (
            <div key={date.getTime()} className="flex flex-col gap-4">
              <div
                data-inactive={date.getMonth() !== month}
                className="text-center text-16 font-600 text-black data-[inactive=true]:text-gray-200"
              >
                {date.getDate()}
              </div>
              <div className="flex h-6 items-center justify-center gap-2"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
