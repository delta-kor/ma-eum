import prisma from '@/prisma/prisma';
import { publicProcedure, router, talkProcedure } from '@/trpc/router';
import Auth from '@/utils/auth.util';
import createId from '@/utils/id.util';
import { PaginationOptions, PaginationResult } from '@/utils/pagination.util';
import { PrismaUtil } from '@/utils/prisma.util';
import TalkUtil from '@/utils/talk.util';
import { TalkArticle, TalkUser, TalkUserRole } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import 'server-only';
import { z } from 'zod';

export interface TalkArticlePayload {
  content: string;
  title: string;
}

export interface TalkArticleMetadata {
  content: string;
  date: Date;
  id: string;
  nickname: string;
  title: string;
}

const TalkRouter = router({
  createArticle: talkProcedure
    .input(
      z.object({
        content: z.string(),
        title: z.string(),
      })
    )
    .mutation(async opts => {
      const input = opts.input;
      const user = opts.ctx.user;

      const payload: TalkArticlePayload = {
        content: input.content,
        title: input.title,
      };

      const article = await TalkService.createArticle(user, payload);
      return article.id;
    }),

  createUser: publicProcedure.input(z.object({ nickname: z.string() })).mutation(async opts => {
    const nickname = opts.input.nickname;
    const user = await TalkService.createUser(nickname);
    const token = Auth.createToken(user);
    Auth.setTokenCookie(token);

    return true;
  }),

  getArticlesMetadata: publicProcedure
    .input(z.object({ cursor: z.string().nullish() }))
    .query(opts => {
      return TalkService.getArticlesMetadata({
        cursor: opts.input.cursor || null,
        limit: 10,
      });
    }),
});

export class TalkService {
  public static router = TalkRouter;

  public static async createArticle(
    user: TalkUser,
    payload: TalkArticlePayload
  ): Promise<TalkArticle> {
    const article = await prisma.talkArticle.create({
      data: {
        content: payload.content,
        id: createId(8),
        title: payload.title,
        userId: user.id,
      },
    });

    return article;
  }

  public static async createUser(nickname: string): Promise<TalkUser> {
    const validateResult = TalkUtil.validateNickname(nickname);
    if (validateResult.error)
      throw new TRPCError({
        code: 'UNPROCESSABLE_CONTENT',
        message: validateResult.message!,
      });
    const sanitizedNickname = validateResult.nickname!;

    const existingUser = await prisma.talkUser.findFirst({
      where: {
        nickname: sanitizedNickname,
      },
    });

    if (existingUser)
      throw new TRPCError({
        code: 'UNPROCESSABLE_CONTENT',
        message: '$error_nickname_in_use',
      });

    const user = await prisma.talkUser.create({
      data: {
        id: createId(8),
        nickname: sanitizedNickname,
        role: TalkUserRole.USER,
      },
    });

    return user;
  }

  public static async getArticlesMetadata(
    pagination: PaginationOptions
  ): Promise<PaginationResult<TalkArticleMetadata>> {
    const articles = await prisma.talkArticle.findMany({
      ...PrismaUtil.paginate(pagination),
      orderBy: [{ date: 'desc' }],
      select: {
        content: true,
        date: true,
        id: true,
        title: true,
        user: {
          select: {
            nickname: true,
          },
        },
      },
    });

    const metadata = articles.map(article => ({
      content: article.content,
      date: article.date,
      id: article.id,
      nickname: article.user.nickname,
      title: article.title,
    }));

    return PrismaUtil.buildPagination(metadata);
  }
}
