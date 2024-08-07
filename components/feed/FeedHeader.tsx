import Icon from '@/components/core/Icon';
import Translate from '@/components/core/Translate';
import {
  getFeedHeader,
  getFeedHeaderName,
  getFeedIconName,
  getFeedUrl,
  getHomepageUrl,
} from '@/utils/feed.util';
import { Feed } from '@prisma/client';

interface Props {
  feed: Feed;
}

export default function FeedHeader({ feed }: Props) {
  const header = getFeedHeader(feed)[0];
  const name = getFeedHeaderName(feed.type);
  const icon = getFeedIconName(feed.type);

  return (
    <div className="flex items-center justify-between">
      <a href={getHomepageUrl(feed)} target="_blank" className="flex items-center gap-12">
        <div
          data-feed-type={feed.type}
          className="flex size-40 items-center justify-center rounded-full bg-black data-[feed-type=BSTAGE]:bg-gradient-orange data-[feed-type=DAUM]:bg-gradient-primary data-[feed-type=TIKTOK]:bg-gradient-red data-[feed-type=TWITTER]:bg-gradient-gray"
        >
          <Icon type={icon} className="w-20 text-white" />
        </div>
        <div className="text-16 font-700 text-black">
          <Translate>{header}</Translate>
        </div>
      </a>
      <a
        href={getFeedUrl(feed)}
        target="_blank"
        className="flex grow items-center justify-end gap-8 self-stretch"
      >
        <div className="text-16 font-600 text-gray-500">{name}</div>
        <Icon type="share" className="w-14 text-gray-500" />
      </a>
    </div>
  );
}
