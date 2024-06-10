import GradientIcon from '@/components/core/GradientIcon';
import { getShortTagName } from '@/utils/session.util';
import { StageVideoMeta, getMetaFromVideo } from '@/utils/video.util';
import { Video } from '@prisma/client';
import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  active: boolean;
  video: Video;
}

export default function MixerSelectorTextButton({ active, video, ...props }: Props) {
  const stageMeta = getMetaFromVideo<StageVideoMeta>(video, 'stage');
  const tag = stageMeta!.tag;
  const tagName = getShortTagName(tag);
  const isPortrait = tag === 'single_full';

  return (
    <div
      data-active={active}
      className="flex grow basis-0 cursor-pointer items-center justify-center gap-12 rounded-8 bg-white/10 px-16 py-10 data-[active=true]:bg-gradient-primary"
      {...props}
    >
      <GradientIcon type={isPortrait ? 'portrait' : 'landscape'} className="size-24" />
      <div className="text-18 font-600 text-white">{tagName}</div>
    </div>
  );
}
