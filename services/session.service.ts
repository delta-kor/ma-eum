import prisma from '@/prisma/prisma';
import { publicProcedure, router } from '@/trpc/router';
import { ControlledCache, StaticDataTtl } from '@/utils/cache.util';
import { Session } from '@prisma/client';
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
  public static async getSessionsByMusicId(musicId: string): Promise<Session[]> {
    return prisma.session.findMany({
      orderBy: {
        date: 'asc',
      },
      where: {
        musicId,
      },
    });
  }
}
