import ScheduleTypeChip from '@/components/calendar/ScheduleTypeChip';
import Icon from '@/components/core/Icon';
import type { CalendarDateInfo } from '@/services/schedule.service';
import {
  addDays,
  differenceInCalendarDays,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import { useMemo, useState } from 'react';

interface Props {
  dateInfo: CalendarDateInfo;
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function Calendar({ dateInfo, selectedDate, onDateSelect }: Props) {
  const [year, setYear] = useState<number>(selectedDate.getFullYear());
  const [month, setMonth] = useState<number>(selectedDate.getMonth());

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

  const handleDateSelect = (date: Date) => {
    if (dateInfo[format(date, 'yyyy-MM-dd')] === undefined) return false;

    setYear(date.getFullYear());
    setMonth(date.getMonth());
    onDateSelect(date);
  };

  const handleMonthChange = (direction: 'next' | 'prev') => {
    if (direction === 'prev') {
      if (month === 0) {
        setYear(year - 1);
        setMonth(11);
      } else {
        setMonth(month - 1);
      }
    } else {
      if (month === 11) {
        setYear(year + 1);
        setMonth(0);
      } else {
        setMonth(month + 1);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-24">
      <div className="flex items-stretch gap-32">
        <div
          onClick={() => handleMonthChange('prev')}
          className="flex w-32 cursor-pointer items-center justify-center"
        >
          <Icon type="left" className="w-16 text-gray-200" />
        </div>
        <div className="w-[110px] text-center text-24 font-700 text-primary-500">
          {year}. {month + 1}.
        </div>
        <div
          onClick={() => handleMonthChange('next')}
          className="flex w-32 cursor-pointer items-center justify-center"
        >
          <Icon type="right" className="w-16 text-gray-200" />
        </div>
      </div>
      <div className="flex flex-col gap-8 self-stretch px-24">
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
        <div className="grid grid-cols-[repeat(7,40px)] justify-between gap-y-12">
          {dates.map(date => (
            <div
              key={date.getTime()}
              data-selected={format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')}
              onClick={() => handleDateSelect(date)}
              className="group relative flex cursor-pointer flex-col gap-4 px-2 py-8"
            >
              <div className="absolute inset-0 hidden rounded-4 bg-gradient-primary group-data-[selected=true]:block"></div>
              <div
                data-inactive={date.getMonth() !== month}
                className="relative text-center text-16 font-600 text-black data-[inactive=true]:text-gray-200"
              >
                <div className="group-data-[selected=true]:text-white">{date.getDate()}</div>
              </div>
              <div className="relative flex h-6 items-center justify-center gap-2">
                {dateInfo[format(date, 'yyyy-MM-dd')]?.map((item, index) => (
                  <ScheduleTypeChip
                    key={index}
                    active={format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')}
                    type={item}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
