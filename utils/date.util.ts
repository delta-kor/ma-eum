export function removeTime(date: Date): Date {
  return new Date(date.toDateString());
}

export function getRelativeTime(date: Date, today: Date, isAllDay: boolean): string {
  const diff = date.getTime() - today.getTime();
  const diffMinutes = Math.floor(diff / 1000 / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

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

export function getTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${minutes}:${sec < 10 ? `0${sec}` : sec}`;
}
