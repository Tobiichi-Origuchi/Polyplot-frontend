/**
 * Axios 请求封装
 * 支持 JWT token 认证
 */

import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";

// ==================== 类型定义 ====================

/**
 * API 统一响应格式
 */
export interface ApiResponse<T = any> {
  data: T;
  code: number;
}

/**
 * API 错误响应格式
 */
export interface ApiError {
  error: {
    code: string;
    message: string;
    details?: Array<{
      field: string;
      message: string;
    }>;
  };
}

/**
 * 扩展的请求配置
 */
export interface RequestConfig extends AxiosRequestConfig {
  skipAuth?: boolean; // 跳过 JWT token 认证（用于公开端点）
}

// ==================== 环境变量配置 ====================

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_TIMEOUT = 30000; // 30 秒超时

// 调试：打印 API 配置
if (typeof window !== "undefined") {
  console.log("🔧 API 配置信息:");
  console.log("  - API_BASE_URL:", API_BASE_URL);
  console.log("  - API_TIMEOUT:", API_TIMEOUT);
}

// ==================== Token 管理 ====================

/**
 * Token 存储键名
 */
const TOKEN_KEY = "jwt_token";

/**
 * 获取存储的 JWT token
 */
export const getToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(TOKEN_KEY);
};

/**
 * 保存 JWT token
 */
export const setToken = (token: string): void => {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(TOKEN_KEY, token);
};

/**
 * 清除 JWT token
 */
export const removeToken = (): void => {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(TOKEN_KEY);
};

// ==================== Axios 实例创建 ====================

/**
 * 创建 Axios 实例
 */
const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // ==================== 请求拦截器 ====================
  instance.interceptors.request.use(
    (config) => {
      const customConfig = config as RequestConfig;

      console.log("📤 发送请求:", {
        url: config.url,
        baseURL: config.baseURL,
        method: config.method,
        fullURL: `${config.baseURL}${config.url}`,
      });

      // JWT Token 认证（除非明确跳过）
      if (!customConfig.skipAuth) {
        const token = getToken();
        if (token) {
          console.log("  - 使用 JWT Token 认证");
          Object.assign(config.headers, {
            Authorization: `Bearer ${token}`,
          });
        }
      }

      return config;
    },
    (error) => {
      console.error("❌ 请求拦截器错误:", error);
      return Promise.reject(error);
    },
  );

  // ==================== 响应拦截器 ====================
  instance.interceptors.response.use(
    (response: AxiosResponse<ApiResponse>) => {
      console.log("✅ 响应成功:", {
        url: response.config.url,
        status: response.status,
        data: response.data,
      });
      // 成功响应：直接返回 data 字段
      return response.data as any;
    },
    (error: AxiosError<ApiError>) => {
      console.error("❌ 响应错误:", {
        url: error.config?.url,
        message: error.message,
        code: error.code,
        response: error.response,
      });

      // 错误处理
      if (error.response) {
        const { status, data } = error.response;

        // 401 Unauthorized - Token 过期或无效
        if (status === 401) {
          console.warn("Authentication failed. Token may be expired.");
          removeToken(); // 清除过期 token

          // 触发全局事件，通知应用重定向到登录页
          if (typeof window !== "undefined") {
            window.dispatchEvent(new Event("auth:token-expired"));
          }
        }

        if (status === 404) {
          console.warn("Resource not found.");

          if (typeof window !== "undefined") {
            window.location.href = "/not-found";
          }
        }

        // 返回格式化的错误信息
        return Promise.reject({
          status,
          code: data?.error?.code || "UNKNOWN_ERROR",
          message: data?.error?.message || "An unknown error occurred",
          details: data?.error?.details || [],
        });
      }

      // 网络错误或请求超时
      if (error.code === "ECONNABORTED") {
        return Promise.reject({
          status: 0,
          code: "TIMEOUT",
          message: "Request timeout. Please try again.",
        });
      }

      if (!error.response) {
        return Promise.reject({
          status: 0,
          code: "NETWORK_ERROR",
          message: "Network error. Please check your connection.",
        });
      }

      return Promise.reject(error);
    },
  );

  return instance;
};

// ==================== 导出的 Axios 实例 ====================

export const axiosInstance = createAxiosInstance();

// ==================== 通用请求方法 ====================

/**
 * GET 请求
 */
export const get = <T = any>(
  url: string,
  config?: RequestConfig,
): Promise<ApiResponse<T>> => {
  return axiosInstance.get<any, ApiResponse<T>>(url, config);
};

/**
 * POST 请求
 */
export const post = <T = any>(
  url: string,
  data?: any,
  config?: RequestConfig,
): Promise<ApiResponse<T>> => {
  return axiosInstance.post<any, ApiResponse<T>>(url, data, config);
};

/**
 * PUT 请求
 */
export const put = <T = any>(
  url: string,
  data?: any,
  config?: RequestConfig,
): Promise<ApiResponse<T>> => {
  return axiosInstance.put<any, ApiResponse<T>>(url, data, config);
};

/**
 * DELETE 请求
 */
export const del = <T = any>(
  url: string,
  config?: RequestConfig,
): Promise<ApiResponse<T>> => {
  return axiosInstance.delete<any, ApiResponse<T>>(url, config);
};

/**
 * PATCH 请求
 */
export const patch = <T = any>(
  url: string,
  data?: any,
  config?: RequestConfig,
): Promise<ApiResponse<T>> => {
  return axiosInstance.patch<any, ApiResponse<T>>(url, data, config);
};

// ==================== 默认导出 ====================

export default {
  get,
  post,
  put,
  delete: del,
  patch,
  axiosInstance,
  getToken,
  setToken,
  removeToken,
};
