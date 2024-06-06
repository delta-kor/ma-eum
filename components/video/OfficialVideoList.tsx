'use client';

import NoItems from '@/components/core/NoItems';
import OfficialVideoCarousel from '@/components/video/OfficialVideoCarousel';
import OfficialVideoItem from '@/components/video/OfficialVideoItem';
import { trpc } from '@/hooks/trpc';
import { Music } from '@prisma/client';
import { usePathname, useSearchParams } from 'next/navigation';

interface Props {
  musics: Music[];
}

export default function OfficialVideoList({ musics }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const musicQueryValue = searchParams.get('music');
  const selectedMusicId = musics.some(music => music.id === musicQueryValue)
    ? (musicQueryValue as string)
    : musics.find(music => music.isTitle)?.id || musics[0].id;

  const videos = trpc.video.getOfficialVideos.useQuery(
    { musicId: selectedMusicId },
    {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    }
  );
  const items = videos.data;

  return (
    <div className="flex flex-col gap-12">
      <div className="text-20 font-700 text-black">Performance</div>
      {videos.isFetching || !items ? (
        <></>
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
