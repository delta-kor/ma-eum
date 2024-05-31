import prisma from '@/prisma/prisma';
import { publicProcedure, router } from '@/trpc/router';
import { ControlledCache, StaticDataTtl } from '@/utils/cache.util';
import type { PaginationOptions, PaginationResult } from '@/utils/pagination.util';
import { paginate } from '@/utils/pagination.util';
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

  getChallengeVideos: publicProcedure
    .input(z.object({ cursor: z.string().nullish(), member: z.string().nullable() }))
    .query(opts => {
      return VideoService.getChallengeVideos(opts.input.member as Member, {
        cursor: opts.input.cursor || null,
        limit: 20,
      });
    }),

  getCoverVideos: publicProcedure.input(z.object({ member: z.string().nullable() })).query(opts => {
    return VideoService.getCoverVideos(opts.input.member as Member);
  }),

  getShortsVideos: publicProcedure.input(z.object({ cursor: z.string().nullish() })).query(opts => {
    return VideoService.getShortsVideos({
      cursor: opts.input.cursor || null,
      limit: 24,
    });
  }),
});

export class VideoService {
  public static router = VideoRouter;

  @ControlledCache('video.getAll', StaticDataTtl)
  public static async getAll(): Promise<Video[]> {
    return prisma.video.findMany({ orderBy: [{ date: 'desc' }, { id: 'asc' }] });
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

  @ControlledCache('video.getChallengeVideos', StaticDataTtl)
  public static async getChallengeVideos(
    member: Member | null,
    pagination: PaginationOptions
  ): Promise<PaginationResult<Video>> {
    const videos = await VideoService.getAll();
    const challengeVideos = videos.filter(video =>
      video.meta.some(
        meta => meta.type === 'inbound_challenge' || meta.type === 'outbound_challenge'
      )
    );
    const memberVideos = challengeVideos.filter(
      video =>
        member === null ||
        video.meta.some(meta => meta.type === 'members' && meta.members.includes(member))
    );

    return paginate(memberVideos, pagination);
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

  @ControlledCache('video.getLiveVideos', StaticDataTtl)
  public static async getLiveVideos(): Promise<Video[]> {
    const videos = await VideoService.getAll();
    return videos.filter(video => video.meta.some(meta => meta.type === 'live' && !meta.disable));
  }

  @ControlledCache('video.getPromotionVideos', StaticDataTtl)
  public static async getPromotionVideos(albumId: string): Promise<Video[]> {
    const videos = await VideoService.getAll();
    return videos.filter(video =>
      video.meta.some(meta => meta.type === 'promotion' && meta.albumId === albumId)
    );
  }

  @ControlledCache('video.getShortsVideos', StaticDataTtl)
  public static async getShortsVideos(
    pagination: PaginationOptions
  ): Promise<PaginationResult<Video>> {
    const videos = await VideoService.getAll();
    const shortsVideos = videos.filter(video => video.meta.some(meta => meta.type === 'shorts'));
    return paginate(shortsVideos, pagination);
  }
}
