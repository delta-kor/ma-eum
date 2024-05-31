import prisma from '@/prisma/prisma';
import { publicProcedure, router } from '@/trpc/router';
import { ControlledCache, StaticDataTtl } from '@/utils/cache.util';
import { Member } from '@/utils/video.util';
import { Video } from '@prisma/client';
import 'server-only';
import { z } from 'zod';

const VideoRouter = router({
  getCategoryVideos: publicProcedure
    .input(
      z.object({
        categoryId: z.string(),
        member: z.string().nullable(),
      })
    )
    .query(opts => {
      return VideoService.getCategoryVideos(opts.input.categoryId, opts.input.member as Member);
    }),

  getCoverVideos: publicProcedure.input(z.object({ member: z.string().nullable() })).query(opts => {
    return VideoService.getCoverVideos(opts.input.member as Member);
  }),
});

export class VideoService {
  public static router = VideoRouter;

  @ControlledCache('video.getAll', StaticDataTtl)
  public static async getAll(): Promise<Video[]> {
    return prisma.video.findMany({ orderBy: { date: 'desc' } });
  }

  @ControlledCache('video.getCategoryVideos', StaticDataTtl)
  public static async getCategoryVideos(
    categoryId: string,
    member: Member | null
  ): Promise<Video[]> {
    if (member === null)
      return prisma.video.findMany({
        orderBy: { date: 'desc' },
        where: {
          categories: {
            some: {
              id: categoryId,
            },
          },
        },
      });

    const videos = await VideoService.getCategoryVideos(categoryId, null);
    return videos.filter(video =>
      video.meta.some(meta => meta.type === 'members' && meta.members.includes(member))
    );
  }

  @ControlledCache('video.getCoverVideos', StaticDataTtl)
  public static async getCoverVideos(member: Member | null): Promise<Video[]> {
    const videos = await VideoService.getAll();
    return videos.filter(
      video =>
        video.meta.some(meta => meta.type === 'cover') &&
        (member === null ||
          video.meta.some(meta => meta.type === 'members' && meta.members.includes(member)))
    );
  }

  @ControlledCache('video.getPromotionVideos', StaticDataTtl)
  public static async getPromotionVideos(albumId: string): Promise<Video[]> {
    const videos = await VideoService.getAll();
    return videos.filter(video =>
      video.meta.some(meta => meta.type === 'promotion' && meta.albumId === albumId)
    );
  }
}
