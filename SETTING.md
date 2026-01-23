# Setting Page - 设计规范与实现文档

## 页面概述

**路由**: `/setting`
**功能**: 用户设置管理页面，包含个人资料、账户、交易、通知和 Builder Codes 配置

---

## 页面布局结构

### 整体布局
```
+---------------------------+-------------------------------------------+
|                           |                                           |
|   侧边导航栏               |          设置内容区域                       |
|   (固定宽度 300px)         |          (自适应宽度)                       |
|                           |                                           |
|   - Profile (选中)        |   Profile Settings                        |
|   - Account               |   [头像上传区]                             |
|   - Trading               |   [表单字段]                               |
|   - Notifications         |   [Social Connections]                    |
|   - Builder Codes         |   [保存按钮]                               |
|                           |                                           |
+---------------------------+-------------------------------------------+
```

### 响应式布局
- **桌面端 (lg+)**: 侧边栏 + 内容区域（左右布局）
- **平板/移动端 (< lg)**: 顶部标签导航 + 内容区域（上下布局）

---

## 组件设计规范

### 1. 侧边导航栏 (Desktop Sidebar)

#### 容器样式
```tsx
className="w-[240px] bg-bg-primary border-r border-border-primary p-4 min-h-screen"
```

#### 导航项样式

**默认状态**:
```tsx
className="w-full text-left text-text-secondary text-base font-medium px-4 py-3 rounded-lg hover:bg-bg-secondary transition-colors"
```

**选中状态**:
```tsx
className="w-full text-left text-base font-semibold px-4 py-3 rounded-lg bg-long !text-black [&_svg]:!text-black transition-colors"
```

**注意**: 选中项使用 `bg-long` (琥珀色) 背景 + `!text-black` (强制纯黑色文字) + `[&_svg]:!text-black` (强制图标为纯黑色)，使用 `!` 前缀确保覆盖所有其他颜色样式

#### 导航项列表
1. **Profile** - 个人资料设置
2. **Notifications** - 通知管理

---

### 2. 内容区域 (Content Area)

#### 容器样式
```tsx
className="flex-1 bg-bg-primary p-4 lg:p-6"
```

#### 内容最大宽度
```tsx
<div className="max-w-3xl">
  {/* 内容区域 */}
</div>
```

#### 页面标题
```tsx
<h1 className="text-text-primary text-2xl lg:text-3xl font-bold mb-6">
  Profile Settings
</h1>
```

---

### 3. Profile Settings - 表单组件

#### 3.1 头像上传区域

**布局**:
```tsx
<div className="flex items-center gap-4 mb-6">
  {/* 头像 */}
  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 via-yellow-400 to-purple-600 flex items-center justify-center flex-shrink-0">
    {/* 用户头像或占位图 */}
  </div>

  {/* Upload 按钮 */}
  <button className="bg-bg-secondary hover:bg-bg-card text-text-primary font-semibold px-4 py-2.5 rounded-lg transition-colors flex items-center gap-2 border border-border-primary">
    <Upload className="w-4 h-4" />
    Upload
  </button>
</div>
```

**头像渐变色**: `from-purple-600 via-yellow-400 to-purple-600`

---

#### 3.2 表单字段

**通用输入框样式**:
```tsx
<div className="mb-5">
  <label className="block text-text-primary text-sm font-semibold mb-1.5">
    Email
  </label>
  <input
    type="email"
    className="w-full bg-bg-card border border-border-primary rounded-lg px-4 py-2.5 text-text-primary placeholder-text-tertiary focus:outline-none focus:border-long transition-colors"
    placeholder="your@email.com"
  />
  <p className="text-text-tertiary text-sm mt-1.5">
    Receive important market updates
  </p>
</div>
```

**Username 输入框**:
```tsx
<div className="mb-5">
  <label className="block text-text-primary text-sm font-semibold mb-1.5">
    Username
  </label>
  <input
    type="text"
    className="w-full bg-bg-card border border-border-primary rounded-lg px-4 py-2.5 text-text-primary placeholder-text-tertiary focus:outline-none focus:border-long transition-colors"
    placeholder="username"
  />
</div>
```

