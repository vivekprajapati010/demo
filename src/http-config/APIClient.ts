import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface ApiClientParams
  extends Omit<AxiosRequestConfig, "url" | "method" | "data"> {
  url: string;
  data?: unknown; // Fixed TypeScript Error
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  noHeaders?: boolean;
}

export function apiClient<T>({
  url,
  data,
  method = "POST",
  headers = {},
  noHeaders,
  ...rest
}: ApiClientParams): Promise<T> {
  const config: AxiosRequestConfig = {
    method,
    url,
    data,
    headers: noHeaders ? {} : headers,
    ...rest,
  };

  return new Promise((resolve, reject) => {
    axios(config)
      .then((res: AxiosResponse<T>) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
