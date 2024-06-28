import { CmsModelField } from '@/components/cms/model/CmsModelPanel';
import { trpc } from '@/hooks/trpc';
import { formatTimeAsDateJs, formatTimeAsDateTimeJs } from '@/utils/time.util';

export function getCmsFieldText(field: CmsModelField, item: any): null | string {
  if (field.type === 'boolean') return item[field.key] ? 'on' : 'off';

  const value = field.type === 'model' ? item[`${field.key}Id`] : item[field.key];
  if (typeof value === 'undefined') return null;

  return field.type === 'string' || field.type === 'number'
    ? value
    : field.type === 'strings'
      ? value.join(',')
      : field.type === 'date'
        ? formatTimeAsDateJs(value)
        : field.type === 'datetime'
          ? formatTimeAsDateTimeJs(value)
          : field.type === 'model'
            ? value
            : '';
}

export function getCmsTrpcRecordByName(name: string) {
  if (name === 'album') return trpc.album;
  if (name === 'category') return trpc.category;
  if (name === 'music') return trpc.music;
  if (name === 'schedule') return trpc.schedule;
  if (name === 'feed') return trpc.feed;
  throw new Error('Unknown model name');
}

export function cmsFormToObject(
  form: FormData,
  fields: CmsModelField[],
  includeId: boolean = false,
  create: boolean = false
): any {
  let result: Record<string, any> = {};

  for (const field of fields) {
    const value = form.get(field.key);
    if (value === null && field.type !== 'boolean') continue;

    if (field.type === 'string') result[field.key] = value;
    else if (field.type === 'number') result[field.key] = Number(value);
    else if (field.type === 'date') result[field.key] = new Date(value as string);
    else if (field.type === 'datetime') result[field.key] = new Date(value as string);
    else if (field.type === 'strings')
      result[field.key] = value ? (value as string).split(',') : [];
    else if (field.type === 'model')
      result[field.key] = value ? { connect: { id: value } } : create ? {} : { disconnect: true };
    else if (field.type === 'boolean') result[field.key] = value === 'on';
  }

  if (includeId) {
    const id = form.get('id');
    if (id !== null) result.id = id;
  }

  return result;
}
