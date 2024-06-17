import { AppService } from '@/services/app.service';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

const handler = (req: Request) =>
  fetchRequestHandler({
    createContext: () => ({}),
    endpoint: '/api/trpc',
    req,
    router: AppService.router,
    onError: ({ error }) => {
      throw error;
    },
  });

export { handler as GET, handler as POST };
