import { AlbumService } from '@/services/album';
import { router } from '@/trpc/router';

export const appRouter = router({
  album: AlbumService.router,
});

export type AppRouter = typeof appRouter;
