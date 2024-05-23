import { AlbumService } from '@/services/album';
import { router } from '@/trpc/router';

const AppRouter = router({
  album: AlbumService.router,
});

export type AppRouter = typeof AppRouter;

export class AppService {
  public static router = AppRouter;
}
