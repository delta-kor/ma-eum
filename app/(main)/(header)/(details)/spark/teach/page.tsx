import DetailsContent from '@/components/core/header/DetailsContent';
import Title from '@/components/core/header/Title';
import Pc from '@/components/core/responsive/Pc';
import SparkBack from '@/components/spark/SparkBack';
import SparkTeach from '@/components/spark/SparkTeach';
import MetaUtil from '@/utils/meta.util';
import { Metadata } from 'next';

export const revalidate = 18000;
export const runtime = 'edge';

export default function SettingsPage() {
  return (
    <DetailsContent>
      <Title>Spark</Title>
      <div className="px-24">
        <div className="pb-24 pt-36 lg:mx-auto lg:max-w-screen-lg lg:pt-24">
          <Pc className="mb-24 lg:mb-64">
            <SparkBack />
          </Pc>
          <SparkTeach />
        </div>
      </div>
    </DetailsContent>
  );
}

export function generateMetadata(): Metadata {
  return MetaUtil.getSubpage('Teach Spark', 'Teach Spark', '/spark/teach');
}
