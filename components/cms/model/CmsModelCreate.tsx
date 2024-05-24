import { revalidate } from '@/actions/revalidate';
import CmsButton from '@/components/cms/CmsButton';
import CmsInput from '@/components/cms/CmsInput';
import { CmsModelField, ItemBase } from '@/components/cms/model/CmsModelPanel';
import { cmsFormToObject, getCmsTrpcRecordByName } from '@/utils/cms';

interface Props<T extends ItemBase> {
  fields: CmsModelField[];
  name: string;
  path: string;
  onCreate: () => void;
}

export default function CmsModelCreate<T extends ItemBase>({
  fields,
  name,
  path,
  onCreate,
}: Props<T>) {
  const record = getCmsTrpcRecordByName(name);
  const createMutation = record.create.useMutation();

  async function handleCreate(formData: FormData) {
    const data = cmsFormToObject(formData, fields);

    await createMutation.mutateAsync(data);
    await revalidate(path);
    onCreate();
  }

  return (
    <form action={handleCreate} className="flex flex-col gap-16">
      <div className="code text-20 font-700 text-black">CREATE</div>
      {fields.map(field => (
        <CmsInput key={field.key} field={field} placeholder="..." />
      ))}

      <div className="flex gap-8">
        <CmsButton type="submit" className="!bg-primary-500 !text-white">
          Create
        </CmsButton>
      </div>
    </form>
  );
}
