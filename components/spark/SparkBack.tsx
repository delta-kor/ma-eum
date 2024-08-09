import Icon from '@/components/core/Icon';
import Translate from '@/components/core/Translate';
import Link from 'next/link';

export default function SparkBack() {
  return (
    <Link href={'/spark'} className="-m-8 flex cursor-pointer items-center gap-12 p-8">
      <Icon type="left" className="w-16 text-gray-200" />
      <div className="text-18 font-500 text-gray-500">
        <Translate>$spark_back</Translate>
      </div>
    </Link>
  );
}
