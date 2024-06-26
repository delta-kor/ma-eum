import prisma from '@/prisma/prisma';
import { publicProcedure, router, talkProcedure } from '@/trpc/router';
import Auth from '@/utils/auth.util';
import { DataCache, StaticDataTtl } from '@/utils/cache.util';
import createId from '@/utils/id.util';
import type { PaginationOptions, PaginationResult } from '@/utils/pagination.util';
import { PrismaUtil } from '@/utils/prisma.util';
import TalkUtil from '@/utils/talk.util';
import { Prisma, TalkArticle, TalkUser, TalkUserRole } from '@prisma/client';
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
  likedUsersId: string[];
  nickname: string;
  title: string;
}

export interface ExtendedTalkArticle extends TalkArticle {
  likedUsers: { id: string }[];
  user: TalkUser;
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

  likeArticle: talkProcedure.input(z.object({ articleId: z.string() })).mutation(async opts => {
    const user = opts.ctx.user;
    const articleId = opts.input.articleId;

    const likesCount = await TalkService.likeArticle(user, articleId);
    return likesCount;
  }),
});

export class TalkService {
  public static router = TalkRouter;

  public static async createArticle(
    user: TalkUser,
    payload: TalkArticlePayload
  ): Promise<TalkArticle> {
    const validateResult = TalkUtil.validateArticle(payload.title, payload.content);
    if (validateResult.error)
      throw new TRPCError({
        code: 'UNPROCESSABLE_CONTENT',
        message: validateResult.message!,
      });
    const sanitizedTitle = validateResult.title!;
    const sanitizedContent = validateResult.content!;

    const article = await prisma.talkArticle.create({
      data: {
        content: sanitizedContent,
        id: createId(8),
        title: sanitizedTitle,
        userId: user.id,
      },
    });

    return article;
  }

  public static async createUser(nickname: string): Promise<TalkUser> {
    const token = Auth.getTokenCookie();
    if (token !== null) {
      const user = await Auth.verifyToken(token);
      if (user)
        throw new TRPCError({
          code: 'UNPROCESSABLE_CONTENT',
          message: '$error_already_logged_in',
        });
    }

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

  @DataCache('talk.getArticle', StaticDataTtl)
  public static async getArticle(articleId: string): Promise<ExtendedTalkArticle | null> {
    const article = await prisma.talkArticle.findUnique({
      include: {
        likedUsers: { select: { id: true } },
        user: true,
      },
      where: {
        id: articleId,
      },
    });

    return article || null;
  }

  @DataCache('talk.getArticlesMetadata', StaticDataTtl)
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
        likedUsers: {
          select: {
            id: true,
          },
        },
        title: true,
        user: {
          select: {
            nickname: true,
          },
        },
      },
    });

    const metadata: TalkArticleMetadata[] = articles.map(article => ({
      content: article.content,
      date: article.date,
      id: article.id,
      likedUsersId: article.likedUsers.map(user => user.id),
      nickname: article.user.nickname,
      title: article.title,
    }));

    return PrismaUtil.buildPagination(metadata);
  }

  public static async likeArticle(user: TalkUser, articleId: string): Promise<void> {
    const isLiked = await prisma.talkArticle.findFirst({
      where: {
        AND: [
          {
            id: articleId,
          },
          {
            likedUsers: {
              some: {
                id: user.id,
              },
            },
          },
        ],
      },
    });

    try {
      await prisma.talkArticle.update({
        data: {
          likedUsers: isLiked
            ? { disconnect: { id: user.id } }
            : {
                connect: {
                  id: user.id,
                },
              },
        },
        select: {
          id: true,
        },
        where: {
          id: articleId,
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') throw new TRPCError({ code: 'NOT_FOUND' });
        else throw e;
      }
    }
  }
}
