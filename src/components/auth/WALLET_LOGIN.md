# 钱包登录功能集成文档

## 概述

本项目已成功集成 SIWE (Sign-In with Ethereum) 钱包登录功能，支持用户通过 Web3 钱包进行身份验证。

## 技术栈

- **SIWE**: Sign-In with Ethereum (EIP-4361 标准)
- **Viem**: 轻量级以太坊库，用于地址格式化（EIP-55 校验和）
- **Polygon Mainnet**: Chain ID 137
- **支持的钱包**: MetaMask, Coinbase, Phantom, WalletConnect

## 登录流程

### 完整流程说明

1. **用户点击钱包图标**
   - 触发 `handleWalletConnect()` 函数

2. **连接钱包**
   - 检查是否安装了 Web3 钱包扩展
   - 调用 `window.ethereum.request({ method: 'eth_requestAccounts' })`
   - 获取用户的钱包地址
   - 使用 `viem.getAddress()` 将地址转换为 EIP-55 校验和格式

3. **生成 SIWE 消息**
   - 使用 `siwe` 库生成符合 EIP-4361 标准的消息
   - 包含域名、钱包地址（EIP-55 格式）、声明、URI、版本、链 ID 和随机 nonce

4. **请求签名**
   - 调用 `window.ethereum.request({ method: 'personal_sign' })`
   - 用户在钱包中确认签名

5. **后端验证**
   - 调用 `userApi.loginWithSiwe(message, signature)`
   - 后端验证签名的有效性
   - 返回用户信息和 JWT token

6. **保存认证状态**
   - Token 自动保存到 localStorage
   - 关闭登录弹窗
   - 触发 `onLoginSuccess()` 回调

## 代码实现

### AuthModal 和 WalletModal

两个组件都实现了相同的钱包登录逻辑：

```typescript
import { getAddress } from 'viem';

const handleWalletConnect = async (wallet: string) => {
  try {
    // 1. 显示加载状态
    setIsLoading(true);
    setLoadingMessage('Connecting to MetaMask...');

    // 2. 请求钱包连接
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });

    // 将地址转换为 EIP-55 格式（校验和格式）
    // 这是必须的，因为 SIWE 要求地址符合 EIP-55 标准
    const walletAddress = getAddress(accounts[0]);

    // 3. 生成 SIWE 消息
    const message = new SiweMessage({
      domain: window.location.host,
      address: walletAddress, // EIP-55 格式的地址
      statement: 'Sign in with Ethereum to Polyplot',
      uri: window.location.origin,
      version: '1',
      chainId: 137, // Polygon Mainnet
      nonce: Math.floor(Math.random() * 100000000).toString(),
    });

    // 4. 请求用户签名
    setLoadingMessage('Waiting for signature...');
    const signature = await window.ethereum.request({
      method: 'personal_sign',
      params: [messageString, walletAddress],
    });

    // 5. 调用登录 API
    setLoadingMessage('Authenticating...');
    const loginData = await userApi.loginWithSiwe(messageString, signature);

    // 6. 登录成功
    setIsLoading(false);
    handleClose(true);
  } catch (error) {
    // 错误处理
    setIsLoading(false);
    const errorMessage = handleApiError(error);
    alert(errorMessage);
  }
};
```

## Loading 状态管理

### 加载消息阶段

1. **连接钱包**: `"Connecting to {wallet}..."`
2. **准备签名**: `"Preparing signature..."`
3. **等待签名**: `"Waiting for signature..."`
4. **认证中**: `"Authenticating..."`

### Loading 动画

使用自定义的 `LoadingSpinner` 组件：

```tsx
<LoadingSpinner
  size="lg"
  message={loadingMessage}
  variant="long"
/>
```

## 错误处理

### 支持的错误类型

1. **钱包未安装**
   ```typescript
   if (typeof window.ethereum === 'undefined') {
     throw new Error('Please install MetaMask or another Web3 wallet to continue.');
   }
   ```

2. **用户拒绝签名** (Error code: 4001)
   ```typescript
   if (error.code === 4001) {
     alert('Signature rejected. Please try again.');
   }
   ```

3. **网络错误**
   - 使用 `handleApiError()` 统一处理

