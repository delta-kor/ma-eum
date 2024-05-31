import { Members } from '@/utils/video.util';

interface Props {
  defaultValue?: any;
  id: string;
  label: string;
  optional?: boolean;
  type: 'checkbox' | 'cover' | 'members' | 'text';
}

export default function CmsMetaInput({ defaultValue, id, label, optional, type }: Props) {
  if (type === 'text')
    return (
      <div className="flex flex-col gap-4">
        <div className="text-14 text-black">{label}</div>
        <input
          autoComplete="off"
          autoCorrect="off"
          defaultValue={defaultValue}
          name={id}
          placeholder="..."
          required={!optional}
          type="text"
          className="rounded-8 bg-white p-8 text-14"
        />
      </div>
    );

  if (type === 'checkbox')
    return (
      <div className="flex gap-8">
        <div className="text-14 text-black">{label}</div>
        <input
          defaultChecked={defaultValue}
          name={id}
          type="checkbox"
          className="rounded-8 bg-white p-8 text-14"
        />
      </div>
    );

  if (type === 'cover')
    return (
      <div className="flex flex-col gap-4">
        <div className="text-14 text-black">{label}</div>
        <select
          autoComplete="off"
          autoCorrect="off"
          defaultValue={defaultValue}
          name={id}
          className="rounded-8 bg-white p-8 text-14"
        >
          <option value="dance">Dance</option>
          <option value="vocal">Vocal</option>
        </select>
      </div>
    );

  if (type === 'members')
    return (
      <div className="flex flex-col gap-4">
        <div className="text-14 text-black">{label}</div>
        <div className="grid grid-cols-2">
          {Members.map(member => (
            <div key={member} className="flex gap-4">
              <input
                defaultChecked={defaultValue?.includes(member)}
                id={member}
                name={member}
                type="checkbox"
                className="rounded-8 bg-white p-8 text-14"
              />
              <label htmlFor={member} className="text-14 text-black">
                {member}
              </label>
            </div>
          ))}
        </div>
      </div>
    );

  return null;
}
