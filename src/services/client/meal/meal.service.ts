import { PaginatedResponse, PaginationParams } from "@/types/paginate";
import { api } from "@/lib/api-client";
import { HttpMethod } from "@/lib/https/http-method";

export type Meal = {
  id: number;
  date: string;
  type: string;
  image: string;
};

const ENDPOINT = "/meals";

export class MealService {
  static async fetchList(
    params: PaginationParams & { type?: string; date?: string } = {}
  ): Promise<PaginatedResponse<Meal>> {
    const query = new URLSearchParams(
      Object.entries(params)
        .filter(([, value]) => value !== undefined && value !== null)
        .map(([key, value]) => [key, String(value)])
    );

    return api.request<PaginatedResponse<Meal>>(
      `${ENDPOINT}?${query.toString()}`,
      {
        method: HttpMethod.GET,
        cache: "no-store",
      }
    );
  }

  static async fetchById(id: number): Promise<Meal> {
    return api.request<Meal>(`${ENDPOINT}/${id}`, {
      method: HttpMethod.GET,
      cache: "no-store",
    });
  }

  static async create(data: Omit<Meal, "id">): Promise<Meal> {
    return api.request<Meal>(ENDPOINT, {
      method: HttpMethod.POST,
      body: data,
    });
  }

  static async update(
    id: number,
    data: Partial<Omit<Meal, "id">>
  ): Promise<Meal> {
    return api.request<Meal>(`${ENDPOINT}/${id}`, {
      method: HttpMethod.PUT,
      body: data,
    });
  }

  static async delete(id: number): Promise<boolean> {
    await api.request(`${ENDPOINT}/${id}`, {
      method: HttpMethod.DELETE,
    });
    return true;
  }
}
