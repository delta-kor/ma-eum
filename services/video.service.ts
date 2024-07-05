import prisma from '@/prisma/prisma';
import { publicProcedure, router } from '@/trpc/router';
import { DataCache, StaticDataTtl } from '@/utils/cache.util';
import { Member } from '@/utils/member.util';
import type { PaginationOptions, PaginationResult } from '@/utils/pagination.util';
import { PrismaUtil } from '@/utils/prisma.util';
import {
  CoverVideoMeta,
  EpisodeVideoMeta,
  FancamVideoMeta,
  InboundChallengeVideoMeta,
  LinkVideoMeta,
  LiveVideoMeta,
  MembersVideoMeta,
  MusicVideoMeta,
  OfficialVideoMeta,
  OutboundChallengeVideoMeta,
  PromotionVideoMeta,
  ShortsVideoMeta,
  StageVideoMeta,
} from '@/utils/video.util';
import { Category, Video } from '@prisma/client';
import 'server-only';
import { z } from 'zod';

export interface ExtendedMetaInfo {
  cover: CoverVideoMeta | null;
  episode: EpisodeVideoMeta | null;
  fancam: FancamVideoMeta | null;
  inboundChallenge: InboundChallengeVideoMeta | null;
  link: LinkVideoMeta | null;
  live: LiveVideoMeta | null;
  members: MembersVideoMeta | null;
  music: MusicVideoMeta | null;
  official: OfficialVideoMeta | null;
  outboundChallenge: OutboundChallengeVideoMeta | null;
  promotion: PromotionVideoMeta | null;
  shorts: ShortsVideoMeta | null;
  stage: StageVideoMeta | null;
}

export interface ExtendedVideo extends Video {
  metaInfo: ExtendedMetaInfo | null;
}

export interface ExtendedVideoWithCategory extends ExtendedVideo {
  categories: Category[];
}

export interface ChallengeVideoFilter {
  musicId?: string;
}

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
    .input(
      z.object({
        cursor: z.string().nullish(),
        filter: z
          .object({
            musicId: z.string(),
          })
          .partial()
          .optional(),
        member: z.string().nullable(),
      })
    )
    .query(opts => {
      return VideoService.getChallengeVideos(
        opts.input.member as Member,
        {
          cursor: opts.input.cursor || null,
          limit: 20,
        },
        opts.input.filter
      );
    }),

  getCoverVideos: publicProcedure.input(z.object({ member: z.string().nullable() })).query(opts => {
    return VideoService.getCoverVideos(opts.input.member as Member);
  }),

  getOfficialVideos: publicProcedure.input(z.object({ musicId: z.string() })).query(opts => {
    return VideoService.getOfficialVideos(opts.input.musicId);
  }),

  getShortsVideos: publicProcedure.input(z.object({ cursor: z.string().nullish() })).query(opts => {
    return VideoService.getShortsVideos({
      cursor: opts.input.cursor || null,
      limit: 30,
    });
  }),
});

export class VideoService {
  public static router = VideoRouter;

  // @DataCache('video.getAll', StaticDataTtl)
  // public static async getAll(): Promise<ExtendedVideo[]> {
  //   return prisma.video.findMany({
  //     include: {
  //       ...PrismaUtil.extendVideo(),
  //     },
  //     orderBy: PrismaUtil.sortVideo(),
  //   })
  // }

  @DataCache('video.getCategoryVideos', StaticDataTtl)
  public static async getCategoryVideos(
    categoryId: string,
    member: Member | null
  ): Promise<ExtendedVideo[]> {
    const videos = (await prisma.video.findMany({
      include: { ...PrismaUtil.extendVideo('episode') },
      orderBy: PrismaUtil.sortVideo(),
      where: {
        categories: { some: { id: categoryId } },
        metaInfo: {
          ...PrismaUtil.filterMember(member),
        },
      },
    })) as ExtendedVideo[];

    if (videos.every(video => video.metaInfo?.episode?.episode !== null))
      videos.sort((a, b) => a.date.getTime() - b.date.getTime());

    return videos;
  }

