import { TRPCError } from '@trpc/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  token: process.env.UPSTASH_TOKEN,
  url: process.env.UPSTASH_URL,
});

export default class Limiter {
  private static readonly mutationLimit = new Ratelimit({
    limiter: Ratelimit.fixedWindow(5, '5 s'),
    redis: redis,
  });

  private static readonly queryLimit = new Ratelimit({
    limiter: Ratelimit.fixedWindow(50, '10 s'),
    redis: redis,
  });

  public static async checkMutationLimit(identifier: string) {
    if (process.env.ENABLE_LIMITER === '0') return;

    const result = await Limiter.mutationLimit.limit(identifier);
    if (!result.success) throw new TRPCError({ code: 'TOO_MANY_REQUESTS' });
  }

  public static async checkQueryLimit(identifier: string) {
    if (process.env.ENABLE_LIMITER === '0') return;

    const result = await Limiter.queryLimit.limit(identifier);
    if (!result.success) throw new TRPCError({ code: 'TOO_MANY_REQUESTS' });
  }
}
