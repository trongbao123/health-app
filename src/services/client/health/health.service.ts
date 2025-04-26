import { api } from "@/lib/api-client";
import { HttpMethod } from "@/lib/https/http-method";
import { DEFAULT_PAGINATION } from "@/constants/pagination";
import { PaginatedResponse, PaginationParams } from "@/types/paginate";

export type Health = {
  id: number;
  title: string;
  description: string;
  image: string;
  date: string;
  category: string;
  tags: string[];
};

type HealthResponse = PaginatedResponse<Health>;

const ENDPOINT = "/health";

export class HealthService {
  static async fetchList(
    params: PaginationParams & { category?: string; tag?: string } = {}
  ): Promise<HealthResponse> {
    const query = new URLSearchParams(
      Object.entries(params)
        .filter(([, value]) => value !== undefined && value !== null)
        .map(([key, value]) => [key, String(value)])
    );

    try {
      return await api.request<HealthResponse>(
        `${ENDPOINT}?${query.toString()}`,
        {
          method: HttpMethod.GET,
          cache: "no-store",
        }
      );
    } catch (error) {
      return {
        success: false,
        payload: {
          data: [],
          pagination: DEFAULT_PAGINATION,
        },
      };
    }
  }

  static async create(
    data: Omit<Health, "id" | "date">
  ): Promise<Health | null> {
    try {
      return await api.request<Health>(ENDPOINT, {
        method: HttpMethod.POST,
        body: data,
      });
    } catch (error) {
      return null;
    }
  }
}
