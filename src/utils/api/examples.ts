/**
 * API 使用示例
 * 展示如何在前端组件中调用用户 API
 */

import { SiweMessage } from "siwe";
// import userApi from "./user"; // 已注释，用于测试 UI 交互流程
import { getToken, removeToken } from "@/utils/request";

// ==================== 示例 1: 用户首次登录 (SIWE 签名) ====================

/**
 * 使用 SIWE 签名进行登录或注册
 *
 * 完整流程：
 * 1. 生成 SIWE 消息
 * 2. 用户使用钱包签名
 * 3. 调用登录 API
 * 4. 保存 token 和用户信息
 */
export async function handleSiweLogin(walletAddress: string) {
  try {
    // Step 1: 生成 SIWE 消息
    const message = new SiweMessage({
      domain: window.location.host,
      address: walletAddress,
      statement: "Sign in with Ethereum",
      uri: window.location.origin,
      version: "1",
      chainId: 137, // Polygon Mainnet
      nonce: Math.floor(Math.random() * 100000000).toString(),
    });

    const messageString = message.prepareMessage();

    // Step 2: 请求用户签名 (使用 MetaMask 或其他钱包)
    // ========== 已注释，用于测试 UI 交互流程 ==========
    // const signature = await (window as any).ethereum.request({
    //   method: "personal_sign",
    //   params: [messageString, walletAddress],
    // });
    console.log("模拟签名（签名已禁用）", messageString);

    // Step 3: 调用登录 API
    // ========== API 调用已注释，用于测试 UI 交互流程 ==========
    // const loginData = await userApi.loginWithSiwe(messageString, signature);
    // console.log("Login successful!");
    // console.log("User ID:", loginData.user.id);
    // console.log("Wallet:", loginData.user.wallet_address);
    // console.log("Smart Account:", loginData.user.smart_account_address);
    // console.log("Token saved to localStorage");
    // return loginData.user;

    // 模拟返回，用于测试
    console.log("模拟登录成功（API 调用已禁用）");
    return {
      id: 1,
      wallet_address: walletAddress,
      smart_account_address: null,
      role: 'user' as const,
      username: null,
      display_name: null,
      avatar_url: null,
      bio: null
    };
    // ========================================================
  } catch (error: any) {
    console.error("SIWE login failed:", error);

    // 处理不同的错误
    if (error.status === 401) {
      throw new Error("Signature verification failed. Please try again.");
    } else if (error.code === "NETWORK_ERROR") {
      throw new Error("Network error. Please check your connection.");
    } else {
      throw new Error("Login failed. Please try again.");
    }
  }
}

// ==================== 示例 2: 获取当前用户信息 ====================

/**
 * 获取当前已登录用户的信息
 */
export async function fetchCurrentUser() {
  try {
    // ========== API 调用已注释，用于测试 UI 交互流程 ==========
    // const user = await userApi.getCurrentUser();
    // console.log("Current user:", user);
    // return user;

    // 模拟返回，用于测试
    console.log("模拟获取当前用户（API 调用已禁用）");
    return {
      id: 1,
      wallet_address: '0x...',
      smart_account_address: null,
      role: 'user' as const,
      username: null,
      display_name: null,
      avatar_url: null,
      bio: null
    };
    // ========================================================
  } catch (error: any) {
    console.error("Failed to fetch current user:", error);

    if (error.status === 401) {
      console.log("Token expired, please login again");
      removeToken(); // 清除过期 token
      // 重定向到登录页
      // window.location.href = '/login';
    }

    throw error;
  }
}

// ==================== 示例 3: 查看其他用户资料 ====================

/**
 * 查看指定用户的公开资料 (无需认证)
 */
export async function fetchUserProfile(userId: number) {
  try {
    // ========== API 调用已注释，用于测试 UI 交互流程 ==========
    // const user = await userApi.getUserById(userId);
    // console.log("User profile:", user);
    // console.log("Username:", user.username || "Not set");
    // console.log("Display name:", user.display_name || "Not set");
    // return user;

    // 模拟返回，用于测试
    console.log("模拟获取用户资料（API 调用已禁用）", userId);
    const user = {
      id: userId,
      wallet_address: '0x...',
      smart_account_address: null,
      role: 'user' as const,
      username: 'test_user',
      display_name: 'Test User',
      avatar_url: null,
      bio: 'This is a test user'
    };
    console.log("User profile:", user);
    console.log("Username:", user.username || "Not set");
    console.log("Display name:", user.display_name || "Not set");
    return user;
    // ========================================================
  } catch (error: any) {
    console.error("Failed to fetch user profile:", error);

    if (error.status === 404) {
      throw new Error("User not found");
    }

    throw error;
  }
}

// ==================== 示例 4: 更新用户资料 ====================

/**
 * 更新当前用户的资料
 */
