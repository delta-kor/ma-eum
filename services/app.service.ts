import { AlbumService } from '@/services/album.service';
import { CategoryService } from '@/services/category.service';
import { FeedService } from '@/services/feed.service';
import { MusicService } from '@/services/music.service';
import { ScheduleService } from '@/services/schedule.service';
import { SessionService } from '@/services/session.service';
import { TalkService } from '@/services/talk.service';
import { VideoService } from '@/services/video.service';
import { router } from '@/trpc/router';
import 'server-only';

const AppRouter = router({
  album: AlbumService.router,
  category: CategoryService.router,
  feed: FeedService.router,
  music: MusicService.router,
  schedule: ScheduleService.router,
  session: SessionService.router,
  talk: TalkService.router,
  video: VideoService.router,
});

export type AppRouter = typeof AppRouter;

export class AppService {
  public static router = AppRouter;
}
