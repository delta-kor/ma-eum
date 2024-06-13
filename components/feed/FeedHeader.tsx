import Icon, { IconType } from '@/components/core/Icon';
import { getFeedHeader, getFeedType, getFeedUrl, getHomepageUrl } from '@/utils/feed.util';
import { Feed, FeedType } from '@prisma/client';

interface Props {
  feed: Feed;
}

export default function FeedHeader({ feed }: Props) {
  const header = getFeedHeader(feed)[0];
  const type = getFeedType(feed);

  let icon: IconType;
  switch (feed.type) {
    case FeedType.TWITTER:
      icon = 'twitter';
      break;
    case FeedType.TIKTOK:
      icon = 'tiktok';
      break;
    case FeedType.BSTAGE:
      icon = 'bstage';
      break;
  }

  return (
    <div className="flex items-center justify-between">
      <a href={getHomepageUrl(feed)} target="_blank" className="flex items-center gap-12">
        <div className="flex size-40 items-center justify-center rounded-full bg-black">
          <Icon type={icon} className="w-20 text-white" />
        </div>
        <div className="text-16 font-700 text-black">{header}</div>
      </a>
      <a
        href={getFeedUrl(feed)}
        target="_blank"
        className="flex grow items-center justify-end gap-8 self-stretch"
      >
        <div className="text-16 font-600 text-gray-500">{type}</div>
        <Icon type="share" className="w-14 text-gray-500" />
      </a>
    </div>
  );
}