**Bio 文本域**:
```tsx
<div className="mb-6">
  <label className="block text-text-primary text-sm font-semibold mb-1.5">
    Bio
  </label>
  <textarea
    rows={4}
    className="w-full bg-bg-card border border-border-primary rounded-lg px-4 py-2.5 text-text-primary placeholder-text-tertiary focus:outline-none focus:border-long transition-colors resize-none"
    placeholder="Bio"
  />
</div>
```

**焦点状态**: 所有输入框聚焦时边框变为 `border-long`

---

#### 3.3 Social Connections

```tsx
<div className="mb-6">
  <h3 className="text-text-primary text-base font-semibold mb-3">
    Social Connections
  </h3>

  <button className="bg-bg-card hover:bg-bg-secondary border border-border-primary text-text-primary font-semibold px-4 py-2.5 rounded-lg transition-colors flex items-center gap-2">
    <X className="w-4 h-4" />
    Connect X
  </button>
</div>
```

**图标**: 使用 Lucide React 的 `X` 图标（Twitter/X）

---

#### 3.4 Save Changes 按钮

```tsx
<button className="bg-long hover:bg-long-hover text-black font-bold px-6 py-3 rounded-lg transition-colors">
  Save changes
</button>
```

**注意**: 使用 `bg-long` + `text-black` 确保最佳对比度

---

### 4. Notifications Settings - 通知设置组件

#### 4.1 页面结构

**页面标题**:
```tsx
<h1 className="text-text-primary text-2xl lg:text-3xl font-bold mb-6">
  Notifications Settings
</h1>
```

#### 4.2 Email 通知卡片

**卡片容器**:
```tsx
<div className="bg-bg-card border border-border-primary rounded-xl p-6 mb-4">
```

**卡片头部 - 图标 + 标题**:
```tsx
<div className="flex items-center gap-4 mb-6">
  <div className="w-14 h-14 rounded-xl bg-bg-secondary flex items-center justify-center flex-shrink-0">
    <Mail className="w-7 h-7 text-text-primary" />
  </div>
  <h2 className="text-text-primary text-xl font-bold">Email</h2>
</div>
```

**设置项 - Resolutions 开关**:
```tsx
<div className="flex items-center justify-between">
  <span className="text-text-primary text-base">Resolutions</span>
  <ToggleSwitch enabled={emailResolutions} onChange={setEmailResolutions} />
</div>
```

#### 4.3 In-app 通知卡片

**卡片头部**:
```tsx
<div className="flex items-center gap-4 mb-6">
  <div className="w-14 h-14 rounded-xl bg-bg-secondary flex items-center justify-center flex-shrink-0">
    <Bell className="w-7 h-7 text-text-primary" />
  </div>
  <h2 className="text-text-primary text-xl font-bold">In-app</h2>
</div>
```

**设置项列表**:
```tsx
<div className="space-y-4">
  {/* Order Fills 开关 */}
  <div className="flex items-center justify-between">
    <span className="text-text-primary text-base">Order Fills</span>
    <ToggleSwitch enabled={inAppOrderFills} onChange={setInAppOrderFills} />
  </div>

  {/* Resolutions 开关 */}
  <div className="flex items-center justify-between">
    <span className="text-text-primary text-base">Resolutions</span>
    <ToggleSwitch enabled={inAppResolutions} onChange={setInAppResolutions} />
  </div>
</div>
```

#### 4.4 ToggleSwitch 组件

**组件样式**:
```tsx
// 开启状态
<button className="relative inline-flex h-7 w-12 items-center rounded-full bg-long">
  <span className="inline-block h-5 w-5 rounded-full bg-white translate-x-6" />
</button>

// 关闭状态
<button className="relative inline-flex h-7 w-12 items-center rounded-full bg-bg-secondary">
  <span className="inline-block h-5 w-5 rounded-full bg-white translate-x-1" />
</button>
```

**设计要点**:
- 开关宽度: `w-12` (48px)
- 开关高度: `h-7` (28px)
- 圆形按钮: `h-5 w-5` (20px)
- 开启状态使用 `bg-long` (橙色)
- 关闭状态使用 `bg-bg-secondary`

---

## 颜色使用规范

