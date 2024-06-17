export function getKSTNow(): Date {
  const current = new Date();
  const utc = current.getTime() + current.getTimezoneOffset() * 60 * 1000;
  return new Date(utc + 9 * 60 * 60 * 1000);
}

export function getKSTMonth(year: number, month: number): Date {
  const date = new Date(Date.UTC(year, month));
  const utc = date.getTime() + date.getTimezoneOffset() * 60 * 1000;
  return new Date(utc + 9 * 60 * 60 * 1000);
}

export function toKST(date: Date): Date {
  const utc = date.getTime() + date.getTimezoneOffset() * 60 * 1000;
  return new Date(utc + 9 * 60 * 60 * 1000);
}

export function removeTime(date: Date): Date {
  return new Date(date.toDateString());
}

export function getFutureRelativeTime(date: Date, today: Date, isAllDay: boolean): string {
  const diff = date.getTime() - today.getTime();
  const diffMinutes = Math.round(diff / 1000 / 60);
  const diffHours = Math.round(diffMinutes / 60);
  const diffDays = Math.round(diffHours / 24);

  if (diffDays > 0 || isAllDay) {
    const diff = date.getTime() - removeTime(today).getTime();
    const diffDays = Math.floor(diff / 1000 / 60 / 60 / 24);

    if (diffDays === 0) return 'Today';
    return `${diffDays}d`;
  }
  if (diffHours > 0) return `${diffHours}h`;
  if (diffMinutes > 0) return `${diffMinutes}m`;
  return 'Today';
}

export function getPastRelativeTime(date: Date, today: Date): string {
  const diff = today.getTime() - date.getTime();
  const diffMinutes = Math.round(diff / 1000 / 60);
  const diffHours = Math.round(diffMinutes / 60);
  const diffDays = Math.round(diffHours / 24);
  const diffWeeks = Math.round(diffDays / 7);
  const diffMonths = Math.round(diffDays / 30);
  const diffYears = Math.round(diffMonths / 12);

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
  return 'Today';
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
