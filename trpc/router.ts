import Secure from '@/utils/secure.util';
import { TRPCError, initTRPC } from '@trpc/server';
import 'server-only';
import superjson from 'superjson';

const t = initTRPC.create({
  transformer: superjson,
});
export const router = t.router;
export const publicProcedure = t.procedure;
export const cmsProcedure = t.procedure.use(opts => {
  if (!Secure.isAuthorized()) throw new TRPCError({ code: 'UNAUTHORIZED' });
  return opts.next();
});
