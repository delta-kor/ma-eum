import { TitleContext } from '@/providers/TitleProvider';
import { useContext } from 'react';

export default function useTitle() {
  return useContext(TitleContext);
}
