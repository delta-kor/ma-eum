import { usePathname, useSearchParams } from 'next/navigation';

function searchParamsToObject(searchParams: URLSearchParams): Record<string, string> {
  const object: Record<string, string> = {};
  for (const [key, value] of Array.from(searchParams.entries())) {
    object[key] = value;
  }
  return object;
}

export default function useQuery() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  function getQueryUpdatedUrl(query: Record<string, string>) {
    return {
      pathname,
      query: { ...searchParamsToObject(searchParams), ...query },
    };
  }

  return { getQueryUpdatedUrl };
}
