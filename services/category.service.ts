import prisma from '@/prisma/prisma';
import { cmsProcedure, router } from '@/trpc/router';
import { DataCache, StaticDataTtl } from '@/utils/cache.util';
import createId from '@/utils/id.util';
import { Category } from '@prisma/client';
import 'server-only';
import { z } from 'zod';

const CategoryRouter = router({
  create: cmsProcedure.input(z.object({}).passthrough()).mutation(async opts => {
    const id = createId(6);
    await prisma.category.create({
      data: {
        ...(opts.input as any),
        id,
      },
    });
  }),

  delete: cmsProcedure.input(z.object({ id: z.string() })).mutation(async opts => {
    const id = opts.input.id;
    await prisma.category.delete({
      where: {
        id,
      },
    });
  }),

  update: cmsProcedure.input(z.object({ id: z.string() }).passthrough()).mutation(async opts => {
    const { id } = opts.input;
    await prisma.category.update({
      data: {
        ...opts.input,
      },
      where: {
        id,
      },
    });
  }),
});

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
