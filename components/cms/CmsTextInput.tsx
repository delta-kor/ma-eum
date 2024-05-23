'use client';

interface Props {
  defaultValue?: string;
  name: string;
  placeholder?: string;
  required?: boolean;
}

export default function CmsTextInput({ defaultValue, name, placeholder, required }: Props) {
  return (
    <input
      autoComplete="off"
      autoCorrect="off"
      defaultValue={defaultValue}
      name={name}
      placeholder={placeholder}
      required={required}
      spellCheck="false"
      type="text"
      className="rounded-8 bg-gray-100 px-16 py-12 text-16 outline-primary-500"
    />
  );
}
