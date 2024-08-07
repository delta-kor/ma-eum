'use client';

import createId from '@/utils/id.util';
import { SparkContent } from '@/utils/spark.util';
import { ReactNode, createContext, useState } from 'react';

interface Context {
  chatId: string;
  history: SparkContent[];
  send: (prompt: string) => void;
}

export const SparkContext = createContext<Context>({} as Context);

interface Props {
  children: ReactNode;
}

export default function SparkProvider({ children }: Props) {
  const initialChatId = createId(32);
  const [chatId, setChatId] = useState<string>(initialChatId);
  const [history, setHistory] = useState<SparkContent[]>([]);

  function handleSend(prompt: string) {
    const content: SparkContent = {
      content: prompt,
      type: 'user',
    };

    setHistory(prev => [...prev, content]);
  }

  const context: Context = {
    chatId,
    history,
    send: handleSend,
  };

  return <SparkContext.Provider value={context}>{children}</SparkContext.Provider>;
}
