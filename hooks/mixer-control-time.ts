import { MixerControlTimeContext } from '@/providers/MixerControlProvider';
import { useContext } from 'react';

export default function useMixerControlTime() {
  return useContext(MixerControlTimeContext);
}
