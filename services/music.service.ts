import prisma from '@/prisma/prisma';
import { publicProcedure, router } from '@/trpc/router';
import { DataCache, StaticDataTtl } from '@/utils/cache.util';
import { Music, MusicPlayData } from '@prisma/client';
import 'server-only';
import { z } from 'zod';

export interface ExtendedMusic extends Music {
  playData: MusicPlayData | null;
}

const MusicRouter = router({
  getOne: publicProcedure.input(z.object({ id: z.string().nullable() })).query(async opts => {
    if (!opts.input.id) return null;

    return MusicService.getOne(opts.input.id);
  }),
});

export class MusicService {
  public static router = MusicRouter;

  @DataCache('music.getAll', StaticDataTtl)
  public static async getAll(): Promise<Music[]> {
    return prisma.music.findMany({ orderBy: { order: 'asc' } });
  }

  @DataCache('music.getMixableMusics', StaticDataTtl)
  public static async getMixableMusics(): Promise<Music[]> {
    return prisma.music.findMany({
      orderBy: { album: { release: 'desc' } },
      where: {
        isMixable: true,
      },
    });
  }

  @DataCache('music.getOne', StaticDataTtl)
  public static async getOne(id: string): Promise<Music | null> {
    const musics = await MusicService.getAll();
    return musics.find(music => music.id === id) || null;
  }

  @DataCache('music.getOneWithPlayData', StaticDataTtl)
  public static async getOneWithPlayData(musicId: string): Promise<ExtendedMusic | null> {
    return prisma.music.findUnique({
      include: { playData: true },
      where: { id: musicId },
    });
  }

  @DataCache('music.getPerformedMusics', StaticDataTtl)
  public static async getPerformedMusics(albumId: string): Promise<Music[]> {
    return prisma.music.findMany({
      orderBy: { order: 'asc' },
      where: {
        albumId,
        isPerformed: true,
      },
    });
  }
}
