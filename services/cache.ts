import NodeCache from 'node-cache';

const caches: NodeCache[] = [];

function Cache(ttl: number) {
  const functionCache = new NodeCache({ stdTTL: ttl });
  caches.push(functionCache);

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

export const LongCache = Cache(60 * 60 * 24);

export default Cache;
