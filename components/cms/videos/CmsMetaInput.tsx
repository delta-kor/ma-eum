interface Props {
  defaultValue?: any;
  id: string;
  label: string;
  type: 'text';
}

export default function CmsMetaInput({ defaultValue, id, label, type }: Props) {
  if (type === 'text')
    return (
      <div className="flex flex-col gap-4">
        <div className="text-14 text-black">{label}</div>
        <input
          defaultValue={defaultValue}
          name={id}
          placeholder="..."
          type="text"
          className="rounded-8 bg-white p-8 text-14"
        />
      </div>
    );

  return null;
}
