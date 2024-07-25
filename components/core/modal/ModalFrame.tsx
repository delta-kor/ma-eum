'use client';

import AlertModal from '@/components/core/modal/AlertModal';
import ConfirmModal from '@/components/core/modal/ConfirmModal';
import PromptModal from '@/components/core/modal/PromptModal';
import TalkLoginModal from '@/components/core/modal/TalkLoginModal';
import useModal from '@/hooks/modal';
import { ModalResult } from '@/providers/ModalProvider';
import { useEffect } from 'react';

export default function ModalFrame() {
  const modal = useModal();
  const currentModal = modal.modal;

  let content = null;
  if (currentModal) {
    if (currentModal.type === 'alert')
      content = <AlertModal modal={currentModal} onResolve={handleResolve} />;
    if (currentModal.type === 'confirm')
      content = <ConfirmModal modal={currentModal} onResolve={handleResolve} />;
    if (currentModal.type === 'prompt')
      content = <PromptModal modal={currentModal} onResolve={handleResolve} />;
    if (currentModal.type === 'talkLogin')
      content = <TalkLoginModal modal={currentModal} onResolve={handleResolve} />;
  }

  useEffect(() => {
    if (content !== null) document.documentElement.style.overflow = 'hidden';
    else document.documentElement.style.overflow = 'unset';
  }, [content]);

  function handleResolve(result: ModalResult) {
    modal.resolve(result);
  }

  if (content)
    return (
      <div className="fixed inset-0 z-50 flex h-dvh w-full items-center justify-center bg-black-real/30">
        <div className="min-w-full px-24">{content}</div>
      </div>
    );
  return null;
}
