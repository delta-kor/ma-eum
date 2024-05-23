import prisma from '@/prisma/prisma';
import { LongCache } from '@/services/cache';
import { cmsProcedure, router } from '@/trpc/router';
import { Album } from '@prisma/client';
import { z } from 'zod';

const AlbumRouter = router({
  delete: cmsProcedure.input(z.object({ id: z.string() })).mutation(async opts => {
    const id = opts.input.id;
    await prisma.album.delete({
      where: {
        id,
      },
    });
  }),
});

export class AlbumService {
  public static router = AlbumRouter;

  @LongCache
  public static async getAll(): Promise<Album[]> {
    return prisma.album.findMany();
  }
}
