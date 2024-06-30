'use client';

import { ReactNode, createContext, useRef } from 'react';

type CallbackFunction = () => Promise<void>;

interface Context {
  refresh: CallbackFunction;
  setCallback(callback: CallbackFunction): void;
}

export const TalkCommentContext = createContext<Context>({} as Context);

interface Props {
  children: ReactNode;
}

export default function TalkCommentProvider({ children }: Props) {
  const callbackRef = useRef<CallbackFunction>();

  function handleSetCallback(callback: CallbackFunction) {
    callbackRef.current = callback;
  }

  async function handleRefresh() {
    await callbackRef.current?.();
  }

  const value: Context = {
    refresh: handleRefresh,
    setCallback: handleSetCallback,
  };

  return <TalkCommentContext.Provider value={value}>{children}</TalkCommentContext.Provider>;
}
