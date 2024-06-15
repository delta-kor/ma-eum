import prisma from '@/prisma/prisma';
import { publicProcedure, router } from '@/trpc/router';
import { ControlledCache, StaticDataTtl } from '@/utils/cache.util';
import { Member } from '@/utils/member.util';
import { sortVideoByTag } from '@/utils/sort.util';
import { Session, Video } from '@prisma/client';
import 'server-only';
import { z } from 'zod';

export interface ExtendedSession extends Session {
  videos: Video[];
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

  @ControlledCache('session.getSessionsByMusicId', StaticDataTtl)
  public static async getSessionsByMusicId(
    musicId: string,
    member?: Member | null
  ): Promise<ExtendedSession[]> {
    if (typeof member === 'undefined') {
      const sessions = await prisma.session.findMany({
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
      for (const session of sessions) sortVideoByTag(session.videos);
      return sessions;
    }

    const sessions = await SessionService.getSessionsByMusicId(musicId);
    for (const session of sessions) {
      session.videos = session.videos.filter(video =>
        member === null
          ? video.meta.every(meta => meta.type !== 'members')
          : video.meta.some(meta => meta.type === 'members' && meta.members.includes(member))
      );
    }

    const filteredSessions = sessions.filter(session => session.videos.length > 0);
    return filteredSessions;
  }
}
