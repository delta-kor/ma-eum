'use client';

import NoItems from '@/components/core/NoItems';
import Translate from '@/components/core/Translate';
import OfficialVideoCarousel from '@/components/video/OfficialVideoCarousel';
import OfficialVideoItem, {
  OfficialVideoItemPlaceholder,
} from '@/components/video/OfficialVideoItem';
import { trpc } from '@/hooks/trpc';
import { PerformanceMusicContext } from '@/providers/PerformanceMusicProvider';
import { useContext } from 'react';

export default function OfficialVideoList() {
  const selectedMusic = useContext(PerformanceMusicContext);
  const selectedMusicId = selectedMusic?.id;

  const videos = trpc.video.getOfficialVideos.useQuery(
    { musicId: selectedMusicId! },
    {
      enabled: !!selectedMusicId,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    }
  );

  const items = videos.data;
  const isLoading = videos.isFetching;

  if (!isLoading && items && !items.length) return null;

  return (
    <div className="flex flex-col gap-12">
      <div className="text-20 font-700 text-black">
        <Translate>$performance</Translate>
      </div>
      {isLoading || !items ? (
        <div className="flex flex-col gap-8">
          <OfficialVideoItemPlaceholder />
          <OfficialVideoItemPlaceholder />
          <OfficialVideoItemPlaceholder />
        </div>
      ) : items.length > 0 ? (
        <OfficialVideoCarousel>
          {items.map(video => (
            <OfficialVideoItem key={video.id} video={video} />
          ))}
        </OfficialVideoCarousel>
      ) : (
        <NoItems />
      )}
    </div>
  );
}
