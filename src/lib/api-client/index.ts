import { AppConfig } from "@/configs/app.config";
import { HttpMethod } from "../https/http-method";

interface FetchOptions<T = any> {
  method?: HttpMethod;
  body?: T;
  headers?: HeadersInit;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
}

class ApiClient {
  constructor(private baseUrl: string = "") {}

  async request<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    const url = this.normalizeUrl(endpoint);
    const {
      method = HttpMethod.GET,
      body,
      headers,
      cache = "no-cache",
      next,
    } = options || {};

    const res = await fetch(url, {
      method,
      cache,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      ...(body && { body: JSON.stringify(body) }),
      ...(next && { next }),
    });

    if (!res.ok) {
      const msg = await res.text();
      throw new Error(`Fetch error ${res.status}: ${msg}`);
    }

    return res.json();
  }

  private normalizeUrl(endpoint: string) {
    if (endpoint.startsWith("http")) return endpoint;
    const prefix =
      typeof window === "undefined" ? AppConfig.apiBaseUrl : this.baseUrl;
    return `${prefix}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
  }
}

export const api = new ApiClient(AppConfig.apiBaseUrl);
