import { revalidate } from '@/actions/revalidate';
import CmsButton from '@/components/cms/CmsButton';
import CmsTextInput from '@/components/cms/CmsTextInput';
import { CmsModelField, ItemBase } from '@/components/cms/model/CmsModelPanel';
import { trpc } from '@/hooks/trpc';
import getFieldText from '@/utils/field';

interface Props<T extends ItemBase> {
  fields: CmsModelField[];
  name: string;
  path: string;
  selected: T | null;
}

export default function CmsModelInfo<T extends ItemBase>({
  fields,
  name,
  path,
  selected,
}: Props<T>) {
  let record;
  if (name === 'album') record = trpc.album;
  else throw new Error('Unknown model name');

  const deleteMutation = record.delete.useMutation();

  async function handleDelete() {
    if (!selected) return;

    await deleteMutation.mutateAsync({ id: selected.id });
    await revalidate(path);
  }

  async function handleSubmit(formData: FormData) {
    // await updateGroup(formData);
    await revalidate(path);
  }

  if (selected === null) {
    return (
      <div
        style={{ height: 'calc(100vh - 242px)' }}
        className="flex w-[360px] flex-col items-center justify-center border-l-1 border-gray-100 px-4"
      >
        <div className="text-20 text-gray-500">Select item</div>
      </div>
    );
  }

  return (
    <form
      key={selected.id}
      action={handleSubmit}
      style={{ height: 'calc(100vh - 242px)' }}
      className="flex w-[360px] flex-col gap-16 border-l-1 border-gray-100 px-16"
    >
      <input name="id" type="hidden" value={selected.id} />
      <div className="code text-20 font-700 text-black">{selected.id}</div>
      {fields.map(field => (
        <div key={field.key} className="flex flex-col gap-4">
          <div className="text-16 font-600">{field.label}</div>
          <CmsTextInput defaultValue={getFieldText(field, selected)} name={field.key} />
        </div>
      ))}

      <div className="flex gap-8">
        <CmsButton type="submit" className="!bg-primary-500 !text-white">
          Save
        </CmsButton>
        <CmsButton type="button" onClick={handleDelete} className="!bg-white !text-gray-500">
          Delete
        </CmsButton>
      </div>
    </form>
  );
}