| 元素 | 背景色 | 文字色 | 边框色 | 状态色 |
|------|--------|--------|--------|--------|
| 页面主背景 | `bg-bg-primary` | - | - | - |
| 侧边栏 | `bg-bg-primary` | - | `border-border-primary` | - |
| 导航项（默认） | - | `text-text-secondary` | - | `hover:bg-bg-secondary` |
| 导航项（选中） | `bg-long` | `text-black` | - | - |
| 输入框 | `bg-bg-card` | `text-text-primary` | `border-border-primary` | `focus:border-long` |
| 提示文字 | - | `text-text-tertiary` | - | - |
| 标签 | - | `text-text-primary` | - | - |
| Upload 按钮 | `bg-bg-secondary` | `text-text-primary` | `border-border-primary` | `hover:bg-bg-card` |
| Social 按钮 | `bg-bg-card` | `text-text-primary` | `border-border-primary` | `hover:bg-bg-secondary` |
| Save 按钮 | `bg-long` | `text-black` | - | `hover:bg-long-hover` |

---

## 响应式设计

### 桌面端 (lg: 1024px+)
```tsx
<div className="flex min-h-screen">
  {/* 侧边栏 */}
  <aside className="hidden lg:block w-[300px]">
    {/* 导航项 */}
  </aside>

  {/* 内容区域 */}
  <main className="flex-1 p-12">
    {/* 表单内容 */}
  </main>
</div>
```

### 移动端 (< 1024px)
```tsx
<div className="min-h-screen">
  {/* 顶部标签导航 */}
  <nav className="lg:hidden bg-bg-primary border-b border-border-primary overflow-x-auto">
    <div className="flex gap-2 p-4">
      <button className="bg-long text-black px-4 py-2 rounded-lg whitespace-nowrap">
        Profile
      </button>
      <button className="bg-bg-secondary text-text-secondary px-4 py-2 rounded-lg whitespace-nowrap">
        Account
      </button>
      {/* ... */}
    </div>
  </nav>

  {/* 内容区域 */}
  <main className="p-6">
    {/* 表单内容 */}
  </main>
</div>
```

---

## 图标使用

使用 **Lucide React** 图标库：

```tsx
import { Upload, X, User, Bell } from 'lucide-react'
```

| 功能 | 图标 | 用途 |
|------|------|------|
| Upload | `<Upload />` | 头像上传按钮 |
| X (Twitter) | `<X />` | 社交媒体连接 |
| User | `<User />` | Profile 导航 |
| Bell | `<Bell />` | Notifications 导航 |

---

## 表单验证与交互

### 输入框状态

1. **默认状态**: `border-border-primary`
2. **聚焦状态**: `focus:border-long focus:outline-none`
3. **错误状态**: `border-red-500`
4. **成功状态**: `border-green-500`

### 错误提示样式
```tsx
<p className="text-red-500 text-sm mt-2">
  This field is required
</p>
```

### 成功提示样式
```tsx
<p className="text-green-500 text-sm mt-2">
  Changes saved successfully
</p>
```

---

## 文件结构

```
app/
├── setting/
│   ├── page.tsx                    # 设置页面主文件
│   ├── components/
│   │   ├── Sidebar.tsx             # 侧边导航栏组件（仅 Profile 和 Notifications）
│   │   ├── ToggleSwitch.tsx        # 可复用开关组件
│   │   ├── ProfileSettings.tsx     # Profile 设置表单
│   │   ├── NotificationSettings.tsx # Notifications 设置表单（完整实现）
│   │   ├── AccountSettings.tsx     # Account 设置表单（已移除导航，保留文件）
│   │   ├── TradingSettings.tsx     # Trading 设置表单（已移除导航，保留文件）
│   │   └── BuilderCodesSettings.tsx # Builder Codes 设置表单（已移除导航，保留文件）
│   └── layout.tsx                  # 设置页面布局（可选）
```

---

## 实现步骤

