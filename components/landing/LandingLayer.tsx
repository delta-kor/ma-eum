import LandingWidget from '@/components/landing/LandingWidget';

export default function LandingLayer() {
  return (
    <div className="relative">
      <div className="relative aspect-[1536/1316] w-full overflow-hidden transition-all duration-500 sm:aspect-auto sm:h-[320px] md:h-[430px] lg:h-[500px]">
        <picture>
          <source media="(min-width: 1024px)" srcSet="/layer/pc.jpg" />
          <source media="(min-width: 640px)" srcSet="/layer/tablet.jpg" />
          <img
            alt="layer"
            src="/layer/mobile.jpg"
            className="absolute left-0 top-0 size-full object-cover transition-all duration-500 md:scale-[1.08] lg:scale-[1.35] xl:scale-100"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-b from-primary-200/0 from-80% via-primary-200/45 via-90% to-primary-200" />
      </div>
      <LandingWidget />
    </div>
  );
}