4. **API 错误**
   - 401: 签名验证失败
   - 500: 服务器错误
   - 其他错误：显示友好的错误消息

## 类型定义

### Window.ethereum

在 `src/types/global.d.ts` 中定义：

```typescript
interface Window {
  ethereum?: {
    request: (args: {
      method: string;
      params?: unknown[];
    }) => Promise<unknown>;
    isMetaMask?: boolean;
    isCoinbaseWallet?: boolean;
    isPhantom?: boolean;
  };
}
```

## API 调用

### userApi.loginWithSiwe()

位置: `src/utils/api/user.ts`

**参数:**
- `message: string` - SIWE 消息字符串
- `signature: string` - 十六进制签名

**返回:**
```typescript
{
  user: {
    id: number;
    wallet_address: string;
    smart_account_address: string | null;
    role: UserRole;
    username: string | null;
    display_name: string | null;
    avatar_url: string | null;
  },
  token: string;
}
```

**副作用:**
- Token 自动保存到 localStorage
- 可通过 `getToken()` 获取

## 使用示例

### 在组件中使用

```tsx
import AuthModal from '@/components/auth/AuthModal';
import WalletModal from '@/components/auth/WalletModal';

function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleLoginSuccess = () => {
    console.log('User logged in successfully!');
    // 刷新用户信息、重定向等
  };

  return (
    <>
      <button onClick={() => setShowAuthModal(true)}>
        Login
      </button>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLoginSuccess={handleLoginSuccess}
        mode="login"
      />
    </>
  );
}
```

## 安全注意事项

1. **HTTPS 要求**: 生产环境必须使用 HTTPS
2. **Nonce 随机性**: 每次登录都使用新的随机 nonce
3. **消息验证**: 后端必须验证消息的完整性和签名
4. **Token 管理**: JWT token 存储在 localStorage，注意 XSS 防护
5. **链 ID 验证**: 确保用户连接到正确的区块链网络

## 测试指南

### 前置条件

1. 安装 MetaMask 浏览器扩展
2. 创建或导入钱包账户
3. 连接到 Polygon Mainnet (Chain ID: 137)

### 测试步骤

1. 打开应用，点击"登录"按钮
2. 在弹窗中点击 MetaMask 钱包图标
3. 观察 Loading 状态变化
4. 在 MetaMask 中确认签名
5. 验证登录成功并关闭弹窗
6. 检查 localStorage 中是否保存了 token
7. 验证后续请求是否携带正确的认证头

### 测试错误场景

1. **钱包未安装**: 移除钱包扩展，应显示错误提示
2. **拒绝签名**: 在钱包中点击"拒绝"，应显示友好提示
3. **网络错误**: 断开网络连接，应显示网络错误提示
4. **无效签名**: 修改签名字符串，应返回 401 错误

## 常见问题

### Q: 什么是 EIP-55 地址格式？
A: EIP-55 是以太坊地址的校验和格式标准，通过混合大小写字母来提供校验功能。例如：
- 错误格式：`0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266` (全小写)
- 正确格式：`0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266` (EIP-55 格式)

我们使用 `viem.getAddress()` 来自动转换地址格式，确保符合 SIWE 的要求。

### Q: 为什么选择 Polygon Mainnet？
A: Polygon 提供更快的交易速度和更低的 Gas 费用，适合频繁的用户交互。

### Q: 是否支持其他链？
A: 当前仅支持 Polygon Mainnet (Chain ID: 137)。如需添加其他链，修改 `chainId` 参数即可。

### Q: Token 有效期是多久？
A: 由后端配置决定，前端会自动处理 token 过期的情况（401 错误）。

### Q: 如何退出登录？
A: 调用 `removeToken()` 清除 localStorage 中的 token。

```typescript
import { removeToken } from '@/utils/request';

const handleLogout = () => {
  removeToken();
  console.log('User logged out');
};
```

## 后续优化建议

1. **多链支持**: 允许用户选择不同的区块链网络
2. **错误提示优化**: 使用 Toast 或 Modal 替代 alert()
3. **登录状态持久化**: 实现自动刷新 token 机制
4. **钱包自动检测**: 检测用户安装的钱包类型并推荐使用
5. **性能优化**: 添加签名缓存，避免重复签名
