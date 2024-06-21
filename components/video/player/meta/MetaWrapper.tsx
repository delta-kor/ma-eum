'use client';

import MotionWrapper from '@/components/video/player/MotionWrapper';
import useQuery from '@/hooks/query';
import { VideoMetaType } from '@/utils/video.util';
import { MotionProps } from 'framer-motion';
import { HTMLAttributes, ReactNode } from 'react';

type PropsBase = HTMLAttributes<HTMLDivElement> & MotionProps;
interface Props extends PropsBase {
  alwaysTop?: boolean;
  size?: boolean;
  topFor: VideoMetaType;
  children: ReactNode;
}

export default function MetaWrapper({ alwaysTop, size, topFor, children, ...props }: Props) {
  const query = useQuery();

  const top = query.get('top');
  const order = alwaysTop ? -1 : top === topFor ? 0 : 1;

  const layoutId = `meta-${topFor}-card`;

  return (
    <MotionWrapper layoutId={layoutId} size={size} style={{ order }} {...props}>
      {children}
    </MotionWrapper>
  );
}
