import { ReactNode, createContext, useRef, useState } from 'react';

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
  alert: (content: string) => Promise<ModalResult>;
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

  const resolverRef = useRef<ModalResolver | null>(null);

  function handleAlert(content: string) {
    return new Promise<ModalResult>(resolve => {
      resolverRef.current = resolve;
      setModal({
        content,
        type: 'alert',
      });
    });
  }

  function handleResolve(result: ModalResult) {
    resolverRef.current?.(result);
    setModal(null);
  }

  const value: Context = {
    alert: handleAlert,
    modal,
    resolve: handleResolve,
  };

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}
