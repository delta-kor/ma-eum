import { AlbumService } from '@/services/album';
import { CategoryService } from '@/services/category';
import { MusicService } from '@/services/music';
import { router } from '@/trpc/router';
import 'server-only';

const AppRouter = router({
  album: AlbumService.router,
  category: CategoryService.router,
  music: MusicService.router,
});

export type AppRouter = typeof AppRouter;

export class AppService {
  public static router = AppRouter;
}
