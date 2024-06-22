import prisma from '@/prisma/prisma';
import { cmsProcedure, publicProcedure, router } from '@/trpc/router';
import { DataCache, DynamicDataTtl } from '@/utils/cache.util';
import type { FeedFilter } from '@/utils/feed.util';
import createId from '@/utils/id.util';
import type { PaginationOptions, PaginationResult } from '@/utils/pagination.util';
import { PrismaUtil } from '@/utils/prisma.util';
import { Feed } from '@prisma/client';
import 'server-only';
import { z } from 'zod';

const FeedRouter = router({
  create: cmsProcedure.input(z.object({}).passthrough()).mutation(async opts => {
    const id = createId(6);
    await prisma.feed.create({
      data: {
        ...(opts.input as any),
        id,
      },
    });
  }),

  delete: cmsProcedure.input(z.object({ id: z.string() })).mutation(async opts => {
    const id = opts.input.id;
    await prisma.feed.delete({
      where: {
        id,
      },
    });
  }),

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

  update: cmsProcedure.input(z.object({ id: z.string() }).passthrough()).mutation(async opts => {
    const { id } = opts.input;
    await prisma.feed.update({
      data: {
        ...opts.input,
      },
      where: {
        id,
      },
    });
  }),
});

export class FeedService {
  public static router = FeedRouter;

  @DataCache('feed.getFeeds', DynamicDataTtl)
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
}
