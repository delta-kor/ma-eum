import prisma from '@/prisma/prisma';
import { publicProcedure, router, talkProcedure } from '@/trpc/router';
import Auth from '@/utils/auth.util';
import createId from '@/utils/id.util';
import { TalkArticle, TalkUser, TalkUserRole } from '@prisma/client';
import 'server-only';
import { z } from 'zod';

export interface TalkArticlePayload {
  content: string;
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
    const user = await prisma.talkUser.create({
      data: {
        id: createId(8),
        nickname,
        role: TalkUserRole.USER,
      },
    });

    return user;
  }
}
