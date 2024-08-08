import EventEmitter from 'events';

export interface SparkContent {
  message: string;
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

  let isConnected: boolean = false;

  const emitter = new EventEmitter();
  const eventSource = new EventSource(url.toString());
  eventSource.addEventListener('error', event => {
    if (isConnected) {
      eventSource.close();
      emitter.emit('close');
    } else {
      eventSource.close();
      emitter.emit('error');
    }
  });

  eventSource.addEventListener('message', event => {
    try {
      const data = JSON.parse(event.data);
      emitter.emit('data', data);
    } catch (error) {
      console.error(error);
      emitter.emit('error');
    }
  });

  eventSource.addEventListener('open', () => {
    emitter.emit('open');
    isConnected = true;
  });

  return emitter;
}
