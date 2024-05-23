import { CmsModelField } from '@/components/cms/model/CmsModelPanel';

export default function getFieldText(field: CmsModelField, item: any): string {
  const value = item[field.key];

  return field.type === 'string' || field.type === 'number'
    ? value
    : field.type === 'strings'
      ? value.join(',')
      : value.toLocaleDateString('ko');
}
