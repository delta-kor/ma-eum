import { unstable_cache } from 'next/cache';
import { cache } from 'react';
import 'server-only';
import superjson from 'superjson';

export const StaticDataTtl = 60 * 5;

export function DataCache(name: string, ttl: number) {
  if (process.env.BYPASS_CACHE === '1') return () => {};

  const tags = ['prisma', name];
  if (name.includes('.')) tags.push(name.split('.')[0]);

  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    const cachedMethod = async (serializedArgs: string) => {
      const args = superjson.parse(serializedArgs) as any;
      const result = await originalMethod(...args);
      return superjson.stringify(result);
    };

    const method = async function (...args: any[]) {
      const argsKey = superjson.stringify(args);
      const serializedResult = await unstable_cache(cachedMethod, [name], {
        revalidate: ttl,
        tags,
      })(argsKey);
      return superjson.parse(serializedResult);
    };

    descriptor.value = cache(method);
  };
}
