'use client';

import createId from '@/utils/id.util';
import { ReactNode, createContext, useState } from 'react';

interface Context {
  chatId: string;
  send: (prompt: string) => void;
}

export const SparkContext = createContext<Context>({} as Context);

interface Props {
  children: ReactNode;
}

export default function SparkProvider({ children }: Props) {
  const initialChatId = createId(32);
  const [chatId, setChatId] = useState<string>(initialChatId);

  function handleSend(prompt: string) {
    console.log('Sending prompt:', prompt);
  }

  const context: Context = {
    chatId,
    send: handleSend,
  };

  return <SparkContext.Provider value={context}>{children}</SparkContext.Provider>;
}
