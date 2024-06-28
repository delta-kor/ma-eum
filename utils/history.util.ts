import { pathToRegexp } from 'path-to-regexp';

export type History = [string, string, number];

export interface PageInfo {
  back: string;
  base?: boolean;
  invisible?: boolean;
  path: string;
  query?: boolean;
}

export const Pages: PageInfo[] = [
  {
    back: '/',
    base: true,
    path: '/',
  },
  {
    back: '/',
    base: true,
    path: '/discover',
  },
  {
    back: '/',
    base: true,
    path: '/mixer',
  },
  {
    back: '/',
    base: true,
    path: '/talk',
  },

  {
    back: '/',
    path: '/video/:id',
  },

  {
    back: '/',
    path: '/schedules',
  },

  {
    back: '/',
    path: '/videos',
  },
  {
    back: '/',
    path: '/musics',
  },
  {
    back: '/',
    path: '/photocards',
  },

  {
    back: '/videos',
    path: '/videos/cover',
  },
  {
    back: '/videos',
    path: '/videos/challenge',
  },
  {
    back: '/videos',
    path: '/videos/live',
  },
  {
    back: '/videos',
    path: '/videos/shorts',
  },
  {
    back: '/videos',
    path: '/videos/categories/:id',
  },
  {
    back: '/videos',
    path: '/videos/albums/:id/promotion',
  },
  {
    back: '/videos',
    path: '/videos/albums/:id/performance',
  },

  {
    back: '/musics',
    path: '/play/:id',
  },

  {
    back: '/mixer',
    path: '/mixer/:id',
  },

  {
    back: '/talk',
    path: '/talk/login',
  },
  {
    back: '/talk',
    invisible: true,
    path: '/talk/write',
  },
  {
    back: '/talk',
    path: '/talk/article/:id',
  },
];

export function getMatchingPage(path: string): PageInfo {
  for (const page of Pages) {
    const pathRegex = pathToRegexp(page.path);
    if (pathRegex.test(path)) return page;
  }

  console.log('No matching page found for path:', path);
  return {
    back: '/',
    path,
  };
}

export function joinPathSearch(path: string, search: string): string {
  return search ? `${path}?${search}` : path;
}
