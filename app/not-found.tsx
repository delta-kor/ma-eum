import ArtisticText from '@/components/core/ArtisticText';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  description: 'We cannot find the page you’re looking for.',
  title: 'Page not found',
};

export default function NotFoundPage() {
  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-36 px-24">
      <ArtisticText type="maeum" className="h-28 text-primary-500" />
      <div className="flex flex-col items-center gap-8">
        <div className="text-36 font-600 text-black">Page not found</div>
        <div className="text-18 font-500 text-black">
          We cannot find the page you’re looking for.
        </div>
      </div>
      <Link
        href="/"
        className="rounded-8 bg-gradient-primary px-16 py-12 text-20 font-600 text-white"
      >
        Back to home
      </Link>
    </div>
  );
}
