import { api } from "@/lib/api-client";
import { HttpMethod } from "@/lib/https/http-method";

const END_POINT = "/auth";
export const AuthService = {
  async me() {
    return api.request<{ user: { id: number; email: string; name: string } }>(
      `${END_POINT}/me`,
      {
        method: HttpMethod.GET,
        cache: "no-store",
      }
    );
  },

  async login(email: string, password: string) {
    return api.request<{ user: { id: number; email: string; name: string } }>(
      `${END_POINT}/login`,
      {
        method: HttpMethod.POST,
        body: { email, password },
      }
    );
  },

  async logout() {
    return api.request<null>(`${END_POINT}/logout`, {
      method: HttpMethod.POST,
    });
  },
};
