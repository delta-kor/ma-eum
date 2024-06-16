import Translate from '@/components/core/Translate';
import OfficialVideoItem from '@/components/video/OfficialVideoItem';
import { MusicService } from '@/services/music.service';
import { VideoService } from '@/services/video.service';
import { MusicVideoMeta } from '@/utils/video.util';
import { Video } from '@prisma/client';
import Link from 'next/link';

interface Props {
  musicMeta: MusicVideoMeta;
  video: Video;
}

export default async function OfficialMetaCard({ musicMeta, video }: Props) {
  const musicId = musicMeta.musicId;
  const musicData = MusicService.getOne(musicId);
  const officialVideosData = VideoService.getOfficialVideos(musicId);

  const [music, officialVideos] = await Promise.all([musicData, officialVideosData]);
  if (!music || officialVideos.length === 0) return null;

  let currentVideoIndex = officialVideos.findIndex(item => item.id === video.id);
  if (currentVideoIndex === -1) return null;
  if (currentVideoIndex === 0) currentVideoIndex = 1;
  if (currentVideoIndex === officialVideos.length - 1)
    currentVideoIndex = officialVideos.length - 2;

  const selectedVideos = officialVideos.slice(currentVideoIndex - 1, currentVideoIndex + 2);

  return (
    <div className="flex flex-col gap-16 rounded-16 bg-gray-100 px-24 py-16">
      <div className="flex items-center justify-between">
        <div className="shrink-0 text-20 font-700 text-black">
          <Translate>$performance</Translate>
        </div>
        <div className="text-16 font-500 text-gray-500">{music.shortTitle}</div>
      </div>
      <div className="flex flex-col gap-12">
        {selectedVideos.map(item => (
          <OfficialVideoItem key={item.id} active={item.id === video.id} video={item} attached />
        ))}
      </div>
      <Link
        href={`/videos/albums/${music.albumId}/performance?music=${music.id}`}
        className="-my-16 py-16 text-center text-16 font-600 text-gray-500"
      >
        View All
      </Link>
    </div>
  );
}