- [x] 创建 `/app/setting` 目录结构
- [x] 实现 Sidebar 导航组件
- [x] 实现 ProfileSettings 表单组件
- [x] 实现头像上传功能
- [ ] 实现表单验证逻辑（后续完善）
- [x] 实现 Social Connections 功能
- [ ] 实现保存更改接口对接（后续完善）
- [x] 实现响应式布局（移动端适配）
- [x] 实现其他设置页面（Account、Trading、Notifications、Builder Codes）
- [x] 运行 `npm run lint` 检查代码规范

---

## 技术栈

- **框架**: Next.js 16 (App Router)
- **样式**: Tailwind CSS v4
- **图标**: Lucide React
- **语言**: TypeScript
- **状态管理**: React Hooks (useState, useEffect)

---

## 注意事项

1. ⚠️ **所有使用 `bg-long` 背景的组件必须使用 `text-black` 文字**
2. ✅ **所有输入框聚焦时边框使用 `border-long`**
3. ✅ **使用 Tailwind CSS v4 自定义类名（不要硬编码颜色）**
4. ✅ **确保响应式设计在所有设备上正常工作**
5. ✅ **样式编写完成后必须运行 `npm run lint`**
6. ✅ **使用 TypeScript 类型定义，确保类型安全**

---

## 更新日志

### 2026-01-23

#### 初始实现
- ✅ 创建 SETTING.md 文档
- ✅ 定义页面布局结构
- ✅ 定义所有组件样式规范
- ✅ 定义响应式设计方案
- ✅ 实现页面代码开发
  - 创建 `/app/setting` 目录结构
  - 实现 `Sidebar.tsx` 侧边导航栏组件（支持桌面端和移动端）
  - 实现 `ProfileSettings.tsx` 完整表单（头像上传、Email、Username、Bio、Social Connections、Save 按钮）
  - 实现占位组件：`AccountSettings.tsx`、`TradingSettings.tsx`、`NotificationSettings.tsx`、`BuilderCodesSettings.tsx`
  - 实现主页面 `page.tsx`，整合所有组件
  - 通过 `npm run lint` 代码规范检查

#### 尺寸优化
- ✅ 修复侧边栏重复渲染问题
- ✅ 优化整体页面尺寸，使页面更加紧凑：
  - **侧边栏**: 宽度从 300px 调整为 240px，padding 从 p-6 调整为 p-4
  - **导航按钮**: padding 从 px-6 py-4 调整为 px-4 py-3，字体从 text-lg 调整为 text-base
  - **内容区域**: padding 从 p-8 lg:p-12 调整为 p-4 lg:p-6，添加 max-w-3xl 最大宽度限制
  - **页面标题**: 字体从 text-3xl lg:text-4xl 调整为 text-2xl lg:text-3xl
  - **头像**: 尺寸从 w-24 h-24 调整为 w-20 h-20
  - **表单输入框**: padding 从 py-3 调整为 py-2.5
  - **Bio 文本域**: 行数从 6 行调整为 4 行
  - **按钮**: 统一调整 padding，使尺寸更紧凑
  - **间距**: 所有 margin 和 gap 都适当减小

#### 功能精简
- ✅ 删除侧边栏导航选项：Account、Trading、Builder Codes
- ✅ 仅保留核心功能：Profile 和 Notifications 两个设置页面
- ✅ 对应的组件文件保留（AccountSettings.tsx、TradingSettings.tsx、BuilderCodesSettings.tsx），以便后续需要时恢复

#### Notifications Settings 实现
- ✅ 完整实现 Notifications Settings 页面
  - 创建 `ToggleSwitch.tsx` 可复用开关组件
  - 实现 Email 通知卡片（Resolutions 开关）
  - 实现 In-app 通知卡片（Order Fills、Resolutions）
  - 卡片设计：圆角、边框、图标背景
  - 开关组件：橙色（bg-long）开启状态，灰色关闭状态
  - 所有交互状态管理使用 React useState
- ✅ 删除 "Hide small fills (<1 share)" 复选框功能

#### 侧边栏样式优化
- ✅ 确保选中状态使用纯黑色字体
  - 文字颜色：`text-black` (纯黑色 #000000)
  - 图标颜色：`[&_svg]:text-black` (确保 SVG 图标也是纯黑色)
  - 背景色：`bg-long` (琥珀色 #fb923c)
  - 符合网站主体配色风格：琥珀色底黑字
