import Icon, { IconType } from '@/components/core/Icon';
import SnsCarousel from '@/components/sns/SnsCarousel';
import SnsFeedItem from '@/components/sns/SnsFeedItem';
import { Feed, FeedType } from '@prisma/client';
import Link from 'next/link';

interface Props {
  feeds: Feed[];
  type: FeedType;
}

export default function SnsFeed({ feeds, type }: Props) {
  let icon: IconType;
  let title: string;
  let color: string;
  let link: string;

  switch (type) {
    case FeedType.TWITTER:
      icon = 'twitter';
      title = 'Twitter';
      color = 'text-c-gray';
      link = '/discover?feed=TWITTER';
      break;
    case FeedType.TIKTOK:
      icon = 'tiktok';
      title = 'TikTok';
      color = 'text-c-red';
      link = '/discover?feed=TIKTOK';
      break;
    case FeedType.BSTAGE:
      icon = 'bstage';
      title = 'Bstage';
      color = 'text-c-orange';
      link = '/discover?feed=BSTAGE';
      break;
    case FeedType.DAUM:
      icon = 'daum';
      title = 'Daum Cafe';
      color = 'text-c-blue';
      link = '/discover?feed=DAUM';
      break;
  }

  return (
    <div className="flex flex-col gap-12">
      <Link href={link} className="flex items-center gap-10 self-start">
        <Icon type={icon} className={`w-20 ${color}`} />
        <div className="shrink-0 text-20 font-700 text-black">{title}</div>
      </Link>
      <SnsCarousel>
        {feeds.map(video => (
          <SnsFeedItem key={video.id} feed={video} />
        ))}
        <Link href={link} className="flex snap-start items-center justify-center px-24">
          <div className="text-18 font-500 text-primary-500">More</div>
        </Link>
      </SnsCarousel>
    </div>
  );
}
