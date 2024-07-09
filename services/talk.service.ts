import {
  revalidateTalkArticleDelete,
  revalidateTalkArticleEdit,
  revalidateTalkArticleHeart,
  revalidateTalkArticleWrite,
  revalidateTalkCommentCreate,
  revalidateTalkCommentDelete,
} from '@/actions/revalidate.action';
import prisma from '@/prisma/prisma';
import { publicProcedure, router, talkProcedure } from '@/trpc/router';
import Auth from '@/utils/auth.util';
import { DataCache, StaticDataTtl } from '@/utils/cache.util';
import createId from '@/utils/id.util';
import type { IndexPaginationOptions, IndexPaginationResult } from '@/utils/pagination.util';
import TalkUtil from '@/utils/talk.util';
import { Prisma, TalkArticle, TalkComment, TalkUser, TalkUserRole } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import 'server-only';
import { z } from 'zod';

export interface TalkArticlePayload {
  content: string;
  title: string;
}

export interface TalkArticleMetadata {
  commentUsersId: string[];
  content: string;
  date: Date;
  id: string;
  likedUsersId: string[];
  nickname: string;
  title: string;
}

export interface TalkCommentMetadata {
  content: string;
  date: Date;
  id: string;
  nickname: string;
  replies: TalkCommentMetadata[];
  userId: string;
}

export interface TrendingTalkArticleMetadata {
  content: string;
  id: string;
  likes: number;
  nickname: string;
  title: string;
}

export interface ExtendedTalkArticle extends TalkArticle {
  comments: { userId: string }[];
  likedUsers: { id: string }[];
  user: TalkUser;
}

export type TalkArticleSort = 'like' | 'newest';

const TalkRouter = router({
  addCommentToArticle: talkProcedure
    .input(
      z.object({ articleId: z.string(), commentId: z.string().optional(), content: z.string() })
    )
    .mutation(async opts => {
      const user = opts.ctx.user;
      const articleId = opts.input.articleId;
      const commentId = opts.input.commentId || null;
      const content = opts.input.content;

      await TalkService.addCommentToArticle(user, articleId, commentId, content);
      await revalidateTalkCommentCreate(articleId);
    }),

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
      await revalidateTalkArticleWrite();
      return article.id;
    }),

  createUser: publicProcedure.input(z.object({ nickname: z.string() })).mutation(async opts => {
    const nickname = opts.input.nickname;
    const user = await TalkService.createUser(nickname);
    const token = Auth.createToken(user);
    Auth.setTokenCookie(token);
  }),

  editArticle: talkProcedure
    .input(z.object({ articleId: z.string(), content: z.string(), title: z.string() }))
    .mutation(async opts => {
      const input = opts.input;
      const user = opts.ctx.user;
      const articleId = input.articleId;

      const payload: TalkArticlePayload = {
        content: input.content,
        title: input.title,
      };

      await TalkService.editArticle(user, articleId, payload);
      await revalidateTalkArticleEdit(articleId);
    }),

  getArticleComments: publicProcedure
    .input(z.object({ articleId: z.string() }))
    .query(async opts => {
      const articleId = opts.input.articleId;
      const comments = await TalkService.getArticleComments(articleId);
      return comments;
    }),

  getArticlesMetadata: publicProcedure
    .input(z.object({ cursor: z.number().nullish(), sort: z.string().optional() }))
    .query(opts => {
      return TalkService.getArticlesMetadata(
        {
          cursor: opts.input.cursor || null,
          limit: 10,
        },
        opts.input.sort as TalkArticleSort
      );
    }),

  likeArticle: talkProcedure.input(z.object({ articleId: z.string() })).mutation(async opts => {
    const user = opts.ctx.user;
    const articleId = opts.input.articleId;

    const likesCount = await TalkService.likeArticle(user, articleId);
    await revalidateTalkArticleHeart(articleId);
    return likesCount;
  }),

  reportArticle: talkProcedure
    .input(z.object({ articleId: z.string(), reason: z.string() }))
    .mutation(async opts => {
      const user = opts.ctx.user;
      const articleId = opts.input.articleId;
      const reason = opts.input.reason;

      await TalkService.reportArticle(user, articleId, reason);
    }),

  reportComment: talkProcedure
    .input(z.object({ commentId: z.string(), reason: z.string() }))
    .mutation(async opts => {
      const user = opts.ctx.user;
      const commentId = opts.input.commentId;
      const reason = opts.input.reason;

      await TalkService.reportComment(user, commentId, reason);
    }),

  softDeleteArticle: talkProcedure
    .input(z.object({ articleId: z.string() }))
    .mutation(async opts => {
      const user = opts.ctx.user;
      const articleId = opts.input.articleId;

      await TalkService.softDeleteArticle(user, articleId);
      await revalidateTalkArticleDelete(articleId);
    }),

  softDeleteComment: talkProcedure
    .input(z.object({ commentId: z.string() }))
    .mutation(async opts => {
      const user = opts.ctx.user;
      const commentId = opts.input.commentId;

      const comment = await TalkService.softDeleteComment(user, commentId);
      await revalidateTalkCommentDelete(comment.articleId);
    }),
});

