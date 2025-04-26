import { api } from "@/lib/api-client";
import { HttpMethod } from "@/lib/https/http-method";

export type Period = "year" | "month" | "week" | "day";

export interface BodyProgressData {
  date: string;
  weight: number;
  fat: number;
}

type BodyProgressResponse = {
  success: boolean;
  payload: {
    bodyProgress: BodyProgressData[];
    achievementRate: number;
  };
};

const ENDPOINT = "/body-progress";

export const BodyProgressService = {
  async fetchProgressHistory(
    period: Period = "year"
  ): Promise<BodyProgressResponse> {
    const query = period ? `?period=${period}` : "";
    const response = await api.request<BodyProgressResponse>(
      `${ENDPOINT}${query}`,
      {
        method: HttpMethod.GET,
        cache: "no-store",
      }
    );
    return response;
  },

  async addProgressRecord(entry: BodyProgressData): Promise<BodyProgressData> {
    const response = await api.request<BodyProgressData>(`${ENDPOINT}`, {
      method: HttpMethod.POST,
      body: entry,
    });
    return response;
  },
};
