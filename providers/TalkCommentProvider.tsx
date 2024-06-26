'use client';

import { ReactNode, createContext, useRef } from 'react';

interface Context {
  refresh: () => void;
  setCallback(callback: () => void): void;
}

export const TalkCommentContext = createContext<Context>({} as Context);

interface Props {
  children: ReactNode;
}

export default function TalkCommentProvider({ children }: Props) {
  const callbackRef = useRef<() => void>();

  function handleSetCallback(callback: () => void) {
    callbackRef.current = callback;
  }

  function handleRefresh() {
    callbackRef.current?.();
  }

  const value: Context = {
    refresh: handleRefresh,
    setCallback: handleSetCallback,
  };

  return <TalkCommentContext.Provider value={value}>{children}</TalkCommentContext.Provider>;
}
