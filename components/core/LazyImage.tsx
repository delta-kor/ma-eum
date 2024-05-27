'use client';

import { LazyLoadImage, LazyLoadImageProps } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

interface Props extends LazyLoadImageProps {}

export default function LazyImage({ className, ...props }: Props) {
  return (
    <div style={{ overflow: 'hidden', position: 'relative' }} className={className}>
      <LazyLoadImage
        effect="opacity"
        style={{
          height: '100%',
          left: '0',
          objectFit: 'cover',
          position: 'absolute',
          top: '0',
          width: '100%',
        }}
        wrapperProps={{
          style: { zIndex: '1' },
        }}
        width="100%"
        {...props}
      />
    </div>
  );
}
