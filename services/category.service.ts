import prisma from '@/prisma/prisma';
import { cmsProcedure, router } from '@/trpc/router';
import { ControlledCache, StaticDataTtl } from '@/utils/cache.util';
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

export class CategoryService {
  public static router = CategoryRouter;

  @ControlledCache('category.getAll', StaticDataTtl)
  public static async getAll(): Promise<Category[]> {
    return prisma.category.findMany({
      orderBy: [{ type: 'asc' }, { order: 'asc' }],
    });
  }

  @ControlledCache('category.getOne', StaticDataTtl)
  public static async getOne(id: string): Promise<Category | null> {
    return prisma.category.findUnique({
      where: {
        id,
      },
    });
  }
}
