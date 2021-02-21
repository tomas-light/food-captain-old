import { ApiResponse } from './ApiResponse';

declare module 'axios' {
  interface AxiosInstance {
    get<TData = any>(url: string): Promise<ApiResponse<TData>>;

    post<TData = any>(url: string, data?: any): Promise<ApiResponse<TData>>;

    put<TData = any>(url: string, data?: any): Promise<ApiResponse<TData>>;

    patch<TData = any>(url: string, data?: any): Promise<ApiResponse<TData>>;

    delete<TData = any>(url: string): Promise<ApiResponse<TData>>;
  }
}
