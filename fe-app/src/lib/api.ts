"use client";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type ApiOptions<B = unknown> = Omit<RequestInit, "body" | "method"> & {
  body?: B;
  headers?: Record<string, string>;
  method?: HttpMethod;
};

function normalizePath(path: string) {
  return path.startsWith("/api") ? path : `/api/${path}`;
}

async function rawFetch<T>(path: string, options: RequestInit): Promise<T> {
  const response = await fetch(normalizePath(path), {
    credentials: "include",
    ...options,
  });

  let data: unknown = null;
  try {
    data = await response.json();
  } catch {}

  if (!response.ok) {
    const error = new Error(
      typeof data === "object" && data !== null && "message" in data
        ? String((data as any).message)
        : "API request failed",
    ) as Error & { status?: number };
    error.status = response.status;
    throw error;
  }

  return data as T;
}

export async function api<T, B = unknown>(
  path: string,
  options: ApiOptions<B> = {},
): Promise<T> {
  const { body, headers = {}, method, ...rest } = options;

  const httpMethod: HttpMethod = method ?? (body ? "POST" : "GET");
  const hasBody = !["GET", "HEAD"].includes(httpMethod);

  return rawFetch<T>(path, {
    method: httpMethod,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: hasBody && body ? JSON.stringify(body) : undefined,
    ...rest,
  });
}

export async function apiWithAutoRefresh<T, B = unknown>(
  path: string,
  options: ApiOptions<B> = {},
): Promise<T> {
  try {
    return await api<T, B>(path, options);
  } catch (err) {
    if (
      err instanceof Error &&
      (err as { status?: number }).status === 401 &&
      !path.includes("auth/refresh")
    ) {
      await rawFetch("/api/auth/refresh", { method: "POST" });

      return api<T, B>(path, options);
    }
    throw err;
  }
}
