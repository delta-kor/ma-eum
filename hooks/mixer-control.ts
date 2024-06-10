import { MixerControlContext } from '@/providers/MixerControlProvider';
import { useContext } from 'react';

export default function useMixerControl() {
  return useContext(MixerControlContext);
}
