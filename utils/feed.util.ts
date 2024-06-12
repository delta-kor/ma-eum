import { Member, getMemberName } from '@/utils/video.util';
import { Feed, FeedType } from '@prisma/client';

export function getFeedHeader(feed: Feed): string[] {
  switch (feed.type) {
    case FeedType.TWITTER:
      return ['@CSR_officl'];
    case FeedType.TIKTOK:
      return ['@csr_offcl'];
    case FeedType.BSTAGE:
      return (feed.members as Member[]).map(getMemberName);
  }
}

export function getFeedType(feed: Feed): string {
  switch (feed.type) {
    case FeedType.TWITTER:
      return 'Twitter';
    case FeedType.TIKTOK:
      return 'Tiktok';
    case FeedType.BSTAGE:
      return 'Bstage';
  }
}
