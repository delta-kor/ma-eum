import { AlbumService } from '@/services/album';
import { CategoryService } from '@/services/category';
import { router } from '@/trpc/router';
import 'server-only';

const AppRouter = router({
  album: AlbumService.router,
  category: CategoryService.router,
});

export type AppRouter = typeof AppRouter;

export class AppService {
  public static router = AppRouter;
}
