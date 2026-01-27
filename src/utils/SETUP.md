# API 工具设置说明

本文档说明如何配置和使用项目中的 API 请求工具。

## 已完成的工作

✅ 创建了基于 Axios 的通用请求封装 (`utils/request.ts`)
✅ 创建了用户 API 服务 (`utils/api/user.ts`)
✅ 创建了使用示例 (`utils/api/examples.ts`)
✅ 安装了所需依赖 (`axios`, `siwe`)
✅ 验证了项目构建成功

## 文件结构

```
src/utils/
├── request.ts              # 通用 Axios 请求封装
├── api/
│   ├── user.ts            # 用户 API 服务
│   ├── examples.ts        # 使用示例
│   └── README.md          # API 使用文档
└── SETUP.md               # 本文档
```

## 环境配置

### 1. 环境配置文件

在项目目录/src/config/configs.ts 文件：

```bash
# 开发环境
BASE_URL=http://localhost:3000
```

或者使用生产环境配置：

```bash
# 生产环境
BASE_URL=https://api.polyplot.com
```

### 2. 验证依赖已安装

运行以下命令确认依赖：

```bash
npm list axios siwe
```

应该看到：
```
├── axios@1.13.2
└── siwe@2.x.x
```

如果缺失，手动安装：

```bash
npm install axios siwe
```

## 核心功能特性

### 1. 自动 JWT Token 管理

- ✅ 登录后自动保存 token 到 `localStorage`
- ✅ 后续请求自动携带 `Authorization: Bearer {token}` header
- ✅ Token 过期时自动清除并触发事件

### 2. SIWE 签名认证支持

- ✅ 支持 EIP-4361 (Sign-In with Ethereum) 标准
- ✅ 通过 HTTP Headers (`X-Message`, `X-Signature`) 传递签名
- ✅ 自动提取钱包地址并验证

### 3. 统一错误处理

- ✅ 格式化所有 API 错误
- ✅ 区分网络错误、认证错误、验证错误等
- ✅ 提供用户友好的错误消息

### 4. TypeScript 类型安全

- ✅ 完整的类型定义
- ✅ 请求/响应类型推断
- ✅ IDE 自动补全支持

## 快速使用示例

### 示例 1: 用户登录

```typescript
import { handleSiweLogin } from '@/utils/api/examples';

// 在组件中调用
const handleLogin = async (walletAddress: string) => {
  try {
    const user = await handleSiweLogin(walletAddress);
    console.log('Logged in:', user);
  } catch (error) {
    console.error('Login failed:', error);
  }
};
```

### 示例 2: 获取当前用户

```typescript
import userApi from '@/utils/api/user';

const user = await userApi.getCurrentUser();
console.log('Current user:', user);
```

### 示例 3: 更新用户资料

```typescript
import userApi from '@/utils/api/user';

const updatedUser = await userApi.updateProfile({
  username: 'satoshi',
  display_name: 'Satoshi Nakamoto',
  bio: 'Crypto enthusiast'
});
```

### 示例 4: 查看公开用户资料

```typescript
import userApi from '@/utils/api/user';

// 无需认证
const user = await userApi.getUserById(123);
```

## 集成到现有组件

### 1. 更新 AuthContext

在 `src/contexts/AuthContext.tsx` 中集成 API：

```typescript
import userApi from '@/utils/api/user';
import { getToken, removeToken } from '@/utils/request';

// 在 login 函数中
const login = async (message: string, signature: string) => {
  try {
    const { user, token } = await userApi.loginWithSiwe(message, signature);
    setUser(user);
    // token 已自动保存到 localStorage
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

// 在 logout 函数中
const logout = () => {
  removeToken();
  setUser(null);
};

// 检查登录状态
const checkAuth = async () => {
  try {
    const token = getToken();
    if (!token) {
      setUser(null);
      return;
    }

    const currentUser = await userApi.getCurrentUser();
    setUser(currentUser);
  } catch (error) {
    // Token 无效或过期
    removeToken();
    setUser(null);
  }
};
```

### 2. 更新 WalletModal 组件

在 `src/components/auth/WalletModal.tsx` 中：

```typescript
import { handleSiweLogin } from '@/utils/api/examples';

const handleConnect = async (walletAddress: string) => {
  try {
    const user = await handleSiweLogin(walletAddress);
    // 登录成功，关闭弹窗
    onClose();
    // 更新全局状态
    // ...
  } catch (error: any) {
    setError(error.message);
  }
};
```

### 3. 更新用户资料设置组件

在 `src/app/setting/components/ProfileSettings.tsx` 中：

```typescript
import userApi from '@/utils/api/user';
import { handleApiError } from '@/utils/api/examples';

const handleSubmit = async (formData: FormData) => {
  try {
    const updatedUser = await userApi.updateProfile({
      username: formData.get('username') as string,
      display_name: formData.get('display_name') as string,
      bio: formData.get('bio') as string,
    });

    // 更新成功
    setSuccess(true);
  } catch (error) {
    const errorMessage = handleApiError(error);
    setError(errorMessage);
  }
};
```

