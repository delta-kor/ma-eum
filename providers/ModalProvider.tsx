'use client';

import { ReactNode, createContext, useRef, useState } from 'react';

export type Modal = AlertModal | ConfirmModal | PromptModal | TalkLoginModal;

export interface AlertModal {
  content: string;
  type: 'alert';
}

export interface ConfirmModal {
  content: string;
  type: 'confirm';
}

export interface PromptModal {
  content: string;
  placeholder: string;
  type: 'prompt';
}

export interface TalkLoginModal {
  type: 'talkLogin';
}

export type ModalResult = ModalCancelResult | ModalConfirmResult | ModalPromptResult;

export interface ModalConfirmResult {
  type: 'confirm';
}

export interface ModalPromptResult {
  type: 'prompt';
  value: string;
}

export interface ModalCancelResult {
  type: 'cancel';
}

interface Context {
  alert: (content: string, callback?: ModalResolver) => void;
  confirm: (content: string, callback?: ModalResolver) => void;
  login: (callback: ModalResolver) => void;
  modal: Modal | null;
  prompt: (content: string, placeholder: string, callback?: ModalResolver) => void;
  resolve: (result: ModalResult) => void;
}

export type ModalResolver = (result: ModalResult) => void;
export type ModalContext = Context;

export const ModalContext = createContext<Context>({} as Context);

interface Props {
  children: ReactNode;
}

export default function ModalProvider({ children }: Props) {
  const [modal, setModal] = useState<Modal | null>(null);
  const resolverRef = useRef<ModalResolver | null>(null);

  function handleAlert(content: string, callback?: ModalResolver) {
    setModal({
      content,
      type: 'alert',
    });
    resolverRef.current = callback || null;
  }

  function handleConfirm(content: string, callback?: ModalResolver) {
    setModal({
      content,
      type: 'confirm',
    });
    resolverRef.current = callback || null;
  }

  function handlePrompt(content: string, placeholder: string, callback?: ModalResolver) {
    setModal({
      content,
      placeholder,
      type: 'prompt',
    });
    resolverRef.current = callback || null;
  }

  function handleLogin(callback: ModalResolver) {
    setModal({
      type: 'talkLogin',
    });
    resolverRef.current = callback;
  }

  function handleResolve(result: ModalResult) {
    setModal(null);
    resolverRef.current?.(result);
  }

  const value: Context = {
    alert: handleAlert,
    confirm: handleConfirm,
    login: handleLogin,
    modal,
    prompt: handlePrompt,
    resolve: handleResolve,
  };

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}
