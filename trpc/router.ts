import Auth from '@/utils/auth.util';
import Limiter from '@/utils/limiter.util';
import { TalkUser } from '@prisma/client';
import { TRPCError, initTRPC } from '@trpc/server';
import 'server-only';
import superjson from 'superjson';

export interface TRPCContext {
  ip: string;
}

export interface TRPCUserContext extends TRPCContext {
  user: TalkUser;
}

const t = initTRPC.context<TRPCContext>().create({
  errorFormatter: opts => {
    const { error, shape } = opts;

    if (error.code === 'INTERNAL_SERVER_ERROR') {
      console.error(error);
      return {
        ...shape,
        message: '$error_internal_server',
      };
    }

    if (error.code === 'UNAUTHORIZED') {
      return {
        ...shape,
        message: '$error_unauthorized',
      };
    }

    if (error.code === 'TOO_MANY_REQUESTS') {
      return {
        ...shape,
        message: '$error_too_many_requests',
      };
    }

    if (error.code === 'FORBIDDEN') {
      return {
        ...shape,
        cause: error.cause,
        message: error.message === 'FORBIDDEN' ? '$error_forbidden' : error.message,
      };
    }

    if (error.code === 'NOT_FOUND') {
      return {
        ...shape,
        message: '$error_not_found',
      };
    }

    return shape;
  },
  transformer: superjson,
});

export const router = t.router;

export const publicProcedure = t.procedure.use<TRPCContext>(async opts => {
  const identifier = opts.ctx.ip;

  if (opts.type === 'query') await Limiter.checkQueryLimit(identifier);
  if (opts.type === 'mutation') await Limiter.checkMutationLimit(identifier);

  return opts.next();
});

export const talkProcedure = publicProcedure.use<TRPCUserContext>(async opts => {
  const token = Auth.getTokenCookie();
  if (!token) throw new TRPCError({ code: 'UNAUTHORIZED' });

  const user = await Auth.verifyToken(token);
  if (!user) throw new TRPCError({ code: 'UNAUTHORIZED' });

  return opts.next({
    ctx: {
      user,
    },
  });
});
