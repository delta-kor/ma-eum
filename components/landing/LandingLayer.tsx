import LandingWidget from '@/components/landing/LandingWidget';
import Image from 'next/image';

export default function LandingLayer() {
  return (
    <div className="relative aspect-[1536/1316] w-full">
      <Image alt="Landing Layer" src="/landing-layer-cropped.jpeg" fill className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary-100/0 from-80% via-primary-100/45 via-90% to-primary-100" />
      <LandingWidget />
    </div>
  );
}
