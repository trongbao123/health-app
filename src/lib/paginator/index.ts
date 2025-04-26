export type PaginationMeta = {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasMore: boolean;
};

export class Paginator<T> {
  private items: T[];
  private page: number;
  private limit: number;

  constructor(items: T[], page = 1, limit = 8) {
    this.items = items;
    this.page = page;
    this.limit = limit;
  }

  public paginate(): { data: T[]; meta: PaginationMeta } {
    const totalItems = this.items.length;
    const totalPages = Math.ceil(totalItems / this.limit);
    const start = (this.page - 1) * this.limit;
    const end = start + this.limit;
    const pagedItems = this.items.slice(start, end);

    return {
      data: pagedItems,
      meta: {
        page: this.page,
        limit: this.limit,
        totalItems,
        totalPages,
        hasMore: this.page < totalPages,
      },
    };
  }
}
