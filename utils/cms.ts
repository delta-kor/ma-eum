import { CmsModelField } from '@/components/cms/model/CmsModelPanel';
import { trpc } from '@/hooks/trpc';
import { format } from 'date-fns';

export function getCmsFieldText(field: CmsModelField, item: any): string {
  const value = item[field.key];

  return field.type === 'string' || field.type === 'number'
    ? value
    : field.type === 'strings'
      ? value.join(',')
      : format(value, 'yyyy-MM-dd');
}

export function getCmsTrpcRecordByName(name: string) {
  if (name === 'album') return trpc.album;
  if (name === 'category') return trpc.category;
  throw new Error('Unknown model name');
}

export function cmsFormToObject(
  form: FormData,
  fields: CmsModelField[],
  includeId: boolean = false
): any {
  let result: Record<string, any> = {};

  for (const field of fields) {
    const value = form.get(field.key);
    if (value === null) continue;

    if (field.type === 'string') result[field.key] = value;
    else if (field.type === 'number') result[field.key] = Number(value);
    else if (field.type === 'date') result[field.key] = new Date(value as string);
    else if (field.type === 'strings') result[field.key] = (value as string).split(',');
  }

  if (includeId) {
    const id = form.get('id');
    if (id !== null) result.id = id;
  }

  return result;
}
