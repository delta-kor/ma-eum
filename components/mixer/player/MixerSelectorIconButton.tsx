import Icon from '@/components/core/Icon';
import { ExtendedVideo } from '@/services/video.service';
import { StageVideoMeta, getMetaFromVideo } from '@/utils/video.util';
import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  active: boolean;
  video: ExtendedVideo;
}

export default function MixerSelectorIconButton({ active, video, ...props }: Props) {
  const stageMeta = getMetaFromVideo<StageVideoMeta>(video, 'stage');
  const tag = stageMeta!.tag;
  const isPortrait = tag === 'single_full';

  return (
    <div
      data-active={active}
      className="group cursor-pointer rounded-8 bg-gray-200/70 p-10 data-[active=true]:bg-gradient-primary"
      {...props}
    >
      <Icon
        type={isPortrait ? 'portrait' : 'landscape'}
        className="size-20 text-black/50 group-data-[active=true]:text-white"
      />
    </div>
  );
}
