import Translate from '@/components/core/Translate';
import MetaVideoItem from '@/components/video/player/meta/MetaVideoItem';
import MetaWrapper from '@/components/video/player/meta/MetaWrapper';
import { MusicService } from '@/services/music.service';
import { ExtendedVideo, VideoService } from '@/services/video.service';
import { MusicVideoMeta, sliceVideosAround } from '@/utils/video.util';
import Link from 'next/link';

interface Props {
  musicMeta: MusicVideoMeta;
  video: ExtendedVideo;
}

export default async function OfficialMetaCard({ musicMeta, video }: Props) {
  const musicId = musicMeta.musicId;
  const musicData = MusicService.getOne(musicId);
  const officialVideosData = VideoService.getOfficialVideos(musicId);

  const [music, officialVideos] = await Promise.all([musicData, officialVideosData]);
  if (!music || officialVideos.length === 0) return null;

  const selectedVideos = sliceVideosAround(officialVideos, video, 1);

  return (
    <MetaWrapper
      topFor="official"
      className="flex flex-col gap-16 rounded-16 bg-gray-50 px-24 py-16"
    >
      <div className="flex items-center justify-between gap-16">
        <div className="shrink-0 text-20 font-700 text-black">
          <Translate>$performance</Translate>
        </div>
        <div className="truncate text-16 font-500 text-gray-500">{music.shortTitle}</div>
      </div>
      <div className="flex flex-col gap-12">
        {selectedVideos.map(item => (
          <MetaVideoItem
            key={item.id}
            active={item.id === video.id}
            metaType="official"
            video={item}
          />
        ))}
      </div>
      <Link
        href={`/videos/albums/${music.albumId}/performance?music=${music.id}`}
        className="-my-16 py-16 text-center text-16 font-600 text-gray-500"
      >
        <Translate>$view_all</Translate>
      </Link>
    </MetaWrapper>
  );
}
