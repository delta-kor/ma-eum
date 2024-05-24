import CmsCacheItem, { CacheInfo } from '@/components/cms/cache/CmsCacheItem';
import { ServerCacheMap } from '@/utils/cache';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default function CmsMainPage() {
  const cacheEntries = Array.from(ServerCacheMap.entries());
  const cacheInfos: CacheInfo[] = cacheEntries.map(([key, value]) => ({
    hits: value.getStats().hits,
    keys: value.getStats().keys,
    misses: value.getStats().misses,
    name: key,
    size: value.getStats().vsize,
  }));

  async function handleFormSubmit(form: FormData) {
    'use server';

    const name = form.get('name') as string;
    const cache = ServerCacheMap.get(name);
    if (cache) cache.flushAll();

    redirect('/cms');
  }

  return (
    <div>
      <form action={handleFormSubmit}>
        <CmsCacheItem infos={cacheInfos} />
      </form>
    </div>
  );
}
