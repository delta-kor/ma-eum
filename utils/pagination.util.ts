export interface PaginationOptions {
  cursor: null | string;
  limit: number;
}

export interface PaginationResult<T> {
  items: T[];
  nextCursor: null | string;
}

export interface IndexPaginationOptions {
  cursor: null | number;
  limit: number;
}

export interface IndexPaginationResult<T> {
  items: T[];
  pages: number;
}

export function paginate<T extends { id: string }>(
  items: T[],
  pagination: PaginationOptions
): PaginationResult<T> {
  const cursorIndex = pagination.cursor
    ? items.findIndex(item => item.id === pagination.cursor)
    : 0;
  const to = cursorIndex + pagination.limit;

  const paginatedItems = items.slice(cursorIndex, to);
  const nextCursor = items[to]?.id || null;

  return {
    items: paginatedItems,
    nextCursor,
  };
}