export async function updateUserProfile(profileData: {
  username?: string;
  display_name?: string;
  avatar_url?: string;
  bio?: string;
}) {
  try {
    // ========== API 调用已注释，用于测试 UI 交互流程 ==========
    // const updatedUser = await userApi.updateProfile(profileData);
    // console.log("Profile updated successfully:", updatedUser);
    // return updatedUser;

    // 模拟返回，用于测试
    console.log("模拟更新用户资料（API 调用已禁用）", profileData);
    return {
      id: 1,
      wallet_address: '0x...',
      smart_account_address: null,
      role: 'user' as const,
      username: profileData.username || null,
      display_name: profileData.display_name || null,
      avatar_url: profileData.avatar_url || null,
      bio: profileData.bio || null
    };
    // ========================================================
  } catch (error: any) {
    console.error("Failed to update profile:", error);

    // 处理验证错误
    if (error.status === 400 && error.details) {
      const validationErrors = error.details
        .map((d: any) => `${d.field}: ${d.message}`)
        .join("\n");
      throw new Error(`Validation failed:\n${validationErrors}`);
    }

    // 处理 username 冲突
    if (error.status === 409) {
      throw new Error("Username already taken. Please choose another one.");
    }

    // 处理认证错误
    if (error.status === 401) {
      throw new Error("Please login again to update your profile.");
    }

    throw error;
  }
}

// ==================== 示例 5: 检查登录状态 ====================

/**
 * 检查用户是否已登录
 */
export function isUserLoggedIn(): boolean {
  const token = getToken();
  return token !== null;
}

/**
 * 登出用户
 */
export function logout() {
  removeToken();
  console.log("User logged out");
  // 可选：重定向到首页
  // window.location.href = '/';
}

// ==================== React 组件使用示例 ====================

/**
 * 在 React 组件中使用的示例代码
 *
 * ```tsx
 * import { useState } from 'react';
 * import { handleSiweLogin, fetchCurrentUser, updateUserProfile } from '@/utils/api/examples';
 *
 * function LoginButton() {
 *   const [loading, setLoading] = useState(false);
 *
 *   const handleLogin = async () => {
 *     setLoading(true);
 *     try {
 *       const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
 *       const user = await handleSiweLogin(accounts[0]);
 *       alert(`Welcome, ${user.wallet_address}!`);
 *     } catch (error) {
 *       alert(error.message);
 *     } finally {
 *       setLoading(false);
 *     }
 *   };
 *
 *   return (
 *     <button onClick={handleLogin} disabled={loading}>
 *       {loading ? 'Connecting...' : 'Connect Wallet'}
 *     </button>
 *   );
 * }
 *
 * function ProfileSettings() {
 *   const [username, setUsername] = useState('');
 *   const [displayName, setDisplayName] = useState('');
 *
 *   const handleSubmit = async (e) => {
 *     e.preventDefault();
 *     try {
 *       const user = await updateUserProfile({ username, display_name: displayName });
 *       alert('Profile updated successfully!');
 *     } catch (error) {
 *       alert(error.message);
 *     }
 *   };
 *
 *   return (
 *     <form onSubmit={handleSubmit}>
 *       <input
 *         value={username}
 *         onChange={(e) => setUsername(e.target.value)}
 *         placeholder="Username"
 *       />
 *       <input
 *         value={displayName}
 *         onChange={(e) => setDisplayName(e.target.value)}
 *         placeholder="Display Name"
 *       />
 *       <button type="submit">Update Profile</button>
 *     </form>
 *   );
 * }
 * ```
 */

// ==================== 错误处理最佳实践 ====================

/**
 * 统一的错误处理函数
 */
export function handleApiError(error: any): string {
  // 网络错误
  if (error.code === "NETWORK_ERROR") {
    return "Network error. Please check your internet connection.";
  }

  // 超时错误
  if (error.code === "TIMEOUT") {
    return "Request timeout. Please try again.";
  }

  // 认证错误
  if (error.status === 401) {
    removeToken();
    return "Session expired. Please login again.";
  }

  // 权限错误
  if (error.status === 403) {
    return "Permission denied.";
  }

  // 资源不存在
  if (error.status === 404) {
    return "Resource not found.";
  }

  // 验证错误
  if (error.status === 400 && error.details) {
    return error.details.map((d: any) => d.message).join(", ");
  }

  // 冲突错误
  if (error.status === 409) {
    return error.message || "Conflict error.";
  }

  // 服务器错误
  if (error.status >= 500) {
    return "Server error. Please try again later.";
  }

  // 默认错误消息
  return error.message || "An unexpected error occurred.";
}

// ==================== 监听 Token 过期事件 ====================

/**
 * 在应用初始化时设置 token 过期监听
 * 当检测到 401 错误时，自动触发此事件
 */
export function setupTokenExpirationListener() {
  if (typeof window === "undefined") return;

  window.addEventListener("auth:token-expired", () => {
    console.log("Token expired, redirecting to login...");
    // 重定向到登录页或显示登录弹窗
    // window.location.href = '/login';
  });
}