  @DataCache('video.getChallengeVideos', StaticDataTtl)
  public static async getChallengeVideos(
    member: Member | null,
    pagination: PaginationOptions,
    filter: ChallengeVideoFilter = {}
  ): Promise<PaginationResult<ExtendedVideo>> {
    const videos = await prisma.video.findMany({
      ...PrismaUtil.paginate(pagination),
      include: {
        ...PrismaUtil.extendVideo('inboundChallenge', 'outboundChallenge', 'music', 'members'),
      },
      orderBy: PrismaUtil.sortVideo(),
      where: {
        metaInfo: {
          OR: [
            {
              inboundChallenge: {
                isNot: null,
              },
            },
            {
              outboundChallenge: {
                isNot: null,
              },
            },
          ],
          music: filter.musicId ? { musicId: filter.musicId } : {},
          ...PrismaUtil.filterMember(member),
        },
      },
    });

    return PrismaUtil.buildPagination(videos as ExtendedVideo[]);
  }

  @DataCache('video.getCoverVideos', StaticDataTtl)
  public static async getCoverVideos(member: Member | null): Promise<ExtendedVideo[]> {
    const videos = await prisma.video.findMany({
      include: { ...PrismaUtil.extendVideo('cover') },
      orderBy: PrismaUtil.sortVideo(),
      where: {
        metaInfo: {
          cover: {
            isNot: null,
          },
          ...PrismaUtil.filterMember(member),
        },
      },
    });

    return videos as ExtendedVideo[];
  }

  @DataCache('video.getLiveVideos', StaticDataTtl)
  public static async getLiveVideos(): Promise<ExtendedVideo[]> {
    const videos = await prisma.video.findMany({
      include: { ...PrismaUtil.extendVideo('live', 'episode') },
      orderBy: PrismaUtil.sortVideo(),
      where: {
        metaInfo: {
          live: {
            disable: false,
          },
        },
      },
    });

    return videos as ExtendedVideo[];
  }

  @DataCache('video.getOfficialVideos', StaticDataTtl)
  public static async getOfficialVideos(musicId: string): Promise<ExtendedVideo[]> {
    const video = await prisma.video.findMany({
      include: { ...PrismaUtil.extendVideo('official') },
      orderBy: [{ metaInfo: { official: { order: 'asc' } } }, ...PrismaUtil.sortVideo()],
      where: {
        metaInfo: {
          music: {
            musicId,
          },
          official: {
            isNot: null,
          },
        },
      },
    });

    return video as ExtendedVideo[];
  }

  @DataCache('video.getOne', StaticDataTtl)
  public static async getOne(videoId: string): Promise<ExtendedVideo | null> {
    const video = await prisma.video.findUnique({
      include: { ...PrismaUtil.extendVideoAll() },
      where: { id: videoId },
    });

    return (video as ExtendedVideo) || null;
  }

  @DataCache('video.getOneWithCategory', StaticDataTtl)
  public static async getOneWithCategory(
    videoId: string
  ): Promise<ExtendedVideoWithCategory | null> {
    const videos = await prisma.video.findUnique({
      include: { ...PrismaUtil.extendVideoAll(), categories: true },
      where: { id: videoId },
    });

    return (videos as ExtendedVideoWithCategory) || null;
  }

  @DataCache('video.getPromotionVideos', StaticDataTtl)
  public static async getPromotionVideos(albumId: string): Promise<ExtendedVideo[]> {
    const videos = await prisma.video.findMany({
      include: { ...PrismaUtil.extendVideo('promotion') },
      orderBy: [{ metaInfo: { promotion: { order: 'asc' } } }, ...PrismaUtil.sortVideo()],
      where: {
        metaInfo: {
          promotion: {
            albumId,
          },
        },
      },
    });

    return videos as ExtendedVideo[];
  }

  @DataCache('video.getShortsVideos', StaticDataTtl)
  public static async getShortsVideos(
    pagination: PaginationOptions
  ): Promise<PaginationResult<ExtendedVideo>> {
    const videos = await prisma.video.findMany({
      ...PrismaUtil.paginate(pagination),
      include: { ...PrismaUtil.extendVideo('shorts') },
      orderBy: PrismaUtil.sortVideo(),
      where: {
        metaInfo: {
          shorts: {
            isNot: null,
          },
        },
      },
    });

    return PrismaUtil.buildPagination(videos as ExtendedVideo[]);
  }
}
