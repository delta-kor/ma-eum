import Auth from '@/utils/auth.util';
import Secure from '@/utils/secure.util';
import { TalkUser } from '@prisma/client';
import { TRPCError, initTRPC } from '@trpc/server';
import 'server-only';
import superjson from 'superjson';

export interface TRPCContext {
  user: TalkUser;
}

const t = initTRPC.create({
  transformer: superjson,
});
export const router = t.router;
export const publicProcedure = t.procedure;
export const cmsProcedure = t.procedure.use(opts => {
  if (!Secure.isAuthorized()) throw new TRPCError({ code: 'FORBIDDEN' });
  return opts.next();
});
export const talkProcedure = t.procedure.use<TRPCContext>(async opts => {
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
