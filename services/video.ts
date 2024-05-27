import prisma from '@/prisma/prisma';
import { router } from '@/trpc/router';
import { ControlledCache, StaticDataTtl } from '@/utils/cache';
import { Video } from '@prisma/client';

const VideoRouter = router({});

export class VideoService {
  public static router = VideoRouter;

  @ControlledCache('video.getAll', StaticDataTtl)
  public static async getAll(): Promise<Video[]> {
    return prisma.video.findMany({ orderBy: { date: 'desc' } });
  }

  @ControlledCache('video.getPromotionVideos', StaticDataTtl)
  public static async getPromotionVideos(albumId: string): Promise<Video[]> {
    const videos = await VideoService.getAll();
    return videos.filter(video =>
      video.meta.some(meta => meta.type === 'promotion' && meta.albumId === albumId)
    );
  }
}
