import prisma from '@/prisma/prisma';
import { cmsProcedure, router } from '@/trpc/router';
import { ControlledCache, StaticDataTtl } from '@/utils/cache';
import createId from '@/utils/id';
import { Music } from '@prisma/client';
import 'server-only';
import { z } from 'zod';

const MusicRouter = router({
  create: cmsProcedure.input(z.object({}).passthrough()).mutation(async opts => {
    const id = createId(6);
    await prisma.music.create({
      data: {
        ...(opts.input as any),
        id,
      },
    });
  }),

  delete: cmsProcedure.input(z.object({ id: z.string() })).mutation(async opts => {
    const id = opts.input.id;
    await prisma.music.delete({
      where: {
        id,
      },
    });
  }),

  update: cmsProcedure.input(z.object({ id: z.string() }).passthrough()).mutation(async opts => {
    const { id } = opts.input;
    await prisma.music.update({
      data: {
        ...opts.input,
      },
      where: {
        id,
      },
    });
  }),
});

export class MusicService {
  public static router = MusicRouter;

  @ControlledCache('music.getAll', StaticDataTtl)
  public static async getAll(): Promise<Music[]> {
    return prisma.music.findMany({ orderBy: { order: 'asc' } });
  }
}
