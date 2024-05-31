export interface PaginationOptions {
  cursor: null | string;
  limit: number;
}

export interface PaginationResult<T> {
  items: T[];
  nextCursor: null | string;
}