## Token 过期处理

在应用的根布局文件 (`src/app/layout.tsx`) 中设置全局监听：

```typescript
'use client';

import { useEffect } from 'react';
import { setupTokenExpirationListener } from '@/utils/api/examples';
import { useRouter } from 'next/navigation';

export default function RootLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    // 设置 token 过期监听
    setupTokenExpirationListener();

    // 监听 token 过期事件
    const handleTokenExpired = () => {
      // 显示登录弹窗或重定向到登录页
      router.push('/');
      // 或触发全局登录弹窗
      // setShowLoginModal(true);
    };

    window.addEventListener('auth:token-expired', handleTokenExpired);

    return () => {
      window.removeEventListener('auth:token-expired', handleTokenExpired);
    };
  }, [router]);

  return children;
}
```

## API 端点映射

根据后端文档，当前已实现的端点：

| 端点 | 方法 | 函数 | 认证 |
|------|------|------|------|
| `/api/v1/users` | POST | `userApi.loginWithSiwe()` | SIWE 签名 |
| `/api/v1/users/me` | GET | `userApi.getCurrentUser()` | JWT Token |
| `/api/v1/users/me` | PUT | `userApi.updateProfile()` | JWT Token |
| `/api/v1/users/{id}` | GET | `userApi.getUserById()` | 无需认证 |

## 后续扩展

### 添加新的 API 端点

参考 `user.ts` 创建新的 API 服务文件：

```typescript
// src/utils/api/narrative.ts
import { get, post } from '@/utils/request';

export interface Narrative {
  id: string;
  title: string;
  // ...
}

export const getNarratives = async (): Promise<Narrative[]> => {
  const response = await get<Narrative[]>('/api/v1/narratives');
  return response.data;
};

export const getNarrativeById = async (id: string): Promise<Narrative> => {
  const response = await get<Narrative>(`/api/v1/narratives/${id}`, {
    skipAuth: true, // 如果是公开端点
  });
  return response.data;
};

export default {
  getNarratives,
  getNarrativeById,
};
```

## 测试 API 调用

### 1. 在浏览器控制台测试

```javascript
// 打开浏览器控制台
import('/utils/api/user').then(userApi => {
  userApi.default.getCurrentUser().then(user => {
    console.log('User:', user);
  });
});
```

### 2. 使用 API 文档

后端提供了 Swagger UI：

```
http://localhost:3000/swagger-ui/
```

可以在这里测试所有端点。

## 故障排查

### 问题 1: CORS 错误

**症状：** `Access-Control-Allow-Origin` 错误

**解决：**
- 确保后端配置了正确的 CORS 策略
- 检查 `NEXT_PUBLIC_API_BASE_URL` 是否正确

### 问题 2: Token 未自动携带

**症状：** 请求返回 401 Unauthorized

**解决：**
```typescript
import { getToken } from '@/utils/request';

// 检查 token 是否存在
const token = getToken();
console.log('Token:', token);

// 如果为 null，需要重新登录
```

### 问题 3: 类型错误

**症状：** TypeScript 报错找不到类型

**解决：**
```bash
# 重新安装依赖
npm install

# 重启 TypeScript 服务器（VSCode）
Cmd+Shift+P -> "TypeScript: Restart TS Server"
```

### 问题 4: 环境变量未生效

**症状：** API 请求发送到错误的 URL

**解决：**
- 确认 `.env.local` 文件在项目根目录
- 重启开发服务器 `npm run dev`
- 环境变量必须以 `NEXT_PUBLIC_` 开头才能在客户端使用

## 安全注意事项

1. **Token 存储：** JWT token 存储在 `localStorage`，注意 XSS 攻击防护
2. **HTTPS：** 生产环境必须使用 HTTPS
3. **Token 刷新：** 当前 token 有效期 30 天，未来可能需要实现自动刷新
4. **敏感信息：** 不要在 API 调用中记录敏感信息（如签名、token）

## 性能优化建议

1. **缓存用户信息：** 使用 React Context 或状态管理库缓存用户数据
2. **请求去重：** 避免重复请求相同的数据
3. **并发请求：** 使用 `Promise.all()` 并发执行独立的请求
4. **懒加载：** 仅在需要时才加载用户资料等数据

## 相关文档

- [API 使用指南](./api/README.md) - 详细的使用文档
- [后端 API 文档](../../../Polyplot-backend/docs/api-users.md) - 后端接口规范
- [示例代码](./api/examples.ts) - 完整的使用示例

## 技术栈

- **Axios**: HTTP 客户端
- **SIWE**: Sign-In with Ethereum (EIP-4361)
- **TypeScript**: 类型安全
- **Next.js**: React 框架

---

**创建时间：** 2026-01-25
**最后更新：** 2026-01-25
