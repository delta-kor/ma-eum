import EventEmitter from 'events';

export interface SparkContent {
  bubbleId?: string;
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
    isConnected = true;
    emitter.emit('open');
  });

  return emitter;
}

export async function flagSpark(bubbleId: string): Promise<boolean> {
  try {
    const url = new URL(`${process.env.NEXT_PUBLIC_SPARK_URL_BASE}/evaluate`);
    url.searchParams.append('bubbleId', bubbleId);

    const response = await fetch(url.toString());
    if (!response.ok) return false;

    const text = await response.text();
    const data = JSON.parse(text.split('\n')[0].slice(6));
    return data.type === 'success';
  } catch (e) {
    console.error(e);
    return false;
  }
}

export async function teachSpark(content: string): Promise<boolean> {
  try {
    const url = new URL(`${process.env.NEXT_PUBLIC_SPARK_URL_BASE}/teach`);
    url.searchParams.append('content', content);

    const response = await fetch(url.toString());
    if (!response.ok) return false;

    const text = await response.text();
    const data = JSON.parse(text.split('\n')[0].slice(6));
    return data.type === 'success';
  } catch (e) {
    console.error(e);
    return false;
  }
}
