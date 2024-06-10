import GradientIcon from '@/components/core/GradientIcon';
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
      className="rounded-8 bg-white/10 p-10 data-[active=true]:bg-gradient-primary"
      {...props}
    >
      <GradientIcon type={isPortrait ? 'portrait' : 'landscape'} className="size-20" />
    </div>
  );
}
