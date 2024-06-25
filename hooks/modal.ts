import { ModalContext } from '@/providers/ModalProvider';
import { useContext } from 'react';

export default function useModal() {
  return useContext(ModalContext);
}
