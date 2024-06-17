import { unstable_cache } from 'next/cache';
import NodeCache from 'node-cache';
import 'server-only';
import superjson from 'superjson';

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

export function DataCache(name: string, ttl: number) {
  if (process.env.VERCEL !== '1') return ControlledCache(name, 0);

  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    const cachedMethod = async function (serializedArgs: any) {
      const args = superjson.parse(serializedArgs) as any;
      const result = await originalMethod(...args);
      return superjson.stringify(result);
    };

    const method = async function (...args: any[]) {
      const argsKey = superjson.stringify(args);
      const serializedResult = await unstable_cache(cachedMethod, [name], {
        tags: ['prisma', name],
      })(argsKey);
      return superjson.parse(serializedResult);
    };

    descriptor.value = method;
  };
}
