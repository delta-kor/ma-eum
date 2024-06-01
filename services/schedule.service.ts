import prisma from '@/prisma/prisma';
import { cmsProcedure, router } from '@/trpc/router';
import createId from '@/utils/id.util';
import 'server-only';
import { z } from 'zod';

const ScheduleRouter = router({
  create: cmsProcedure.input(z.object({}).passthrough()).mutation(async opts => {
    const id = createId(6);
    await prisma.schedule.create({
      data: {
        ...(opts.input as any),
        id,
      },
    });
  }),

  delete: cmsProcedure.input(z.object({ id: z.string() })).mutation(async opts => {
    const id = opts.input.id;
    await prisma.schedule.delete({
      where: {
        id,
      },
    });
  }),

  update: cmsProcedure.input(z.object({ id: z.string() }).passthrough()).mutation(async opts => {
    const { id } = opts.input;
    await prisma.schedule.update({
      data: {
        ...opts.input,
      },
      where: {
        id,
      },
    });
  }),
});

export class ScheduleService {
  public static router = ScheduleRouter;
}
