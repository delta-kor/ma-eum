import { AboutContext } from '@/providers/AboutProvider';
import { useContext } from 'react';

export default function useAbout() {
  return useContext(AboutContext);
}
