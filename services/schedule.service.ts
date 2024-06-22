import prisma from '@/prisma/prisma';
import { cmsProcedure, publicProcedure, router } from '@/trpc/router';
import { DataCache, StaticDataTtl } from '@/utils/cache.util';
import createId from '@/utils/id.util';
import { Schedule, ScheduleType } from '@prisma/client';
import { DateTime } from 'luxon';
import 'server-only';
import { z } from 'zod';

export type CalendarDateInfo = Record<string, ScheduleType[]>;

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

  getSchedules: publicProcedure.input(z.object({ date: z.date() })).query(async opts => {
    return ScheduleService.getSchedules(opts.input.date);
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

  @DataCache('schedule.getCalendarDateInfo', StaticDataTtl)
  public static async getCalendarDateInfo(): Promise<CalendarDateInfo> {
    const schedules = await prisma.schedule.findMany({
      orderBy: { date: 'asc' },
      select: { date: true, type: true },
    });

    const result: CalendarDateInfo = {};
    for (const schedule of schedules) {
      const dateTime = DateTime.fromJSDate(schedule.date, { zone: 'Asia/Seoul' });
      const dateKey = dateTime.toFormat('yyyy-MM-dd');
      if (!result[dateKey]) result[dateKey] = [];
      result[dateKey].push(schedule.type);
    }

    return result;
  }

  @DataCache('schedule.getScheduleFeeds', StaticDataTtl)
  public static async getScheduleFeeds(date: Date): Promise<Schedule[]> {
    return prisma.schedule.findMany({
      orderBy: { date: 'asc' },
      take: 2,
      where: {
        date: {
          gte: date,
        },
      },
    });
  }

  @DataCache('schedule.getSchedules', StaticDataTtl)
  public static async getSchedules(date: Date): Promise<Schedule[]> {
    const dateTime = DateTime.fromJSDate(date, { zone: 'Asia/Seoul' });

    return prisma.schedule.findMany({
      orderBy: { date: 'asc' },
      where: {
        date: {
          gte: dateTime.startOf('day').toJSDate(),
          lt: dateTime.endOf('day').toJSDate(),
        },
      },
    });
  }
}
