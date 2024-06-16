import Icon from '@/components/core/Icon';
import FeedContent from '@/components/feed/FeedContent';
import FeedHeader from '@/components/feed/FeedHeader';
import { Feed } from '@prisma/client';

interface Props {
  feed: Feed;
}

export default function FeedItem({ feed }: Props) {
  return (
    <div className="flex flex-col gap-16">
      <FeedHeader feed={feed} />
      <FeedContent feed={feed} />
    </div>
  );
}

export function FeedItemPlaceholder() {
  return (
    <div className="flex animate-pulse flex-col gap-16">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-12">
          <div className="flex size-40 items-center justify-center rounded-full bg-gray-100" />
          <div className="h-[19px] w-[96px] rounded-4 bg-gray-100" />
        </div>
        <div className="flex grow items-center justify-end gap-8 self-stretch">
          <div className="h-[19px] w-[50px] rounded-4 bg-gray-100" />
          <Icon type="share" className="w-14 text-gray-500" />
        </div>
      </div>
      <div className="flex flex-col gap-16">
        <div className="flex flex-col gap-12">
          <div className="group relative aspect-square overflow-hidden rounded-16 bg-gray-100" />
        </div>
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-8">
            <div className="h-[19px] w-full rounded-8 bg-gray-100" />
            <div className="h-[19px] w-4/5 rounded-8 bg-gray-100" />
            <div className="h-[19px] w-1/5 rounded-8 bg-gray-100" />
          </div>
          <div className="h-[25px] w-[88px] self-start rounded-8 bg-gray-100" />
        </div>
      </div>
    </div>
  );
}
