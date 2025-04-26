export interface QueryOptions {
  page: number;
  limit: number;
  sort?: string;
  filters?: Record<string, string>;
}

export function parseQueryParams(
  url: string,
  allowedFilters: string[] = []
): QueryOptions {
  const { searchParams } = new URL(url);

  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "8", 10);
  const sort = searchParams.get("sort") ?? undefined;

  const filters: Record<string, string> = {};

  allowedFilters.forEach((key) => {
    const value = searchParams.get(key);
    if (value !== null) {
      filters[key] = value;
    }
  });

  return { page, limit, sort, filters };
}
