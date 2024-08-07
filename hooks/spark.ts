import { SparkContext } from '@/providers/SparkProvider';
import { useContext } from 'react';

export default function useSpark() {
  return useContext(SparkContext);
}
