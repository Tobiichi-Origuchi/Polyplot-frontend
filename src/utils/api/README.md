# API 工具使用指南

本目录包含基于 Axios 的通用 API 请求封装和用户相关的 API 服务。

## 文件结构

```
src/utils/
├── request.ts           # 通用 Axios 请求封装
└── api/
    ├── user.ts          # 用户 API 服务
    ├── examples.ts      # 使用示例
    └── README.md        # 本文档
```

## 快速开始

### 1. 环境配置

在项目根目录的 `.env.local` 文件中配置 API 基础 URL：

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
```

**生产环境：**
```bash
NEXT_PUBLIC_API_BASE_URL=https://api.polyplot.com
```

### 2. 基本使用

#### 方式 1：使用封装好的 API 服务（推荐）

```typescript
import userApi from '@/utils/api/user';

// 登录
const loginData = await userApi.loginWithSiwe(message, signature);

// 获取当前用户
const currentUser = await userApi.getCurrentUser();

// 查看其他用户
const userProfile = await userApi.getUserById(123);

// 更新资料
const updatedUser = await userApi.updateProfile({
  username: 'satoshi',
  display_name: 'Satoshi Nakamoto'
});
```

#### 方式 2：使用底层请求方法

```typescript
import { get, post, put } from '@/utils/request';

// GET 请求
const { data } = await get('/api/v1/users/me');

// POST 请求
const { data } = await post('/api/v1/some-endpoint', { key: 'value' });

// PUT 请求
const { data } = await put('/api/v1/users/me', { username: 'new_name' });
```

## 核心功能

### 1. 自动 JWT Token 管理

Token 会在登录成功后自动保存到 `localStorage`，后续请求会自动携带：

```typescript
import { getToken, setToken, removeToken } from '@/utils/request';

// 获取当前 token
const token = getToken();

// 手动设置 token
setToken('your-jwt-token');

// 清除 token (登出)
removeToken();
```

### 2. SIWE 签名认证

首次登录时使用 SIWE (Sign-In with Ethereum) 签名：

```typescript
import userApi from '@/utils/api/user';
import { SiweMessage } from 'siwe';

// 1. 生成 SIWE 消息
const message = new SiweMessage({
  domain: window.location.host,
  address: walletAddress,
  statement: 'Sign in with Ethereum',
  uri: window.location.origin,
  version: '1',
  chainId: 137,
  nonce: Math.floor(Math.random() * 100000000).toString(),
});

const messageString = message.prepareMessage();

// 2. 钱包签名
const signature = await window.ethereum.request({
  method: 'personal_sign',
  params: [messageString, walletAddress]
});

// 3. 调用登录 API
const { user, token } = await userApi.loginWithSiwe(messageString, signature);
// Token 自动保存，后续请求自动携带
```

### 3. 错误处理

所有 API 错误都会被统一格式化：

```typescript
try {
  await userApi.updateProfile({ username: 'new_name' });
} catch (error) {
  console.log(error.status);   // HTTP 状态码: 400, 401, 409, 500
  console.log(error.code);      // 错误码: VALIDATION_ERROR, CONFLICT, etc.
  console.log(error.message);   // 错误消息
  console.log(error.details);   // 详细信息 (如验证错误)
}
```

**常见错误处理：**

```typescript
import { handleApiError } from '@/utils/api/examples';

try {
  await userApi.updateProfile({ username: 'test' });
} catch (error) {
  const errorMessage = handleApiError(error);
  alert(errorMessage); // 用户友好的错误消息
}
```

### 4. Token 过期自动处理

当检测到 401 错误时，会自动清除 token 并触发事件：

```typescript
// 在应用初始化时设置监听器 (如 app/layout.tsx 或 _app.tsx)
import { setupTokenExpirationListener } from '@/utils/api/examples';

setupTokenExpirationListener();

// 当 token 过期时，会自动触发 'auth:token-expired' 事件
window.addEventListener('auth:token-expired', () => {
  // 重定向到登录页或显示登录弹窗
  router.push('/login');
});
```

### 5. 跳过认证（公开端点）

某些端点不需要认证（如查看公开用户资料）：

```typescript
import { get } from '@/utils/request';

// 方式 1: 使用 skipAuth 选项
const { data } = await get('/api/v1/users/123', { skipAuth: true });

// 方式 2: 使用封装好的方法（已内置 skipAuth）
const user = await userApi.getUserById(123);
```

## React 组件示例

### 登录组件

```tsx
'use client';

import { useState } from 'react';
import { handleSiweLogin, isUserLoggedIn } from '@/utils/api/examples';

