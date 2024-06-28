import { useState } from 'react';

export default function useToday() {
  const [date, setDate] = useState<Date>(new Date());
  return date;
}
