import useSafeSearchParams from '@/hooks/safe-search-params';
import { usePathname, useRouter } from 'next/navigation';
import { UrlObject } from 'node:url';

function searchParamsToObject(searchParams: URLSearchParams): Record<string, string> {
  const object: Record<string, string> = {};
  for (const [key, value] of Array.from(searchParams.entries())) {
    object[key] = value;
  }
  return object;
}

export default function useQuery() {
  const { searchParams, update } = useSafeSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  function getQueryUpdatedUrl(query: Record<string, null | string>): UrlObject {
    const queryObject = { ...searchParamsToObject(searchParams), ...query };
    for (const key in queryObject) {
      if (queryObject[key] === null) {
        delete queryObject[key];
      }
    }

    return {
      pathname,
      query: queryObject,
    };
  }

  function getQueryUpdatedHref(query: Record<string, null | string>): string {
    const urlObject = getQueryUpdatedUrl(query);
    const urlQuery = urlObject.query as Record<string, string>;

    const pathname = urlObject.pathname as string;
    const queryString = new URLSearchParams(urlQuery).toString();
    return queryString ? `${pathname}?${queryString}` : pathname;
  }

  function set(query: Record<string, null | string>, scrollToTop: boolean = false) {
    router.replace(getQueryUpdatedHref(query), { scroll: scrollToTop });
  }

  function softSet(query: Record<string, null | string>, scrollToTop: boolean = false) {
    window.history.replaceState(null, '', getQueryUpdatedHref(query));
    update();
    scrollToTop && window.scrollTo(0, 0);
  }

  function get(key: string): null | string {
    return searchParams.get(key);
  }

  return { get, getQueryUpdatedHref, getQueryUpdatedUrl, set, softSet };
}
