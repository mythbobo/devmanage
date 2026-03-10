export interface IApiResponse<T = unknown> {
  code: number;
  message: string;
  data: T;
}

export interface IRequestConfig {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: unknown;
  header?: Record<string, string>;
}

export interface IRequestResponse<T = unknown> {
  statusCode: number;
  data: T;
  header: Record<string, string>;
}
