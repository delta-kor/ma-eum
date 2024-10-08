'use client';

import useModal from '@/hooks/modal';
import createId from '@/utils/id.util';
import { SparkContent, SparkState, connectSpark } from '@/utils/spark.util';
import { SessionStorage } from '@/utils/storage.util';
import EventEmitter from 'events';
import { ReactNode, createContext, useEffect, useRef, useState } from 'react';

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
  const emitterRef = useRef<EventEmitter | null>(null);

  useEffect(() => {
    const preloadedHistory = SessionStorage.getItem('maeum_spark_history');
    if (preloadedHistory) {
      try {
        setHistory(JSON.parse(preloadedHistory));
      } catch (e) {
        SessionStorage.removeItem('maeum_spark_history');
        console.error(e);
      }
    }
  }, []);

  useEffect(() => {
    history.length > 0 && SessionStorage.setItem('maeum_spark_history', JSON.stringify(history));
  }, [history]);

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
    emitterRef.current = emitter;

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

          clearResponse();
          setHistory(prev => [...prev, content]);
        }
      }
    });
  }

  function reset() {
    setChatId(createId(32));
    clearResponse();
    setState(SparkState.IDLE);

    setHistory([]);
    SessionStorage.removeItem('maeum_spark_history');
    emitterRef.current?.removeAllListeners();
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
