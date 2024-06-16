import Mobile from '@/components/core/responsive/Mobile';
import LandingWidget from '@/components/landing/LandingWidget';
import { getImageProps } from 'next/image';

export default function LandingLayer() {
  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({ alt: 'CSR', fill: true, src: '/layer/mobile.jpg' });
  const {
    props: { srcSet: tablet },
  } = getImageProps({ alt: 'CSR', fill: true, src: '/layer/tablet.jpg' });
  const {
    props: { srcSet: pc },
  } = getImageProps({ alt: 'CSR', fill: true, src: '/layer/pc.jpg' });

  return (
    <div className="relative">
      <div
        style={{ marginTop: `min(calc(-100vw * (327 / 1536) + 64px), 0px)` }}
        className="relative aspect-[1536/1279] w-full overflow-hidden sm:!mt-0 sm:aspect-auto sm:h-[320px] md:h-[430px] lg:h-[500px] xl:h-[540px]"
      >
        <picture>
          <source media="(min-width: 1024px)" srcSet={pc} /> {/* lg */}
          <source media="(min-width: 640px)" srcSet={tablet} /> {/* sm */}
          <source srcSet={mobile} />
          <img
            alt="layer"
            {...rest}
            className="absolute left-0 top-0 size-full object-cover md:scale-[1.08] lg:scale-125 xl:scale-100"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-b from-primary-200/0 from-80% via-primary-200/45 via-90% to-primary-200 lg:via-white/45 lg:to-white" />
      </div>
      <Mobile>
        <LandingWidget />
      </Mobile>
    </div>
  );
}
