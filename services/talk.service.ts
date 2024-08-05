import {
  revalidateTalkArticleDelete,
  revalidateTalkArticleEdit,
  revalidateTalkArticleHeart,
  revalidateTalkArticleWrite,
  revalidateTalkCommentCreate,
  revalidateTalkCommentDelete,
  revalidateTalkUserNicknameUpdate,
} from '@/actions/revalidate.action';
import prisma from '@/prisma/prisma';
import { publicProcedure, router, talkProcedure } from '@/trpc/router';
import Auth from '@/utils/auth.util';
import { DataCache, StaticDataTtl } from '@/utils/cache.util';
import createId from '@/utils/id.util';
import type { IndexPaginationOptions, IndexPaginationResult } from '@/utils/pagination.util';
import TalkUtil from '@/utils/talk.util';
import { formatTimeAsTime } from '@/utils/time.util';
import Void from '@/utils/void.util';
import type { TalkUser } from '@prisma/client';
import { Prisma, TalkArticle, TalkBlock, TalkComment, TalkUserRole } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import 'server-only';
import { z } from 'zod';

export interface TalkArticlePayload {
  content: string;
  poll?: TalkPollPayload;
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

export interface TalkProfile {
  id: string;
  nickname: string;
  role: string;
}

export interface TalkPollPayload {
  options: string[];
  title: string;
}

export interface TalkPollMetadata {
  id: string;
  options: string[];
  participants: number;
  results: number[];
  title: string;
  voted: null | number;
}

export type TalkArticleSort = 'like' | 'newest';

const TalkRouter = router({
  addCommentToArticle: talkProcedure
    .input(
      z.object({ articleId: z.string(), commentId: z.string().optional(), content: z.string() })
    )
    .mutation(async opts => {
      const user = opts.ctx.user;
      const ip = opts.ctx.ip;
      const articleId = opts.input.articleId;
      const commentId = opts.input.commentId || null;
      const content = opts.input.content;

      await TalkService.addCommentToArticle(user, articleId, commentId, content, ip);
      await revalidateTalkCommentCreate(articleId);
    }),

  createArticle: talkProcedure
    .input(
      z.object({
        content: z.string(),
        poll: z
          .object({
            options: z.array(z.string().trim().min(1).max(50)).min(2).max(5),
            title: z.string().trim().min(1).max(100),
          })
          .optional(),
        title: z.string(),
      })
    )
    .mutation(async opts => {
      const input = opts.input;
      const user = opts.ctx.user;
      const ip = opts.ctx.ip;

      const payload: TalkArticlePayload = {
        content: input.content,
        poll: input.poll,
        title: input.title,
      };

      const article = await TalkService.createArticle(user, payload, ip);
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

  getPollMetadata: publicProcedure.input(z.object({ pollId: z.string() })).query(async opts => {
    const pollId = opts.input.pollId;
    const user = null;
    return TalkService.getPollMetadata(pollId, user);
  }),

  getProfile: talkProcedure.query(async opts => {
    const user = opts.ctx.user;
    return TalkService.getProfileByUser(user);
  }),

  getTrendingTalkArticlesMetadata: publicProcedure.query(async () => {
    return TalkService.getTrendingArticlesMetadata();
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

  updateUserNickname: talkProcedure
    .input(z.object({ nickname: z.string() }))
    .mutation(async opts => {
      const user = opts.ctx.user;
      const nickname = opts.input.nickname;
      await TalkService.updateUserNickname(user, nickname);
      await revalidateTalkUserNicknameUpdate();
    }),
});

export class TalkService {
  public static router = TalkRouter;

  public static async addCommentToArticle(
    user: TalkUser,
    articleId: string,
    commentId: null | string,
    content: string,
    ip: string
  ): Promise<void> {
    const validateResult = TalkUtil.validateComment(content);
    if (validateResult.error)
      throw new TRPCError({
        code: 'UNPROCESSABLE_CONTENT',
        message: validateResult.message!,
      });
    const sanitizedContent = validateResult.content!;

    await TalkService.checkIfUserCanWrite(user);

    const recentComment = await prisma.talkComment.findFirst({
      orderBy: { date: 'desc' },
      select: {
        date: true,
        id: true,
      },
      skip: 9,
      take: 1,
      where: {
        userId: user.id,
      },
    });
    if (recentComment && Date.now() - recentComment.date.getTime() < 5 * 60 * 1000)
      throw new TRPCError({ code: 'TOO_MANY_REQUESTS' });

    await TalkService.checkIfContentCanBePosted(content);

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
          ip,
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

  public static async checkIfContentCanBePosted(content: string): Promise<boolean> {
    const isVoid = await Void.check(content);
    if (isVoid === true)
      throw new TRPCError({
        code: 'UNPROCESSABLE_CONTENT',
        message: '$error_inappropriate_content',
      });

    return isVoid !== null;
  }

  public static async checkIfUserCanWrite(user: TalkUser): Promise<void> {
    const block = await TalkService.getBlock(user.id);
    if (block && TalkUtil.isBlocked(block))
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: `Blocked until ${formatTimeAsTime(block.until)} (KST)\nReason: ${block.reason}`,
      });
  }

  public static async createArticle(
    user: TalkUser,
    payload: TalkArticlePayload,
    ip: string
  ): Promise<TalkArticle> {
    const validateResult = TalkUtil.validateArticle(payload.title, payload.content);
    if (validateResult.error)
      throw new TRPCError({
        code: 'UNPROCESSABLE_CONTENT',
        message: validateResult.message!,
      });
    const sanitizedTitle = validateResult.title!;
    const sanitizedContent = validateResult.content!;

    await TalkService.checkIfUserCanWrite(user);

    const recentArticle = await prisma.talkArticle.findFirst({
      orderBy: { date: 'desc' },
      select: {
        date: true,
        id: true,
      },
      skip: 4,
      take: 1,
      where: {
        userId: user.id,
      },
    });
    if (recentArticle && Date.now() - recentArticle.date.getTime() < 10 * 60 * 1000)
      throw new TRPCError({ code: 'TOO_MANY_REQUESTS' });

    await TalkService.checkIfContentCanBePosted(`${sanitizedTitle};${sanitizedContent}`);

    const article = await prisma.talkArticle.create({
      data: {
        content: sanitizedContent,
        id: createId(8),
        ip,
        poll: payload.poll
          ? {
              create: {
                id: createId(6),
                options: payload.poll.options,
                title: payload.poll.title,
              },
            }
          : undefined,
        title: sanitizedTitle,
        user: { connect: { id: user.id } },
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

    await TalkService.checkIfContentCanBePosted(sanitizedNickname);

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

    await TalkService.checkIfUserCanWrite(user);
    await TalkService.checkIfContentCanBePosted(`${sanitizedTitle};${sanitizedContent}`);

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
      content: TalkUtil.truncateContent(article.content),
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

  @DataCache('talk.getBlock', StaticDataTtl)
  public static async getBlock(userId: string): Promise<TalkBlock | null> {
    return prisma.talkBlock.findFirst({
      orderBy: {
        until: 'desc',
      },
      where: {
        userId,
      },
    });
  }

  @DataCache('talk.getPollMetadata', StaticDataTtl)
  public static async getPollMetadata(
    pollId: string,
    user: TalkUser | null
  ): Promise<TalkPollMetadata | null> {
    const poll = await prisma.talkPoll.findUnique({
      where: {
        id: pollId,
      },
    });

    if (!poll) return null;

    return {
      id: poll.id,
      options: poll.options,
      participants: 0,
      results: poll.options.map(() => 0),
      title: poll.title,
      voted: null,
    };
  }

  public static getProfileByUser(user: TalkUser): TalkProfile {
    return {
      id: user.id,
      nickname: user.nickname,
      role: user.role,
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
      content: TalkUtil.truncateContent(article.content),
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

  public static async updateUserNickname(user: TalkUser, nickname: string): Promise<void> {
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

    await TalkService.checkIfUserCanWrite(user);
    await TalkService.checkIfContentCanBePosted(sanitizedNickname);

    await prisma.talkUser.update({
      data: {
        nickname: sanitizedNickname,
      },
      where: {
        id: user.id,
      },
    });
  }
}
