'use client';

import { ReactNode, createContext, useState } from 'react';

export type Modal = AlertModal;

export interface AlertModal {
  content: string;
  type: 'alert';
}

export type ModalResult = ModalConfirmResult;

export interface ModalConfirmResult {
  type: 'confirm';
}

interface Context {
  alert: (content: string) => void;
  modal: Modal | null;
  resolve: (result: ModalResult) => void;
}

type ModalResolver = (result: ModalResult) => void;

export const ModalContext = createContext<Context>({} as Context);

interface Props {
  children: ReactNode;
}

export default function ModalProvider({ children }: Props) {
  const [modal, setModal] = useState<Modal | null>(null);

  function handleAlert(content: string) {
    setModal({
      content,
      type: 'alert',
    });
  }

  function handleResolve(result: ModalResult) {
    setModal(null);
  }

  const value: Context = {
    alert: handleAlert,
    modal,
    resolve: handleResolve,
  };

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}
