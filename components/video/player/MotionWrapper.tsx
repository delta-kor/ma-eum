'use client';

import { MotionProps, motion } from 'framer-motion';
import { HTMLAttributes, ReactNode } from 'react';

type PropsBase = HTMLAttributes<HTMLDivElement> & MotionProps;
interface Props extends PropsBase {
  layoutId: string;
  size?: boolean;
  children: ReactNode;
}

export default function MotionWrapper({ layoutId, size, children, ...props }: Props) {
  return (
    <motion.div layout={size ? true : 'position'} layoutId={layoutId} {...props}>
      {children}
    </motion.div>
  );
}