export default function LoginButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      // 请求钱包账户
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      // SIWE 登录
      const user = await handleSiweLogin(accounts[0]);

      alert(`Welcome, ${user.username || user.wallet_address}!`);
      window.location.reload(); // 刷新页面以更新状态
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (isUserLoggedIn()) {
    return <div>Already logged in</div>;
  }

  return (
    <div>
      <button onClick={handleLogin} disabled={loading}>
        {loading ? 'Connecting...' : 'Connect Wallet'}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
```

### 用户资料组件

```tsx
'use client';

import { useState, useEffect } from 'react';
import { fetchCurrentUser, updateUserProfile } from '@/utils/api/examples';
import type { UserResponse } from '@/utils/api/user';

export default function UserProfile() {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userData = await fetchCurrentUser();
      setUser(userData);
    } catch (error) {
      console.error('Failed to load user:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const updatedUser = await updateUserProfile({
        username: formData.get('username') as string,
        display_name: formData.get('display_name') as string,
      });

      setUser(updatedUser);
      alert('Profile updated!');
    } catch (error: any) {
      alert(error.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>Please login</div>;

  return (
    <div>
      <h2>User Profile</h2>
      <p>Wallet: {user.wallet_address}</p>
      <p>Username: {user.username || 'Not set'}</p>

      <form onSubmit={handleUpdateProfile}>
        <input
          name="username"
          defaultValue={user.username || ''}
          placeholder="Username"
        />
        <input
          name="display_name"
          defaultValue={user.display_name || ''}
          placeholder="Display Name"
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
```

### 查看其他用户资料

```tsx
'use client';

import { useState, useEffect } from 'react';
import { fetchUserProfile } from '@/utils/api/examples';
import type { UserResponse } from '@/utils/api/user';

export default function PublicUserProfile({ userId }: { userId: number }) {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserProfile();
  }, [userId]);

  const loadUserProfile = async () => {
    try {
      const userData = await fetchUserProfile(userId);
      setUser(userData);
    } catch (error) {
      console.error('User not found:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div>
      <h2>{user.display_name || user.username || 'Anonymous'}</h2>
      <p>Wallet: {user.wallet_address}</p>
      {user.bio && <p>Bio: {user.bio}</p>}
    </div>
  );
}
```

## 类型安全

所有 API 方法都提供完整的 TypeScript 类型：

```typescript
import type {
  UserResponse,
  LoginResponse,
  UpdateProfileRequest,
  UserRole
} from '@/utils/api/user';

// 类型会自动推断
const user: UserResponse = await userApi.getCurrentUser();

// 请求参数类型检查
const profileData: UpdateProfileRequest = {
  username: 'valid_username',
  display_name: 'My Name',
  // TypeScript 会检查字段是否合法
};
```

## 高级用法

### 自定义请求配置

```typescript
import { get, RequestConfig } from '@/utils/request';

const config: RequestConfig = {
  timeout: 10000,           // 自定义超时时间
  skipAuth: true,           // 跳过认证
  headers: {                // 自定义 headers
    'X-Custom-Header': 'value'
  }
};

const { data } = await get('/api/endpoint', config);
```

### 直接使用 Axios 实例

```typescript
import { axiosInstance } from '@/utils/request';

// 完全自定义的请求
const response = await axiosInstance({
  method: 'POST',
  url: '/custom-endpoint',
  data: { key: 'value' },
  headers: { 'X-Custom': 'header' }
});
```

## 常见问题

### Q1: Token 过期后如何处理？

**A:** Token 过期会自动触发 `auth:token-expired` 事件。设置监听器：

```typescript
window.addEventListener('auth:token-expired', () => {
  // 重定向到登录页
  router.push('/login');
  // 或显示登录弹窗
  setShowLoginModal(true);
});
```

### Q2: 如何在服务器端组件中使用？

**A:** 服务器端组件无法使用 `localStorage`。建议：
- 使用 cookies 存储 token
- 或在服务器端直接调用后端 API（不通过 Axios 封装）

### Q3: 如何处理并发请求？

**A:** Axios 自动支持并发请求：

```typescript
const [user, profile] = await Promise.all([
  userApi.getCurrentUser(),
  userApi.getUserById(123)
]);
```

### Q4: 如何取消请求？

**A:** 使用 AbortController：

```typescript
const controller = new AbortController();

try {
  await get('/api/endpoint', { signal: controller.signal });
} catch (error) {
  if (error.name === 'CanceledError') {
    console.log('Request canceled');
  }
}

// 取消请求
controller.abort();
```

## 后续扩展

当需要添加新的 API 端点时，可以参考 `user.ts` 创建新的服务文件：

```
src/utils/api/
├── user.ts          # 用户相关 API
├── narrative.ts     # 叙事相关 API (待创建)
├── portfolio.ts     # 投资组合 API (待创建)
└── trading.ts       # 交易相关 API (待创建)
```

## 相关文档

- [后端 API 文档](../../../../Polyplot-backend/docs/api-users.md)
- [Axios 官方文档](https://axios-http.com/)
- [SIWE 规范 (EIP-4361)](https://eips.ethereum.org/EIPS/eip-4361)
