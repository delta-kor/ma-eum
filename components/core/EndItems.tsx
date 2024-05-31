import Icon from '@/components/core/Icon';
import Translate from '@/components/core/Translate';

export default function EndItems() {
  return (
    <div className="flex flex-col gap-12 pt-8">
      <Icon type="csr" className="h-24 text-gray-200" />
      <div className="text-center text-18 font-500 text-gray-500">
        <Translate>$end_of_page</Translate>
      </div>
    </div>
  );
}
