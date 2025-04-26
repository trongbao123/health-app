import { PaginatedResponse, PaginationParams } from "@/types/paginate";
import { DEFAULT_PAGINATION } from "@/constants/pagination";
import { api } from "@/lib/api-client";
import { HttpMethod } from "@/lib/https/http-method";

type Diary = {
  id: number;
  date: string;
  time: string;
  content: string;
};

const ENDPOINT = "/diaries";
export class DiaryService {
  static async fetchList(
    params: PaginationParams & { date?: string } = {}
  ): Promise<PaginatedResponse<Diary>> {
    const query = new URLSearchParams(
      Object.entries(params)
        .filter(([, value]) => value !== undefined && value !== null)
        .map(([key, value]) => [key, String(value)])
    ).toString();

    try {
      return await api.request<PaginatedResponse<Diary>>(
        `${ENDPOINT}?${query}`,
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

  static async create(data: Omit<Diary, "id">): Promise<Diary | null> {
    try {
      return await api.request<Diary>(`${ENDPOINT}`, {
        method: HttpMethod.POST,
        body: data,
      });
    } catch (error) {
      return null;
    }
  }
}
