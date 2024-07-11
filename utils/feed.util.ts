import { IconType } from '@/components/core/Icon';
import { Member, getMemberName } from '@/utils/member.util';
import { Feed, FeedType } from '@prisma/client';

export interface FeedFilter {
  date: Date | null;
  direction: 'asc' | 'desc';
  types: FeedType[];
}

export const FeedTypes: FeedType[] = [
  FeedType.TWITTER,
  FeedType.TIKTOK,
  FeedType.BSTAGE,
  FeedType.DAUM,
];

export function getFeedHeader(feed: Feed): string[] {
  switch (feed.type) {
    case FeedType.TWITTER:
      return ['@CSR_officl'];
    case FeedType.TIKTOK:
      return ['@csr_offcl'];
    case FeedType.BSTAGE:
      return (feed.members as Member[]).map(getMemberName);
    case FeedType.DAUM:
      return ['csr.official'];
  }
}

export function getFeedHeaderName(feedType: FeedType): string {
  switch (feedType) {
    case FeedType.TWITTER:
      return 'Twitter';
    case FeedType.TIKTOK:
      return 'Tiktok';
    case FeedType.BSTAGE:
      return 'Bstage';
    case FeedType.DAUM:
      return 'Daum';
  }
}

export function getFeedIconName(feedType: FeedType): IconType {
  switch (feedType) {
    case FeedType.TWITTER:
      return 'twitter';
    case FeedType.TIKTOK:
      return 'tiktok';
    case FeedType.BSTAGE:
      return 'bstage';
    case FeedType.DAUM:
      return 'daum';
  }
}

export function getFeedUrl(feed: Feed): string {
  switch (feed.type) {
    case FeedType.TWITTER:
      return `https://x.com/CSR_offcl/status/${feed.sourceId}`;
    case FeedType.TIKTOK:
      return `https://www.tiktok.com/@csr.offcl/video/${feed.sourceId}`;
    case FeedType.BSTAGE:
      return `https://csr.bstage.in/story/feed/${feed.sourceId}`;
    case FeedType.DAUM:
      return `https://cafe.daum.net/csr.official/${feed.sourceId}`;
    default:
      return '#';
  }
}

export function getHomepageUrl(feed: Feed): string {
  switch (feed.type) {
    case FeedType.TWITTER:
      return 'https://x.com/CSR_offcl/';
    case FeedType.TIKTOK:
      return 'https://www.tiktok.com/@csr.offcl';
    case FeedType.BSTAGE:
      return 'https://csr.bstage.in';
    case FeedType.DAUM:
      return 'https://cafe.daum.net/csr.official';
    default:
      return '#';
  }
}

export function separateTags(content: string): [string, string] {
  const chips = content
    .replace(/#/g, ' #')
    .trim()
    .split(' ')
    .map(chip => chip.trim())
    .filter(chip => chip.length > 0);

  const lastTextChipIndex = chips.findLastIndex(chip => !chip.startsWith('#'));
  const texts = chips
    .slice(0, lastTextChipIndex + 1)
    .join(' ')
    .trim();
  const tags = chips
    .slice(lastTextChipIndex + 1)
    .join(' ')
    .trim();

  return [texts, tags];
}

export function getSanitizedFeedContent(feed: Feed): string {
  const content = feed.title;
  if (feed.type === FeedType.TWITTER)
    return content.split('https://').slice(0, -1).join('https://').trim() || content;
  if (feed.type === FeedType.TIKTOK) {
    const [texts, tags] = separateTags(content);
    return texts ? texts + '\n\n' + tags : tags;
  }

  return content;
}

export function getSanitizedFeedType(feedType: null | string): FeedType[] {
  if (!feedType) return FeedTypes;
  if (FeedTypes.includes(feedType as FeedType)) return [feedType as FeedType];
  return FeedTypes;
}

export function getSanitizedFeedDirection(direction: null | string): 'asc' | 'desc' {
  return direction === 'asc' ? 'asc' : 'desc';
}
