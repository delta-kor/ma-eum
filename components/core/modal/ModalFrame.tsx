'use client';

import useModal from '@/hooks/modal';
import { ModalResult } from '@/providers/ModalProvider';

export default function ModalFrame() {
  const modal = useModal();
  const currentModal = modal.modal;

  function handleResolve(result: ModalResult) {
    modal.resolve(result);
  }

  if (!currentModal) return null;
  if (currentModal.type === 'alert')
    return (
      <div className="fixed inset-0 z-50 flex h-dvh w-full items-center justify-center bg-black-real/30">
        <div className="min-w-full px-24">
          <div className="mx-auto flex max-w-[480px] flex-col gap-24 rounded-16 bg-white p-24">
            <div className="whitespace-pre-line text-18 font-500 text-black">
              {currentModal.content}
            </div>
            <div
              onClick={() => handleResolve({ type: 'confirm' })}
              className="-m-16 cursor-pointer p-16 text-center text-16 font-600 text-primary-500"
            >
              확인
            </div>
          </div>
        </div>
      </div>
    );

  return null;
}
