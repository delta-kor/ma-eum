import Icon from '@/components/core/Icon';
import { ExtendedVideo } from '@/services/video.service';
import { getShortTagName } from '@/utils/session.util';
import { StageVideoMeta, getMetaFromVideo } from '@/utils/video.util';
import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  active: boolean;
  video: ExtendedVideo;
}

export default function MixerSelectorTextButton({ active, video, ...props }: Props) {
  const stageMeta = getMetaFromVideo<StageVideoMeta>(video, 'stage');
  const tag = stageMeta!.tag;
  const tagName = getShortTagName(tag);
  const isPortrait = tag === 'single_full';

  return (
    <div
      data-active={active}
      className="group flex grow basis-0 cursor-pointer items-center justify-center gap-12 rounded-8 bg-gray-200/70 px-16 py-10 data-[active=true]:bg-gradient-primary"
      {...props}
    >
      <Icon
        type={isPortrait ? 'portrait' : 'landscape'}
        className="size-24 text-black/50 group-data-[active=true]:text-white"
      />
      <div className="select-none text-18 font-600 text-black group-data-[active=true]:text-white">
        {tagName}
      </div>
    </div>
  );
}
