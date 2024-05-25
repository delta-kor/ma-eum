import { CmsModelField, ItemBase } from '@/components/cms/model/CmsModelPanel';
import { getCmsFieldText } from '@/utils/cms';

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
    <div className="scrollbar-hide flex grow flex-col overflow-y-scroll">
      {items.map(item => (
        <div
          key={item.id}
          onClick={() => handleItemClick(item)}
          className="flex cursor-pointer items-center gap-16 rounded-8 px-24 py-12 text-18 hover:bg-gray-100"
        >
          <div className="code text-16 text-gray-500">{item.id}</div>
          {fields.map(field =>
            field.type === 'model' ? (
              <div
                key={field.key}
                className={`shrink-0 rounded-4 bg-gray-500 px-8 py-4 text-14 text-white ${field.style}`}
              >
                {getCmsFieldText(field, item) || 'unset'}
              </div>
            ) : (
              <div key={field.key} className={`shrink-0 ${field.style}`}>
                {getCmsFieldText(field, item)}
              </div>
            )
          )}
        </div>
      ))}
    </div>
  );
}
