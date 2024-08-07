import EventEmitter from 'events';

export interface SparkContent {
  content: string;
  type: 'ai' | 'user';
}

export enum SparkState {
  IDLE,
  SENDING,
  LOADING,
  STREAMING,
}

export function connectSpark(chatId: string, prompt: string): EventEmitter {
  const url = new URL(`${process.env.NEXT_PUBLIC_SPARK_URL_BASE}/run`);
  url.searchParams.append('chatId', chatId);
  url.searchParams.append('prompt', prompt);

  const emitter = new EventEmitter();
  const eventSource = new EventSource(url.toString());
  eventSource.onerror = event => {
    if (event.eventPhase === EventSource.CLOSED) {
      eventSource.close();
      emitter.emit('close');
      return;
    } else {
      eventSource.close();
      emitter.emit('error');
    }
  };

  eventSource.onmessage = event => {
    try {
      const data = JSON.parse(event.data);
      emitter.emit('data', data);
    } catch (error) {
      console.error(error);
      emitter.emit('error');
    }
  };

  eventSource.onopen = () => {
    emitter.emit('open');
  };

  return emitter;
}
