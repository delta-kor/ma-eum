import { revalidate } from '@/actions/revalidate';
import CmsButton from '@/components/cms/CmsButton';
import CmsInput from '@/components/cms/CmsInput';
import { CmsModelField, ItemBase } from '@/components/cms/model/CmsModelPanel';
import { cmsFormToObject, getCmsTrpcRecordByName } from '@/utils/cms';

interface Props<T extends ItemBase> {
  fields: CmsModelField[];
  name: string;
  path: string;
  selectedItem: T | null;
}

export default function CmsModelInfo<T extends ItemBase>({
  fields,
  name,
  path,
  selectedItem,
}: Props<T>) {
  const record = getCmsTrpcRecordByName(name);
  const deleteMutation = record.delete.useMutation();
  const updateMutation = record.update.useMutation();

  async function handleDelete() {
    if (!selectedItem) return;

    await deleteMutation.mutateAsync({ id: selectedItem.id });
    await revalidate(path);
  }

  async function handleSubmit(formData: FormData) {
    const data = cmsFormToObject(formData, fields, true);

    await updateMutation.mutateAsync(data);
    await revalidate(path);
  }

  if (selectedItem === null) {
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="text-20 text-gray-500">Select item</div>
      </div>
    );
  }

  return (
    <form key={selectedItem.id} action={handleSubmit} className="flex flex-col gap-16">
      <input name="id" type="hidden" value={selectedItem.id} />
      <div className="code text-20 font-700 text-black">INFO: {selectedItem.id}</div>
      {fields.map(field => (
        <CmsInput key={field.key} field={field} item={selectedItem} />
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
