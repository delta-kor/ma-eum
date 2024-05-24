'use client';

import CmsButton from '@/components/cms/CmsButton';
import { Fragment, useRef } from 'react';

export interface CacheInfo {
  hits: number;
  keys: number;
  misses: number;
  name: string;
  size: number;
}

interface Props {
  infos: CacheInfo[];
}

export default function CmsCacheItem({ infos }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFlush(name: string) {
    inputRef.current!.value = name;
    inputRef.current!.form!.requestSubmit();
  }

  async function handleRefresh() {
    location.reload();
  }

  return (
    <div className="flex flex-col gap-16">
      <CmsButton onClick={handleRefresh} className="self-start">
        Refresh
      </CmsButton>
      <input ref={inputRef} name="name" type="hidden" />
      <div className="grid grid-cols-[1fr_fit-content(100%)_fit-content(100%)_fit-content(100%)_fit-content(100%)_fit-content(100%)] gap-16">
        <div className="code text-18 font-700 text-primary-500">Key</div>
        <div className="code min-w-[70px] text-18 font-700 text-primary-500">Count</div>
        <div className="code min-w-[70px] text-18 font-700 text-primary-500">Hits</div>
        <div className="code min-w-[70px] text-18 font-700 text-primary-500">Misses</div>
        <div className="code min-w-[70px] text-18 font-700 text-primary-500">Size</div>
        <div />

        {infos.map(({ hits, keys, misses, name, size }) => (
          <Fragment key={name}>
            <div className="code text-18 font-700">{name}</div>
            <div className="code text-18 font-400">{keys}</div>
            <div className="code text-18 font-400">{hits}</div>
            <div className="code text-18 font-400">{misses}</div>
            <div className="code text-18 font-400">{(size / 1024).toFixed(2)}kb</div>
            <div
              onClick={() => handleFlush(name)}
              className="code cursor-pointer text-18 text-gray-500 underline"
            >
              Flush
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
