import Translate from '@/components/core/Translate';
import MixerSelectorIconButton from '@/components/mixer/player/MixerSelectorIconButton';
import MixerSelectorTextButton from '@/components/mixer/player/MixerSelectorTextButton';
import useMixerControl from '@/hooks/mixer-control';
import { ExtendedSession } from '@/services/session.service';
import {
  Member,
  Members,
  MembersVideoMeta,
  StageVideoMeta,
  getMemberName,
  getMetaFromVideo,
} from '@/utils/video.util';
import { Video } from '@prisma/client';

interface Props {
  session: ExtendedSession;
}

export default function MixerSelectorSessionMenu({ session }: Props) {
  const mixerControl = useMixerControl();

  const activeVideo = mixerControl.video;
  const videos = session.videos;

  const groupVideos = videos.filter(
    video => getMetaFromVideo<MembersVideoMeta>(video, 'members') === null
  );
  const groupVideosTag = groupVideos.map(
    video => getMetaFromVideo<StageVideoMeta>(video, 'stage')?.tag
  );

  if (groupVideosTag.includes('full') && groupVideosTag.includes('full_hd')) {
    groupVideos.splice(groupVideosTag.indexOf('full'), 1);
  }

  function getMemberVideos(member: Member) {
    return videos.filter(video =>
      getMetaFromVideo<MembersVideoMeta>(video, 'members')?.members.includes(member)
    );
  }

  function handleVideoClick(video: Video) {
    mixerControl.selectVideo(video);
  }

  return (
    <div className="flex flex-col gap-12">
      <div className="flex items-center gap-12">
        {groupVideos.map((video, index) => (
          <MixerSelectorTextButton
            key={video.id}
            active={activeVideo.id === video.id}
            video={video}
            onClick={() => handleVideoClick(video)}
          />
        ))}
      </div>
      <div className="flex flex-col gap-12">
        {Members.map(member => (
          <div key={member} className="flex h-40 items-center justify-between">
            <div className="text-18 font-400 text-white">
              <Translate>{getMemberName(member)}</Translate>
            </div>
            <div className="flex gap-12">
              {getMemberVideos(member).map(video => (
                <MixerSelectorIconButton
                  key={video.id}
                  active={activeVideo.id === video.id}
                  video={video}
                  onClick={() => handleVideoClick(video)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}