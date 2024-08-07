import SparkContent from '@/components/spark/SparkContent';
import SparkProvider from '@/providers/SparkProvider';
import MetaUtil from '@/utils/meta.util';
import { Metadata } from 'next';

export const revalidate = 18000;

export default async function SparkPage() {
  return (
    <div className="px-24 pb-24">
      <div className="relative mx-auto mt-artistic-header-height-md w-full max-w-screen-lg lg:mt-artistic-header-height-lg">
        <SparkProvider>
          <SparkContent />
        </SparkProvider>
      </div>
    </div>
  );
}

export function generateMetadata(): Metadata {
  return MetaUtil.getSubpage(
    'Spark',
    'Spark is your go-to AI assistant for all things of CSR',
    '/spark'
  );
}
