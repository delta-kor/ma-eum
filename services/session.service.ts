import prisma from '@/prisma/prisma';
import { ExtendedVideo } from '@/services/video.service';
import { publicProcedure, router } from '@/trpc/router';
import { DataCache, StaticDataTtl } from '@/utils/cache.util';
import { Member } from '@/utils/member.util';
import { PrismaUtil } from '@/utils/prisma.util';
import { sortVideoByTag } from '@/utils/sort.util';
import { Session } from '@prisma/client';
import 'server-only';
import { z } from 'zod';

export interface ExtendedSession extends Session {
  videos: ExtendedVideo[];
}

const SessionRouter = router({
  getSessionsByMusicId: publicProcedure
    .input(z.object({ member: z.string().nullable(), musicId: z.string() }))
    .query(async opts => {
      return SessionService.getSessionsByMusicId(opts.input.musicId, opts.input.member as Member);
    }),
});

export class SessionService {
  public static router = SessionRouter;

  @DataCache('session.getSessionsByMusicId', StaticDataTtl)
  public static async getSessionsByMusicId(
    musicId: string,
    member?: Member | null
  ): Promise<ExtendedSession[]> {
    const sessions = await prisma.session.findMany({
      include: {
        videos: {
          include: { ...PrismaUtil.extendVideo('stage', 'members', 'music') },
          where: {
            ...PrismaUtil.filterMemberExclusive(member),
          },
        },
      },
      orderBy: {
        date: 'asc',
      },
      where: {
        musicId,
      },
    });

    const filteredSessions = sessions.filter(
      session => session.videos.length > 0
    ) as ExtendedSession[];
    for (const session of filteredSessions) sortVideoByTag(session.videos as ExtendedVideo[]);
    return filteredSessions;
  }
}
