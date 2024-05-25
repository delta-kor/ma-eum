import { CmsModelField } from '@/components/cms/model/CmsModelPanel';
import { getCmsFieldText } from '@/utils/cms';

interface Props {
  field: CmsModelField;
  item?: any;
  placeholder?: string;
  required?: boolean;
}

export default function CmsInput({ field, item, placeholder, required }: Props) {
  const defaultValue = item ? getCmsFieldText(field, item) ?? '' : undefined;

  if (['number', 'string', 'strings'].includes(field.type))
    return (
      <div className="flex flex-col gap-4">
        <div className="text-16 font-600">{field.label}</div>
        <input
          autoComplete="off"
          autoCorrect="off"
          defaultValue={defaultValue}
          name={field.key}
          placeholder={placeholder}
          required={required}
          spellCheck="false"
          type="text"
          className="rounded-8 bg-gray-100 px-16 py-12 text-16 outline-primary-500"
        />
      </div>
    );

  if (field.type === 'date')
    return (
      <div className="flex flex-col gap-4">
        <div className="text-16 font-600">{field.label}</div>
        <input
          autoComplete="off"
          autoCorrect="off"
          defaultValue={defaultValue}
          name={field.key}
          placeholder={placeholder}
          required={required}
          spellCheck="false"
          type="date"
          className="rounded-8 bg-gray-100 px-16 py-12 text-16 outline-primary-500"
        />
      </div>
    );

  if (field.type === 'model')
    return (
      <div className="flex flex-col gap-4">
        <div className="text-16 font-600">{field.label}</div>
        <input
          autoComplete="off"
          autoCorrect="off"
          defaultValue={defaultValue}
          name={field.key}
          placeholder={placeholder}
          required={required}
          spellCheck="false"
          type="text"
          className="rounded-8 bg-gray-100 px-16 py-12 text-16 outline-primary-500"
        />
      </div>
    );

  return null;
}
