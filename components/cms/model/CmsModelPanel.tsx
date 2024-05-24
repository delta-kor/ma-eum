'use client';

import { revalidate } from '@/actions/revalidate';
import CmsButton from '@/components/cms/CmsButton';
import CmsModelCreate from '@/components/cms/model/CmsModelCreate';
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
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const [viewMode, setViewMode] = useState<'create' | 'info'>('info');

  const items = options.items;

  useEffect(() => {
    if (selectedItem && !items.find(item => item.id === selectedItem.id)) setSelectedItem(null);
    else if (selectedItem && !items.includes(selectedItem))
      setSelectedItem(items.find(item => item.id === selectedItem.id)!);
  }, [selectedItem, items]);

  function handleItemSelect(item: T) {
    setSelectedItem(item);
    setViewMode('info');
  }

  function handleSwitchMode() {
    setViewMode(prev => (prev === 'info' ? 'create' : 'info'));
  }

  async function handleRefresh() {
    await revalidate(options.path);
  }

  async function handleCreate() {
    setViewMode('info');
  }

  return (
    <div className="flex flex-col gap-16">
      <div className="flex items-center justify-between">
        <div className="text-20">
          Total <span className="font-700 text-primary-500">{items.length}</span> item(s)
        </div>
      </div>
      <div style={{ minHeight: 'calc(100vh - 200px)' }} className="flex gap-12">
        <CmsModelList fields={options.fields} items={items} onItemSelect={handleItemSelect} />
        <div className="w-[1px] self-stretch bg-gray-100" />
        <div className="flex w-[280px] shrink-0 flex-col gap-16">
          <div className="flex items-center gap-8">
            <CmsButton onClick={handleSwitchMode}>Switch</CmsButton>
            <CmsButton onClick={handleRefresh}>Refresh</CmsButton>
          </div>
          {viewMode === 'info' && (
            <CmsModelInfo
              fields={options.fields}
              name={options.name}
              path={options.path}
              selectedItem={selectedItem}
            />
          )}
          {viewMode === 'create' && (
            <CmsModelCreate
              fields={options.fields}
              name={options.name}
              path={options.path}
              onCreate={handleCreate}
            />
          )}
        </div>
      </div>
    </div>
  );
}
