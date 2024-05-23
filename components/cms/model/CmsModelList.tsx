import { CmsModelField, ItemBase } from '@/components/cms/model/CmsModelPanel';
import getFieldText from '@/utils/field';

interface Props<T extends ItemBase> {
  fields: CmsModelField[];
  items: T[];
  onItemSelect: (item: T) => void;
}

export default function CmsModelList<T extends ItemBase>({
  fields,
  items,
  onItemSelect,
}: Props<T>) {
  function handleItemClick(item: T) {
    onItemSelect(item);
  }

  return (
    <div className="scrollbar-hide flex max-h-[747px] grow flex-col overflow-y-scroll">
      {items.map(item => (
        <div
          key={item.id}
          onClick={() => handleItemClick(item)}
          className="flex cursor-pointer items-center gap-16 rounded-8 px-24 py-12 text-18 hover:bg-gray-100"
        >
          <div className="code text-16 text-gray-500">{item.id}</div>
          {fields.map(field => (
            <div key={field.key} className={`shrink-0 ${field.style}`}>
              {getFieldText(field, item)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
