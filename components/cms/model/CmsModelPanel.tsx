'use client';

import CmsModelInfo from '@/components/cms/model/CmsModelInfo';
import CmsModelList from '@/components/cms/model/CmsModelList';
import { useEffect, useState } from 'react';

export type CmsModelFieldType = 'date' | 'number' | 'string' | 'strings';

export interface ItemBase {
  id: string;
}

export interface CmsModelField {
  key: string;
  label: string;
  style?: string;
  type: CmsModelFieldType;
}

export interface CmsModelPanelOptions<T extends ItemBase> {
  fields: CmsModelField[];
  items: T[];
  name: string;
  path: string;
}

interface Props<T extends ItemBase> {
  options: CmsModelPanelOptions<T>;
}

export default function CmsModelPanel<T extends ItemBase>({ options }: Props<T>) {
  const [selected, setSelected] = useState<T | null>(null);

  const items = options.items;

  useEffect(() => {
    if (selected && !items.find(item => item.id === selected.id)) setSelected(null);
    else if (selected && !items.includes(selected))
      setSelected(items.find(item => item.id === selected.id)!);
  }, [selected, items]);

  return (
    <div className="flex gap-16">
      <CmsModelList fields={options.fields} items={items} onItemSelect={setSelected} />
      <CmsModelInfo
        fields={options.fields}
        name={options.name}
        path={options.path}
        selected={selected}
      />
    </div>
  );
}
