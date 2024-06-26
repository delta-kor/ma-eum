'use client';

import { ReactNode, createContext, useRef, useState } from 'react';

export type Modal = AlertModal | TalkLoginModal;

export interface AlertModal {
  content: string;
  type: 'alert';
}

export interface TalkLoginModal {
  type: 'talkLogin';
}

export type ModalResult = ModalCancelResult | ModalConfirmResult;

export interface ModalConfirmResult {
  type: 'confirm';
}

export interface ModalCancelResult {
  type: 'cancel';
}

interface Context {
  alert: (content: string, callback: ModalResolver) => void;
  login: (callback: ModalResolver) => void;
  modal: Modal | null;
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

  function handleAlert(content: string, callback: ModalResolver) {
    setModal({
      content,
      type: 'alert',
    });
    resolverRef.current = callback;
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
    login: handleLogin,
    modal,
    resolve: handleResolve,
  };

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}
