import { AppService } from '@/services/app.service';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

export const maxDuration = 20;

const handler = (req: Request) =>
  fetchRequestHandler({
    createContext: opts => {
      const ip = req.headers.get('x-forwarded-for')!;
      return { ip };
    },
    endpoint: '/api/trpc',
    req,
    router: AppService.router,
    onError: ({ error, path }) => {
      if (process.env.NODE_ENV === 'development') {
        console.error(`tRPC failed on ${path || '<no path>'}: ${error.message}`);
      }
    },
  });

export { handler as GET, handler as POST };