export class TalkService {
  public static router = TalkRouter;

  public static async addCommentToArticle(
    user: TalkUser,
    articleId: string,
    commentId: null | string,
    content: string
  ): Promise<void> {
    const validateResult = TalkUtil.validateComment(content);
    if (validateResult.error)
      throw new TRPCError({
        code: 'UNPROCESSABLE_CONTENT',
        message: validateResult.message!,
      });
    const sanitizedContent = validateResult.content!;

    try {
      await prisma.talkComment.create({
        data: {
          article: {
            connect: {
              id: articleId,
              isDeleted: false,
            },
          },
          content: sanitizedContent,
          id: createId(8),
          replyTo: commentId
            ? {
                connect: {
                  id: commentId,
                },
              }
            : undefined,
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2003' || e.code === 'P2025') throw new TRPCError({ code: 'NOT_FOUND' });
        else throw e;
      }
    }
  }

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

  public static async editArticle(
    user: TalkUser,
    articleId: string,
    payload: TalkArticlePayload
  ): Promise<void> {
    const article = await prisma.talkArticle.findUnique({
      where: {
        id: articleId,
        isDeleted: false,
      },
    });

    if (!article) throw new TRPCError({ code: 'NOT_FOUND' });
    if (article.userId !== user.id) throw new TRPCError({ code: 'FORBIDDEN' });

    const validateResult = TalkUtil.validateArticle(payload.title, payload.content);
    if (validateResult.error)
      throw new TRPCError({
        code: 'UNPROCESSABLE_CONTENT',
        message: validateResult.message!,
      });
    const sanitizedTitle = validateResult.title!;
    const sanitizedContent = validateResult.content!;

    await prisma.talkArticle.update({
      data: {
        content: sanitizedContent,
        title: sanitizedTitle,
      },
      where: {
        id: articleId,
      },
    });
  }

  @DataCache('talk.getArticle', StaticDataTtl)
  public static async getArticle(articleId: string): Promise<ExtendedTalkArticle | null> {
    const article = await prisma.talkArticle.findUnique({
      include: {
        comments: {
          select: { userId: true },
          where: {
            OR: [{ replyTo: null }, { replyTo: { isDeleted: false } }],
            isDeleted: false,
          },
        },
        likedUsers: { select: { id: true } },
        user: true,
      },
      where: {
        id: articleId,
        isDeleted: false,
      },
    });

    return article || null;
  }

  @DataCache('talk.getArticleComments', StaticDataTtl)
  public static async getArticleComments(articleId: string): Promise<TalkCommentMetadata[]> {
    const comments = await prisma.talkComment.findMany({
      include: {
        replyComments: {
          include: {
            user: {
              select: {
                nickname: true,
              },
            },
          },
          orderBy: [{ date: 'asc' }],
          where: {
            isDeleted: false,
          },
        },
        user: {
          select: {
            id: true,
            nickname: true,
          },
        },
      },
      orderBy: [{ date: 'desc' }],
      where: {
        articleId,
        isDeleted: false,
        replyToId: null,
      },
    });

    return comments.map(comment => ({
      content: comment.content,
      date: comment.date,
      id: comment.id,
      nickname: comment.user.nickname,
      replies: comment.replyComments.map(reply => ({
        content: reply.content,
        date: reply.date,
        id: reply.id,
        nickname: reply.user.nickname,
        replies: [],
        userId: reply.userId,
      })),
      userId: comment.user.id,
    }));
  }

  @DataCache('talk.getArticlesMetadata', StaticDataTtl)
  public static async getArticlesMetadata(
    pagination: IndexPaginationOptions,
    sort: TalkArticleSort = 'newest'
  ): Promise<IndexPaginationResult<TalkArticleMetadata>> {
    const page = pagination.cursor || 0;
    if (page < 0 || isNaN(page)) throw new TRPCError({ code: 'BAD_REQUEST' });

    const [count, articles] = await prisma.$transaction([
      prisma.talkArticle.count({ where: { isDeleted: false } }),
      prisma.talkArticle.findMany({
        orderBy:
          sort === 'like'
            ? [{ likedUsers: { _count: 'desc' } }, { date: 'desc' }]
            : { date: 'desc' },
        select: {
          comments: {
            select: {
              userId: true,
            },
            where: {
              OR: [{ replyTo: null }, { replyTo: { isDeleted: false } }],
              isDeleted: false,
            },
          },
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
        skip: page * pagination.limit,
        take: pagination.limit,
        where: {
          isDeleted: false,
        },
      }),
    ]);

    const metadata: TalkArticleMetadata[] = articles.map(article => ({
      commentUsersId: article.comments.map(comment => comment.userId),
      content: article.content
        .split('\n')
        .filter(item => item.trim())
        .slice(0, 2)
        .join('\n')
        .slice(0, 100),
      date: article.date,
      id: article.id,
      likedUsersId: article.likedUsers.map(user => user.id),
      nickname: article.user.nickname,
      title: article.title,
    }));

    const pages = Math.ceil(count / pagination.limit);
    return {
      items: metadata,
      pages,
    };
  }

  @DataCache('talk.getTrendingArticlesMetadata', StaticDataTtl)
  public static async getTrendingArticlesMetadata(): Promise<TrendingTalkArticleMetadata[]> {
    const articles = await prisma.talkArticle.findMany({
      orderBy: [{ likedUsers: { _count: 'desc' } }, { date: 'desc' }],
      select: {
        _count: {
          select: {
            likedUsers: true,
          },
        },
        content: true,
        id: true,
        title: true,
        user: {
          select: {
            nickname: true,
          },
        },
      },
      skip: 0,
      take: 3,
      where: {
        isDeleted: false,
      },
    });

    return articles.map(article => ({
      content: article.content
        .split('\n')
        .filter(item => item.trim())
        .slice(0, 2)
        .join('\n')
        .slice(0, 100),
      id: article.id,
      likes: article._count.likedUsers,
      nickname: article.user.nickname,
      title: article.title,
    }));
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
          isDeleted: false,
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025' || e.code === 'P2016') throw new TRPCError({ code: 'NOT_FOUND' });
        else throw e;
      }
    }
  }

  public static async reportArticle(
    user: TalkUser,
    articleId: string,
    reason: string
  ): Promise<void> {
    const article = await prisma.talkArticle.findUnique({
      where: {
        id: articleId,
        isDeleted: false,
      },
    });

    if (!article) throw new TRPCError({ code: 'NOT_FOUND' });

    await prisma.talkReport.create({
      data: {
        id: createId(8),
        reason,
        targetId: articleId,
        targetType: 'article',
        userId: user.id,
      },
    });
  }

  public static async reportComment(
    user: TalkUser,
    commentId: string,
    reason: string
  ): Promise<void> {
    const comment = await prisma.talkComment.findUnique({
      where: {
        id: commentId,
        isDeleted: false,
      },
    });

    if (!comment) throw new TRPCError({ code: 'NOT_FOUND' });

    await prisma.talkReport.create({
      data: {
        id: createId(8),
        reason,
        targetId: commentId,
        targetType: 'comment',
        userId: user.id,
      },
    });
  }

  public static async softDeleteArticle(user: TalkUser, articleId: string): Promise<void> {
    const article = await prisma.talkArticle.findUnique({
      where: {
        id: articleId,
        isDeleted: false,
      },
    });

    if (!article) throw new TRPCError({ code: 'NOT_FOUND' });
    if (article.userId !== user.id) throw new TRPCError({ code: 'FORBIDDEN' });

    await prisma.talkArticle.update({
      data: {
        isDeleted: true,
      },
      where: {
        id: articleId,
      },
    });
  }

  public static async softDeleteComment(user: TalkUser, commentId: string): Promise<TalkComment> {
    const comment = await prisma.talkComment.findUnique({
      where: {
        id: commentId,
        isDeleted: false,
      },
    });

    if (!comment) throw new TRPCError({ code: 'NOT_FOUND' });
    if (comment.userId !== user.id) throw new TRPCError({ code: 'FORBIDDEN' });

    const updatedComment = await prisma.talkComment.update({
      data: {
        isDeleted: true,
      },
      where: {
        id: commentId,
      },
    });
    return updatedComment;
  }
}
