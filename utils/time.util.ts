import { DateTime, Interval } from 'luxon';

export function getFutureRelativeTime(date: Date, today: Date): string {
  const targetDateTime = DateTime.fromJSDate(date, { zone: 'Asia/Seoul' }).plus({
    milliseconds: 1,
  });
  const todayDateTime = DateTime.fromJSDate(today, { zone: 'Asia/Seoul' });
  const interval = Interval.fromDateTimes(todayDateTime, targetDateTime);
  const diffDays = interval.count('days') - 1;
  const diffHours = Math.floor(interval.length('hours'));
  const diffMinutes = Math.floor(interval.length('minutes'));

  if (diffDays > 0) return `${diffDays}d`;
  if (diffHours > 0) return `${diffHours}h`;
  if (diffMinutes > 0) return `${diffMinutes}m`;

  const diffDuration = todayDateTime.diff(targetDateTime, ['hours', 'minutes']);
  if (diffDuration.hours > 0) return `-${Math.round(diffDuration.hours)}h`;
  if (diffDuration.minutes > 0) return `-${Math.round(diffDuration.minutes)}m`;
  return 'Now';
}

export function getPastRelativeTime(date: Date, today: Date): string {
  const diff = today.getTime() - date.getTime();
  const diffMinutes = Math.floor(diff / 1000 / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffMonths / 12);

  if (diffYears === 1) return 'Last year';
  if (diffYears > 0) return `${diffYears} year${diffYears > 1 ? 's' : ''} ago`;
  if (diffMonths === 1) return 'Last month';
  if (diffMonths > 0) return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
  if (diffWeeks === 1) return 'Last week';
  if (diffWeeks > 0) return `${diffWeeks} week${diffWeeks > 1 ? 's' : ''} ago`;
  if (diffDays === 1) return 'Yesterday';
  if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffMinutes > 0) return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
  return 'Now';
}

export function getShortPastRelativeTime(date: Date, today: Date): string {
  const diff = today.getTime() - date.getTime();
  const diffMinutes = Math.floor(diff / 1000 / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0) return formatTimeAsDate(date);
  if (diffHours > 0) return `${diffHours}h`;
  if (diffMinutes > 0) return `${diffMinutes}m`;
  return 'Now';
}

export function formatTimeAsDate(date: Date): string {
  const datetime = DateTime.fromJSDate(date, { zone: 'Asia/Seoul' });
  return datetime.toFormat('yy. MM. dd.');
}

export function formatTimeAsTime(date: Date): string {
  const datetime = DateTime.fromJSDate(date, { zone: 'Asia/Seoul' });
  return datetime.toFormat('yyyy. MM. dd. HH:mm');
}

export function formatTimeAsSixDigit(date: Date): string {
  const datetime = DateTime.fromJSDate(date, { zone: 'Asia/Seoul' });
  return datetime.toFormat('yyMMdd');
}

export function formatTimeAsDateJs(date: Date): string {
  const datetime = DateTime.fromJSDate(date, { zone: 'Asia/Seoul' });
  return datetime.toFormat('yyyy-MM-dd');
}

export function formatTimeAsDateTimeJs(date: Date): string {
  const datetime = DateTime.fromJSDate(date, { zone: 'Asia/Seoul' });
  return datetime.toFormat("yyyy-MM-dd'T'HH:mm");
}

export function getTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${minutes}:${sec < 10 ? `0${sec}` : sec}`;
}

export function parseVoyageDate(date: string): Date {
  const year = 2000 + Number(date.slice(0, 2));
  const month = Number(date.slice(2, 4)) - 1;
  const day = Number(date.slice(4, 6));
  return new Date(year, month, day);
}
