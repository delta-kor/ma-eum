'use client';

import useModal from '@/hooks/modal';
import createId from '@/utils/id.util';
import { SparkContent, SparkState, connectSpark } from '@/utils/spark.util';
import { ReactNode, createContext, useRef, useState } from 'react';

interface Context {
  chatId: string;
  history: SparkContent[];
  reset: () => void;
  response: null | string;
  send: (prompt: string) => void;
  state: SparkState;
}

export const SparkContext = createContext<Context>({} as Context);

interface Props {
  children: ReactNode;
}

export default function SparkProvider({ children }: Props) {
  const modal = useModal();

  const initialChatId = createId(32);
  const [chatId, setChatId] = useState<string>(initialChatId);
  const [state, setState] = useState<SparkState>(SparkState.IDLE);
  const [history, setHistory] = useState<SparkContent[]>([]);
  const [response, setResponse] = useState<null | string>(null);

  const responseRef = useRef<null | string>(null);

  function clearResponse() {
    responseRef.current = null;
    setResponse(responseRef.current);
  }

  function handleSend(prompt: string) {
    if (state !== SparkState.IDLE) {
      modal.alert('Please wait for the current process to complete.');
      return;
    }

    const content: SparkContent = {
      message: prompt,
      type: 'user',
    };

    setHistory(prev => [...prev, content]);
    setState(SparkState.SENDING);

    const emitter = connectSpark(chatId, prompt);

    emitter.on('open', () => {
      setState(SparkState.LOADING);
    });
    emitter.on('close', () => {
      setState(SparkState.IDLE);
    });
    emitter.on('error', () => {
      setState(SparkState.IDLE);
      modal.alert('An error occurred. Please try again.');
    });

    emitter.on('data', data => {
      const type = data.type;

      if (type === 'error') {
        clearResponse();
        setState(SparkState.IDLE);
        modal.alert(data.message);
      }

      if (type === 'start') {
        setState(SparkState.STREAMING);

        responseRef.current = '';
        setResponse(responseRef.current);
      }

      if (type === 'stream') {
        responseRef.current += data.message;
        setResponse(responseRef.current);
      }

      if (type === 'feedback') {
        modal.alert('AI refused to generate content based on the prompt.');
      }

      if (type === 'end') {
        if (responseRef.current === null) {
          clearResponse();
        } else {
          const bubbleId = data.bubbleId;
          const content: SparkContent = {
            bubbleId,
            message: responseRef.current,
            type: 'ai',
          };
          setHistory(prev => [...prev, content]);
          clearResponse();
        }
      }
    });
  }

  function reset() {
    setChatId(createId(32));
    setHistory([]);
    clearResponse();
    setState(SparkState.IDLE);
  }

  const context: Context = {
    chatId,
    history,
    reset,
    response,
    send: handleSend,
    state,
  };

  return <SparkContext.Provider value={context}>{children}</SparkContext.Provider>;
}
