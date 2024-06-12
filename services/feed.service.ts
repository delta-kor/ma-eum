import prisma from '@/prisma/prisma';
import { cmsProcedure, router } from '@/trpc/router';
import createId from '@/utils/id.util';
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
}
