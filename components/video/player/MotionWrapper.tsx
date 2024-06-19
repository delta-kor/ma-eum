'use client';

import { MotionProps, motion } from 'framer-motion';
import { HTMLAttributes, ReactNode } from 'react';

type PropsBase = HTMLAttributes<HTMLDivElement> & MotionProps;
interface Props extends PropsBase {
  layoutId: string;
  children: ReactNode;
}

export default function MotionWrapper({ layoutId, children, ...props }: Props) {
  return (
    <motion.div layout="position" layoutId={layoutId} {...props}>
      {children}
    </motion.div>
  );
}
