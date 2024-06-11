import { HistoryContext } from '@/providers/HistoryProvider';
import { useContext } from 'react';

export default function useHistory() {
  return useContext(HistoryContext);
}
