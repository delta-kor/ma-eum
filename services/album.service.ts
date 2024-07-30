import prisma from '@/prisma/prisma';
import { router } from '@/trpc/router';
import { DataCache, StaticDataTtl } from '@/utils/cache.util';
import { Album } from '@prisma/client';
import 'server-only';

const AlbumRouter = router({});

export class AlbumService {
  public static router = AlbumRouter;

  @DataCache('album.getAll', StaticDataTtl)
  public static async getAll(): Promise<Album[]> {
    return prisma.album.findMany({ orderBy: { release: 'desc' } });
  }

  @DataCache('album.getOne', StaticDataTtl)
  public static async getOne(id: string): Promise<Album | null> {
    return prisma.album.findUnique({ where: { id } });
  }

  @DataCache('album.getOneByMusicId', StaticDataTtl)
  public static async getOneByMusicId(musicId: string): Promise<Album | null> {
    return prisma.album.findFirst({
      where: {
        musics: {
          some: {
            id: musicId,
          },
        },
      },
    });
  }
}
