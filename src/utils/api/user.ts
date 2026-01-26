/**
 * 用户相关 API 服务
 * 基于后端 API 文档: /api/v1/users
 */

import { get, post, put, setToken, RequestConfig } from "@/utils/request";

// ==================== 类型定义 ====================

/**
 * 用户角色
 */
export type UserRole = "user" | "kol" | "admin";

/**
 * 用户信息响应
 */
export interface UserResponse {
  id: number;
  wallet_address: string;
  smart_account_address: string | null;
  role: UserRole;
  username: string | null;
  display_name: string | null;
  avatar_url: string | null;
  bio?: string | null;
}

/**
 * 登录响应
 */
export interface LoginResponse {
  user: UserResponse;
  token: string;
}

/**
 * 更新用户资料请求
 */
export interface UpdateProfileRequest {
  username?: string; // 3-50 字符，仅字母数字下划线，唯一
  display_name?: string; // 最大 100 字符
  avatar_url?: string; // URL 字符串
  bio?: string; // 最大 500 字符
}

// ==================== API 方法 ====================

/**
 * 1. 注册或登录 (SIWE 签名认证)
 *
 * @param message - SIWE 消息字符串 (EIP-4361 标准)
 * @param signature - 签名 (hex 格式，可带或不带 0x 前缀)
 * @returns 用户信息和 JWT token
 *
 * @example
 * ```typescript
 * const { data } = await userApi.loginWithSiwe(messageString, signature);
 * console.log('User:', data.user);
 * console.log('Token:', data.token);
 * // Token 会自动保存到 localStorage
 * ```
 */
export const loginWithSiwe = async (
  message: string,
  signature: string,
): Promise<LoginResponse> => {
  const config: RequestConfig = {
    siweAuth: { message, signature },
  };

  const response = await post<LoginResponse>(
    "/api/v1/users",
    undefined,
    config,
  );

  // 自动保存 token
  if (response.data.token) {
    setToken(response.data.token);
  }

  return response.data;
};

/**
 * 2. 获取当前用户信息 (JWT 认证)
 *
 * @returns 当前用户信息
 *
 * @example
 * ```typescript
 * const { data } = await userApi.getCurrentUser();
 * console.log('Current user:', data);
 * ```
 */
export const getCurrentUser = async (): Promise<UserResponse> => {
  const response = await get<UserResponse>("/api/v1/users/me");
  return response.data;
};

/**
 * 3. 获取用户信息 (公开，无需认证)
 *
 * @param userId - 用户 ID
 * @returns 用户信息
 *
 * @example
 * ```typescript
 * const { data } = await userApi.getUserById(123);
 * console.log('User profile:', data);
 * ```
 */
export const getUserById = async (userId: number): Promise<UserResponse> => {
  const response = await get<UserResponse>(`/api/v1/users/${userId}`, {
    skipAuth: true, // 公开端点，跳过认证
  });
  return response.data;
};

/**
 * 4. 更新用户资料 (JWT 认证)
 *
 * @param data - 更新的字段（所有字段都是可选的）
 * @returns 更新后的用户信息
 *
 * @example
 * ```typescript
 * const { data } = await userApi.updateProfile({
 *   username: 'satoshi_nakamoto',
 *   display_name: 'Satoshi Nakamoto',
 *   avatar_url: 'https://example.com/avatar.jpg',
 *   bio: 'Crypto enthusiast'
 * });
 * console.log('Updated user:', data);
 * ```
 */
export const updateProfile = async (
  data: UpdateProfileRequest,
): Promise<UserResponse> => {
  const response = await put<UserResponse>("/api/v1/users/me", data);
  return response.data;
};

// ==================== 默认导出 ====================

export default {
  loginWithSiwe,
  getCurrentUser,
  getUserById,
  updateProfile,
};
