'use client';

import AlertModal from '@/components/core/modal/AlertModal';
import ConfirmModal from '@/components/core/modal/ConfirmModal';
import PromptModal from '@/components/core/modal/PromptModal';
import TalkLoginModal from '@/components/core/modal/TalkLoginModal';
import useModal from '@/hooks/modal';
import { ModalResult } from '@/providers/ModalProvider';

export default function ModalFrame() {
  const modal = useModal();
  const currentModal = modal.modal;

  function handleResolve(result: ModalResult) {
    modal.resolve(result);
  }

  if (!currentModal) return null;

  let content;
  if (currentModal.type === 'alert')
    content = <AlertModal modal={currentModal} onResolve={handleResolve} />;
  if (currentModal.type === 'confirm')
    content = <ConfirmModal modal={currentModal} onResolve={handleResolve} />;
  if (currentModal.type === 'prompt')
    content = <PromptModal modal={currentModal} onResolve={handleResolve} />;
  if (currentModal.type === 'talkLogin')
    content = <TalkLoginModal modal={currentModal} onResolve={handleResolve} />;

  if (content)
    return (
      <div className="fixed inset-0 z-50 flex h-dvh w-full items-center justify-center bg-black-real/30">
        <div className="min-w-full px-24">{content}</div>
      </div>
    );
  return null;
}
