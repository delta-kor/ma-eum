import { AlbumService } from '@/services/album';
import { CategoryService } from '@/services/category';
import { MusicService } from '@/services/music';
import { VideoService } from '@/services/video';
import { router } from '@/trpc/router';
import 'server-only';

const AppRouter = router({
  album: AlbumService.router,
  category: CategoryService.router,
  music: MusicService.router,
  video: VideoService.router,
});

export type AppRouter = typeof AppRouter;

export class AppService {
  public static router = AppRouter;
}
