import Icon from '@/components/core/Icon';
import { StageVideoMeta, getMetaFromVideo } from '@/utils/video.util';
import { Video } from '@prisma/client';
import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  active: boolean;
  video: Video;
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
