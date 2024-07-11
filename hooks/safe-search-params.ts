import { SafeSearchParamsContext } from '@/providers/SafeSearchParamsProvider';
import { useContext } from 'react';

export default function useSafeSearchParams() {
  return useContext(SafeSearchParamsContext);
}
