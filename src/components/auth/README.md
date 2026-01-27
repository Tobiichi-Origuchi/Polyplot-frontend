# Authentication Components with Loading Animation

## LoadingSpinner Component

一个符合 Polyplot 设计规范的 Loading 动画组件，用于登录和认证流程。

### 特性

- ✨ 使用 Lucide React 的 `Loader2` 图标
- 🎨 支持项目配色方案（Long、Short、Primary）
- 📐 三种尺寸可选（sm、md、lg）
- 🎭 带有动态加载点动画
- 🌗 完美适配深色主题

### 使用方式

#### 基本用法

```tsx
import LoadingSpinner from '@/components/auth/LoadingSpinner';

// 默认使用
<LoadingSpinner />

// 自定义消息
<LoadingSpinner message="Loading..." />

// 自定义尺寸
<LoadingSpinner size="lg" message="Please wait..." />

// 自定义配色（Long - 金色）
<LoadingSpinner variant="long" message="Connecting..." />

// 自定义配色（Short - 紫色）
<LoadingSpinner variant="short" message="Processing..." />
```

### 参数说明

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | 加载器尺寸 |
| `message` | `string` | `'Loading...'` | 显示的加载消息 |
| `variant` | `'long' \| 'short' \| 'primary'` | `'long'` | 配色方案 |

### 尺寸规格

- **sm**: 图标 20px，适合按钮内使用
- **md**: 图标 32px，适合弹窗内使用
- **lg**: 图标 48px，适合全屏加载

### 配色方案

- **long**: 使用 `bg-long` / `text-long` (琥珀色/金色) - 推荐用于 Buy Long 相关操作
- **short**: 使用 `bg-short` / `text-short` (紫色) - 推荐用于 Buy Short 相关操作
- **primary**: 使用 `text-text-primary` (白色) - 通用场景

### 在认证弹窗中的应用

#### AuthModal

当用户点击登录按钮时，显示全屏覆盖的 Loading 动画：

```tsx
{isLoading && (
  <div className="absolute inset-0 bg-bg-card/95 backdrop-blur-sm rounded-3xl flex items-center justify-center z-20">
    <LoadingSpinner
      size="lg"
      message={loadingMessage}
      variant="long"
    />
  </div>
)}
```

支持的登录方式：
- Google 登录：`"Connecting to Google..."`
- 邮箱登录：`"Sending verification email..."`
- 钱包连接：`"Connecting to MetaMask..."`

#### WalletModal

钱包连接时显示 Loading 状态：

```tsx
{isLoading && (
  <div className="absolute inset-0 bg-bg-card/95 backdrop-blur-sm rounded-3xl flex items-center justify-center z-20">
    <LoadingSpinner
      size="lg"
      message={loadingMessage}
      variant="long"
    />
  </div>
)}
```

#### AuthorizationModal

签名授权时显示 Loading 状态：

```tsx
{tradingStatus === 'signing' ? (
  <div className="py-8">
    <LoadingSpinner
      size="md"
      message="Waiting for signature..."
      variant="long"
    />
  </div>
) : (
  // 其他状态...
)}
```

### 动画效果

1. **旋转加载圈**: 使用 `animate-spin` 实现平滑旋转
2. **动态加载点**: 三个小圆点依次弹跳（`animate-bounce`），每个点延迟 150ms
3. **背景模糊**: 使用 `backdrop-blur-sm` 创建磨砂玻璃效果
4. **渐入渐出**: Loading overlay 使用半透明背景 (`bg-bg-card/95`)

### 设计规范

- 遵循 Tailwind CSS v4 自定义配色系统
- 使用项目定义的颜色类（`bg-long`、`text-text-primary` 等）
- 保持深色主题一致性
- 支持响应式设计

### 示例场景

```tsx
// 场景1: 钱包连接
<LoadingSpinner
  size="lg"
  message="Connecting to MetaMask..."
  variant="long"
/>

// 场景2: 签名等待
<LoadingSpinner
  size="md"
  message="Waiting for signature..."
  variant="long"
/>

// 场景3: 数据加载
<LoadingSpinner
  size="sm"
  message="Loading data..."
  variant="primary"
/>
```

### 注意事项

- Loading 消息应简洁明了，说明当前正在执行的操作
- 使用 `variant="long"` 作为默认配色，符合项目主色调
- 在弹窗中使用时，建议添加半透明背景遮罩
- 确保 Loading 状态有明确的开始和结束逻辑
