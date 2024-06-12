'use server';

import prisma from '@/prisma/prisma';
import createId from '@/utils/id.util';
import { VividFeed } from '@/utils/vivid.util';
import { FeedType } from '@prisma/client';
import 'server-only';

export async function importVividFeedsFromJson(data: VividFeed[]) {
  if (!Array.isArray(data)) throw new Error('Invalid json data');

  for (const item of data) {
    let feedType: FeedType;
    switch (item.type) {
      case 'twitter':
        feedType = FeedType.TWITTER;
        break;
      case 'tiktok':
        feedType = FeedType.TIKTOK;
        break;
      case 'bstage':
        feedType = FeedType.BSTAGE;
        break;
      default:
        throw new Error('Invalid feed type');
    }

    const existingFeed = await prisma.feed.findFirst({
      where: { sourceId: item.id, type: feedType },
    });
    if (existingFeed) continue;

    await prisma.feed.create({
      data: {
        date: item.date,
        id: createId(6),
        media: item.media,
        members: item.members,
        sourceId: item.id,
        title: item.title,
        type: feedType,
      },
    });
  }
}
