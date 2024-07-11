import Icon, { IconType } from '@/components/core/Icon';
import SnsCarousel from '@/components/sns/SnsCarousel';
import SnsFeedItem from '@/components/sns/SnsFeedItem';
import { Feed, FeedType } from '@prisma/client';

interface Props {
  feeds: Feed[];
  type: FeedType;
}

export default function SnsFeed({ feeds, type }: Props) {
  let icon: IconType;
  let title: string;
  let color: string;

  switch (type) {
    case FeedType.TWITTER:
      icon = 'twitter';
      title = 'Twitter';
      color = 'text-c-gray';
      break;
    case FeedType.TIKTOK:
      icon = 'tiktok';
      title = 'TikTok';
      color = 'text-c-red';
      break;
    case FeedType.BSTAGE:
      icon = 'bstage';
      title = 'Bstage';
      color = 'text-c-orange';
      break;
    case FeedType.DAUM:
      icon = 'daum';
      title = 'Daum Cafe';
      color = 'text-c-blue';
      break;
  }

  return (
    <div className="flex flex-col gap-12">
      <div className="flex items-center gap-10 self-start">
        <Icon type={icon} className={`w-20 ${color}`} />
        <div className="shrink-0 text-20 font-700 text-black">{title}</div>
      </div>
      <SnsCarousel>
        {feeds.map(video => (
          <SnsFeedItem key={video.id} feed={video} />
        ))}
      </SnsCarousel>
    </div>
  );
}
