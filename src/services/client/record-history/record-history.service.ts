import { PaginatedResponse, PaginationParams } from "@/types/paginate";
import { DEFAULT_PAGINATION } from "@/constants/pagination";
import { api } from "@/lib/api-client";
import { HttpMethod } from "@/lib/https/http-method";

export interface Exercise {
  id: number;
  name: string;
  calories: number;
  duration: number;
}

interface CreateExerciseInput {
  name: string;
  calories: number;
  duration: number;
}

const API_ENDPOINT = `/record-history`;

export const RecordHistoryService = {
  async fetchList(
    params: PaginationParams & {
      minCalories?: number;
      maxCalories?: number;
    } = {}
  ): Promise<PaginatedResponse<Exercise>> {
    const query = new URLSearchParams(
      Object.entries(params)
        .filter(([, value]) => value !== undefined && value !== null)
        .map(([key, value]) => [key, String(value)])
    ).toString();

    try {
      return await api.request<PaginatedResponse<Exercise>>(
        `${API_ENDPOINT}?${query}`,
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
  },

  async create(data: CreateExerciseInput): Promise<Exercise | null> {
    try {
      return await api.request<Exercise>(API_ENDPOINT, {
        method: HttpMethod.POST,
        body: data,
      });
    } catch (error) {
      return null;
    }
  },
};
