import prisma from '@/prisma/prisma';
import { router } from '@/trpc/router';
import { DataCache, StaticDataTtl } from '@/utils/cache.util';
import { Category } from '@prisma/client';
import 'server-only';

const CategoryRouter = router({});

export interface ExtendedCategory extends Category {
  _count: {
    videos: number;
  };
}

export class CategoryService {
  public static router = CategoryRouter;

  @DataCache('category.getAll', StaticDataTtl)
  public static async getAll(): Promise<ExtendedCategory[]> {
    return prisma.category.findMany({
      include: {
        _count: {
          select: {
            videos: true,
          },
        },
      },
      orderBy: [{ type: 'asc' }, { order: 'asc' }],
    });
  }

  @DataCache('category.getOne', StaticDataTtl)
  public static async getOne(id: string): Promise<Category | null> {
    return prisma.category.findUnique({
      where: {
        id,
      },
    });
  }
}
