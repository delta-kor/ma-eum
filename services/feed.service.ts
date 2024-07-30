import prisma from '@/prisma/prisma';
import { publicProcedure, router } from '@/trpc/router';
import { DataCache, StaticDataTtl } from '@/utils/cache.util';
import type { FeedFilter } from '@/utils/feed.util';
import type { PaginationOptions, PaginationResult } from '@/utils/pagination.util';
import { PrismaUtil } from '@/utils/prisma.util';
import { Feed, FeedType } from '@prisma/client';
import 'server-only';
import { z } from 'zod';

const FeedRouter = router({
  getFeeds: publicProcedure
    .input(
      z.object({
        cursor: z.string().nullish(),
        filter: z.object({
          date: z.date().nullable(),
          direction: z.enum(['asc', 'desc']),
          types: z.array(z.enum(['TWITTER', 'TIKTOK', 'BSTAGE', 'DAUM'])),
        }),
      })
    )
    .query(async opts => {
      return FeedService.getFeeds(
        {
          cursor: opts.input.cursor || null,
          limit: 15,
        },
        opts.input.filter
      );
    }),
});

export class FeedService {
  public static router = FeedRouter;

  @DataCache('feed.getFeeds', StaticDataTtl)
  public static async getFeeds(
    pagination: PaginationOptions,
    filter: FeedFilter
  ): Promise<PaginationResult<Feed>> {
    const feeds = await prisma.feed.findMany({
      ...PrismaUtil.paginate(pagination),
      orderBy: [{ date: filter.direction }, { id: filter.direction }],
      where: {
        date: filter.date ? { gte: filter.date } : undefined,
        type: {
          in: filter.types,
        },
      },
    });

    return PrismaUtil.buildPagination(feeds);
  }

  @DataCache('feed.getRecentFeeds', StaticDataTtl)
  public static async getRecentFeeds(
    limit: number
  ): Promise<
    [PaginationResult<Feed>, PaginationResult<Feed>, PaginationResult<Feed>, PaginationResult<Feed>]
  > {
    const twitterFeedsData = FeedService.getFeeds(
      { cursor: null, limit },
      { date: null, direction: 'desc', types: [FeedType.TWITTER] }
    );
    const tiktokFeedsData = FeedService.getFeeds(
      { cursor: null, limit },
      { date: null, direction: 'desc', types: [FeedType.TIKTOK] }
    );
    const bstageFeedsData = FeedService.getFeeds(
      { cursor: null, limit },
      { date: null, direction: 'desc', types: [FeedType.BSTAGE] }
    );
    const daumFeedsData = FeedService.getFeeds(
      { cursor: null, limit },
      { date: null, direction: 'desc', types: [FeedType.DAUM] }
    );

    return Promise.all([twitterFeedsData, tiktokFeedsData, bstageFeedsData, daumFeedsData]);
  }
}
