import NodeCache from 'node-cache';
import { cache } from 'react';

export const ServerCacheMap: Map<string, NodeCache> = new Map();
export const StaticDataTtl = 60 * 5;

export function ControlledCache(name: string, ttl: number) {
  const functionCache = new NodeCache({ stdTTL: ttl });
  ServerCacheMap.set(name, functionCache);

  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const key = JSON.stringify(args);
      if (functionCache.has(key)) return functionCache.get(key);

      const result = await method.apply(this, args);
      functionCache.set(key, result);
      return result;
    };
  };
}

export function ReactCache() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;

    descriptor.value = cache(method);
  };
}
