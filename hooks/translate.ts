import { TranslateContext } from '@/providers/TranslateProvider';
import { useContext } from 'react';

export default function useTranslate() {
  return useContext(TranslateContext);
}
