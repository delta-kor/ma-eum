import prisma from '@/prisma/prisma';
import { cmsProcedure, router } from '@/trpc/router';
import { ControlledCache, StaticDataTtl } from '@/utils/cache';
import createId from '@/utils/id';
import { Album } from '@prisma/client';
import { z } from 'zod';

const AlbumRouter = router({
  create: cmsProcedure.input(z.object({}).passthrough()).mutation(async opts => {
    const id = createId(6);
    await prisma.album.create({
      data: {
        ...(opts.input as any),
        id,
      },
    });
  }),

  delete: cmsProcedure.input(z.object({ id: z.string() })).mutation(async opts => {
    const id = opts.input.id;
    await prisma.album.delete({
      where: {
        id,
      },
    });
  }),

  update: cmsProcedure.input(z.object({ id: z.string() }).passthrough()).mutation(async opts => {
    const { id } = opts.input;
    await prisma.album.update({
      data: {
        ...opts.input,
      },
      where: {
        id,
      },
    });
  }),
});

export class AlbumService {
  public static router = AlbumRouter;

  @ControlledCache('album.getAll', StaticDataTtl)
  public static async getAll(): Promise<Album[]> {
    return prisma.album.findMany({ orderBy: { release: 'desc' } });
  }
}
