import SnsFeed from '@/components/sns/SnsFeed';
import YoutubeSnsFeed from '@/components/sns/YoutubeSnsFeed';
import { FeedService } from '@/services/feed.service';
import { VideoService } from '@/services/video.service';
import { FeedType } from '@prisma/client';

export default async function SnsList() {
  const videosData = VideoService.getRecentYoutubeVideos(12);
  const twitterFeedsData = FeedService.getFeeds(
    { cursor: null, limit: 12 },
    { date: null, direction: 'desc', types: [FeedType.TWITTER] }
  );
  const tiktokFeedsData = FeedService.getFeeds(
    { cursor: null, limit: 12 },
    { date: null, direction: 'desc', types: [FeedType.TIKTOK] }
  );
  const bstageFeedsData = FeedService.getFeeds(
    { cursor: null, limit: 12 },
    { date: null, direction: 'desc', types: [FeedType.BSTAGE] }
  );
  const daumFeedsData = FeedService.getFeeds(
    { cursor: null, limit: 12 },
    { date: null, direction: 'desc', types: [FeedType.DAUM] }
  );

  const [videos, twitterFeeds, tiktokFeeds, bstageFeeds, daumFeeds] = await Promise.all([
    videosData,
    twitterFeedsData,
    tiktokFeedsData,
    bstageFeedsData,
    daumFeedsData,
  ]);

  return (
    <div className="flex flex-col gap-32">
      <YoutubeSnsFeed videos={videos} />
      <SnsFeed feeds={twitterFeeds.items} type={FeedType.TWITTER} />
      <SnsFeed feeds={tiktokFeeds.items} type={FeedType.TIKTOK} />
      <SnsFeed feeds={bstageFeeds.items} type={FeedType.BSTAGE} />
      <SnsFeed feeds={daumFeeds.items} type={FeedType.DAUM} />
    </div>
  );
}
