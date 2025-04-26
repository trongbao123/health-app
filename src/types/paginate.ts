export type PaginationParams = {
  page?: number;
  limit?: number;
};

export type PaginatedResponse<T> = {
  success: boolean;
  payload: {
    data: T[];
    pagination: {
      page: number;
      limit: number;
      totalItems: number;
      totalPages: number;
      hasMore: boolean;
    };
  };
};
