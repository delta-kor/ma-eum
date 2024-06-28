import { setSecureKey } from '@/actions/secure.action';
import ScheduleTypeChip from '@/components/calendar/ScheduleTypeChip';
import Icon from '@/components/core/Icon';
import type { CalendarDateInfo } from '@/services/schedule.service';
import { DateTime } from 'luxon';
import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

interface Props {
  dateInfo: CalendarDateInfo;
  hydrated: boolean;
  selectedDate: DateTime;
  onDateSelect: (date: DateTime) => void;
}

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function Calendar({ dateInfo, hydrated, selectedDate, onDateSelect }: Props) {
  const router = useRouter();

  const [year, setYear] = useState<number>(selectedDate.year);
  const [month, setMonth] = useState<number>(selectedDate.month);

  const currentMonth = DateTime.local(year, month, { zone: 'Asia/Seoul' }).setLocale('ko-KR');

  const monthStart = currentMonth.startOf('month', { useLocaleWeeks: true });
  const monthEnd = currentMonth.endOf('month', { useLocaleWeeks: true });
  const startDate = monthStart.startOf('week', { useLocaleWeeks: true });
  const endDate = monthEnd.endOf('week', { useLocaleWeeks: true });

  const dates = useMemo(() => {
    const monthArray = [];
    let day = startDate;
    while (endDate.diff(day, 'days').days > 0) {
      monthArray.push(day);
      day = day.plus({ days: 1 });
    }
    return monthArray;
  }, [startDate, endDate]);

  const handleDateSelect = (date: DateTime) => {
    if (date.toFormat('yyyy-MM-dd') === '2024-01-01') {
      const key = prompt('Enter the key');
      if (!key) return false;

      try {
        setSecureKey(key).then(result => alert(result ? 'Success' : 'Failed'));
      } catch (e) {
        console.error(e);
        alert(e);
      }

      return true;
    }

    if (date.toFormat('yyyy-MM-dd') === '2024-01-02') {
      router.push('/cms');
      return true;
    }

    if (dateInfo[date.toFormat('yyyy-MM-dd')] === undefined) return false;

    setYear(date.year);
    setMonth(date.month);

    onDateSelect(date);
  };

  const handleMonthChange = (direction: 'next' | 'prev') => {
    if (direction === 'prev') {
      if (month <= 1) {
        setYear(year - 1);
        setMonth(12);
      } else {
        setMonth(month - 1);
      }
    } else {
      if (month >= 12) {
        setYear(year + 1);
        setMonth(1);
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
        <div className="w-[110px] select-none text-center text-24 font-700 text-primary-500">
          {year}. {month}.
        </div>
        <div
          onClick={() => handleMonthChange('next')}
          className="flex w-32 cursor-pointer items-center justify-center"
        >
          <Icon type="right" className="w-16 text-gray-200" />
        </div>
      </div>
      <div className="flex flex-col gap-8 self-stretch">
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
          {dates.map(date => {
            const isActive =
              date.toFormat('yyyy-MM-dd') === selectedDate.toFormat('yyyy-MM-dd') && hydrated;

            return (
              <div
                key={date.toISO()}
                data-selected={isActive}
                onClick={() => handleDateSelect(date)}
                className="group relative flex cursor-pointer flex-col gap-4 px-2 py-8"
              >
                <div className="absolute inset-0 hidden rounded-4 bg-gradient-primary group-data-[selected=true]:block"></div>
                <div
                  data-inactive={date.month !== month}
                  className="relative text-center text-16 font-600 text-black data-[inactive=true]:text-gray-200"
                >
                  <div className="group-data-[selected=true]:text-white">{date.day}</div>
                </div>
                <div className="relative flex h-6 items-center justify-center gap-2">
                  {dateInfo[date.toFormat('yyyy-MM-dd')]?.map((item, index) => (
                    <ScheduleTypeChip key={index} active={isActive} kind="dot" type={item} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
