import prisma from '@/prisma/prisma';
import { publicProcedure, router } from '@/trpc/router';
import { ControlledCache, StaticDataTtl } from '@/utils/cache.util';
import { ExtendedSession } from '@/utils/session.util';
import { z } from 'zod';

const SessionRouter = router({
  getSessionsByMusicId: publicProcedure
    .input(z.object({ musicId: z.string() }))
    .query(async opts => {
      return SessionService.getSessionsByMusicId(opts.input.musicId);
    }),
});

export class SessionService {
  public static router = SessionRouter;

  @ControlledCache('session.getSessionsByMusicId', StaticDataTtl)
  public static async getSessionsByMusicId(musicId: string): Promise<ExtendedSession[]> {
    return prisma.session.findMany({
      include: {
        videos: true,
      },
      orderBy: {
        date: 'asc',
      },
      where: {
        musicId,
      },
    });
  }
}
