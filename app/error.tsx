'use client';

import ArtisticText from '@/components/core/ArtisticText';
import Translate from '@/components/core/Translate';
import Link from 'next/link';

interface Props {
  error: { digest?: string } & Error;
  reset: () => void;
}

export default function ErrorPage({ error, reset }: Props) {
  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-36 px-24">
      <ArtisticText type="maeum" className="h-28 text-primary-500" />
      <div className="flex flex-col items-center gap-8">
        <div className="text-36 font-600 text-black">
          <Translate>$500_title</Translate>
        </div>
        <div className="text-18 font-500 text-black">
          <span className="font-700 text-gray-500">{error.name}</span> {error.message}
        </div>
        <div className="text-16 font-500 text-gray-500">Digest: {error.digest || 'N/A'}</div>
      </div>
      <div className="flex items-center gap-16">
        <div
          onClick={reset}
          className="cursor-pointer rounded-8 bg-gradient-primary px-16 py-12 text-18 font-600 text-white"
        >
          <Translate>$500_retry</Translate>
        </div>
        <Link href="/" className="rounded-8 px-16 py-12 text-18 font-500 text-gray-500">
          <Translate>$500_back_to_home</Translate>
        </Link>
      </div>
    </div>
  );
}
