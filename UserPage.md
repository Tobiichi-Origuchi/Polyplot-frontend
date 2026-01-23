# UserPage - 用户个人界面设计规范

## 实现状态

### ✅ 已完成
- **UserProfileCard** 组件 (`app/components/user/UserProfileCard.tsx`)
  - 包含 Deposit 和 Withdraw 按钮
  - Connect 按钮固定在右上角
- **UserStatItem** 组件 (`app/components/user/UserStatItem.tsx`)
- **页面路由** (`app/[userID]/page.tsx` - 服务器组件)
- **UserPageClient** 组件 (`app/[userID]/UserPageClient.tsx` - 客户端组件)
  - 处理所有交互事件（Deposit, Withdraw, Connect）

### ⏳ 待实现
- ProfitLossChart 组件
- PositionsActivitySection 组件
- 数据 API 集成
- 图表库集成

---

## 架构说明

### 服务器组件与客户端组件分离

为了符合 Next.js 15+ 的最佳实践，页面采用了服务器组件与客户端组件分离的架构：

#### 服务器组件 (`app/[userID]/page.tsx`)
- 负责数据获取（从 API 或数据库）
- 处理路由参数
- 将纯数据传递给客户端组件
- 不包含任何事件处理器或交互逻辑

```tsx
export default async function UserPage({ params }: UserPageProps) {
  const { userID } = await params
  const userData = await fetchUserData(userID) // 服务器端数据获取
  return <UserPageClient userData={userData} />
}
```

#### 客户端组件 (`app/[userID]/UserPageClient.tsx`)
- 使用 `'use client'` 指令
- 处理所有用户交互（点击事件、状态管理）
- 接收来自服务器组件的数据作为 props
- 包含事件处理器（onDeposit, onWithdraw 等）

```tsx
'use client'
export default function UserPageClient({ userData }: UserPageClientProps) {
  const handleDeposit = () => { /* ... */ }
  const handleWithdraw = () => { /* ... */ }
  return <UserProfileCard onDeposit={handleDeposit} onWithdraw={handleWithdraw} />
}
```

### 优势
- ✅ 符合 Next.js RSC（React Server Components）规范
- ✅ 更好的性能（服务器端数据预取）
- ✅ 更小的客户端 bundle 大小
- ✅ 更清晰的职责分离

### 滚动位置管理

为了确保用户访问页面时始终从顶部开始浏览，`UserPageClient` 组件实现了强制滚动重置：

```tsx
useEffect(() => {
  // 立即滚动到顶部
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0

  // 在渲染完成后再次确保滚动位置
  const timer = setTimeout(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, 0)

  return () => clearTimeout(timer)
}, [userData.username])
```

**特性：**
- ✅ 页面加载时自动滚动到顶部
- ✅ 切换不同用户时也会重置滚动位置
- ✅ 使用多种方法确保在所有浏览器中生效
- ✅ 使用 `behavior: 'instant'` 避免滚动动画

---

## 快速使用

### 示例 1: 无余额用户
```tsx
import { UserProfileCard } from '@/app/components/user'

<UserProfileCard
  username="crazyjjjj"
  joinDate="Jan 2026"
  views={0}
  positionsValue="$0.00"  // 无余额 - Withdraw 按钮显示为次级样式
  isConnected={false}
  onConnectToggle={() => console.log('Connect toggled')}
  onDeposit={() => console.log('Deposit clicked')}
  onWithdraw={() => console.log('Withdraw clicked')}
/>
```

### 示例 2: 有余额用户
```tsx
<UserProfileCard
  username="trader_pro"
  joinDate="Dec 2025"
  views={1542}
  positionsValue="$1,240.50"  // 有余额 - Withdraw 按钮显示为紫色（Short 配色）
  isConnected={true}
  onConnectToggle={() => console.log('Connect toggled')}
  onDeposit={() => console.log('Deposit clicked')}
  onWithdraw={() => console.log('Withdraw clicked')}
/>
```

访问示例页面：`http://localhost:3000/crazyjjjj`

---

## 页面路由
- **URL 格式**: `/[userID]`
- **示例**: `/crazyjjjj`

## 页面布局

### 整体布局
```tsx
<div className="min-h-screen bg-bg-primary">
  {/* 顶部导航栏 - Header */}
  <Header />

  {/* 主内容区 */}
  <main className="max-w-7xl mx-auto px-6 py-8">
    {/* 双栏布局 */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* 左侧：用户资料卡片 */}
      <UserProfileCard />

      {/* 右侧：盈亏图表卡片 */}
      <ProfitLossChart />
    </div>

    {/* Positions/Activity 区域 */}
    <PositionsActivitySection />
  </main>
</div>
```

---

## 组件详细设计

### 1. UserProfileCard 组件

用户资料展示卡片，包含头像、用户名、连接按钮和统计数据。

#### Props 定义

```tsx
interface UserProfileCardProps {
  username: string              // 用户名
  avatar?: string              // 头像 URL（可选，默认渐变色）
  joinDate: string             // 加入日期（如 "Jan 2026"）
  views: number                // 浏览量
  positionsValue: string       // 仓位总值（如 "$0.00"）
  isConnected?: boolean        // 是否已连接（默认 false）
  onConnectToggle?: () => void // 连接按钮回调函数
  onDeposit?: () => void       // 存款按钮回调函数
  onWithdraw?: () => void      // 提款按钮回调函数
}
```

#### 组件文件位置
- 主组件: `app/components/user/UserProfileCard.tsx`
- 统计项组件: `app/components/user/UserStatItem.tsx`
- 导出文件: `app/components/user/index.ts`

#### 组件结构
```tsx
<div className="bg-bg-card rounded-2xl border border-border-primary p-6 relative">
  {/* Connect 按钮 - 固定在右上角 */}
  <button className="absolute top-6 right-6 bg-short hover:bg-short-hover text-white text-sm font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors">
    Connect
    <X className="w-3.5 h-3.5" />
  </button>

  {/* 用户信息区域 */}
  <div className="flex items-start gap-4 mb-6 pr-28">
    {/* 头像 */}
    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 via-orange-400 to-yellow-400 flex-shrink-0" />

    {/* 用户名和元信息 */}
    <div className="flex-1 min-w-0">
      <h1 className="text-text-primary font-bold text-2xl truncate mb-2">crazyjjjj</h1>
      <p className="text-text-secondary text-sm">
        Joined Jan 2026 <span className="mx-2">•</span> 0 views
      </p>
    </div>
  </div>

  {/* 底部区域：统计数据和操作按钮 */}
  <div className="grid grid-cols-3 gap-6 pt-6 border-t border-border-primary">
    {/* Positions Value 统计 */}
    <UserStatItem label="Positions Value" value="$0.00" />

    {/* Deposit 按钮 */}
    <div className="flex flex-col justify-end">
      <button className="bg-long hover:bg-long-hover text-black font-semibold px-4 py-2.5 rounded-lg transition-colors w-full">
        Deposit
      </button>
    </div>

    {/* Withdraw 按钮 */}
    <div className="flex flex-col justify-end">
      <button className="bg-bg-secondary hover:bg-bg-secondary/80 border border-border-primary text-text-primary font-semibold px-4 py-2.5 rounded-lg transition-colors w-full">
        Withdraw
      </button>
    </div>
  </div>
</div>
```

#### 子组件：UserStatItem
```tsx
<div className="flex flex-col">
  <span className="text-text-secondary text-xs mb-1">{label}</span>
  <span className="text-text-primary text-xl font-bold">{value}</span>
</div>
```

#### 样式规范
- **卡片容器**: `bg-bg-card`, `rounded-2xl`, `border border-border-primary`, `p-6`, `relative`
- **Connect 按钮**:
  - 定位: `absolute top-6 right-6` (固定在卡片右上角)
  - 颜色: `bg-short` 和 `bg-short-hover` (未连接) / `bg-new` 和 `hover:bg-emerald-600` (已连接)
  - 尺寸: `text-sm`, `px-3 py-1.5`
- **用户信息区域**: `pr-28` (右侧内边距避免与按钮重叠)
- **头像**: 固定尺寸 `w-16 h-16`，渐变色从紫色到橙色到黄色
- **用户名**: `text-2xl`, `font-bold`, `text-text-primary`, `truncate`
- **元信息**: `text-text-secondary`, `text-sm`
- **底部区域**: 3列网格布局 (`grid-cols-3`)
- **统计标签**: `text-text-secondary`, `text-xs`
- **统计数值**: `text-text-primary`, `text-xl`, `font-bold`
- **Deposit 按钮**:
  - 颜色: `bg-long hover:bg-long-hover text-black` (橙色背景，黑色文字)
  - 尺寸: `px-4 py-2.5`, `w-full`
- **Withdraw 按钮**:
  - 动态配色（根据余额状态）
    - 有余额 (>$0): `bg-short hover:bg-short-hover text-white` (紫色，Short 按钮配色)
    - 无余额 (=$0): `bg-bg-secondary hover:bg-bg-secondary/80 border border-border-primary text-text-primary` (深色次级按钮)
  - 尺寸: `px-4 py-2.5`, `w-full`

---

### 2. ProfitLossChart 组件

显示用户的盈亏图表和数据。

#### 组件结构
```tsx
<div className="bg-bg-card rounded-2xl border border-border-primary p-6">
  {/* 头部区域 */}
  <div className="flex justify-between items-start mb-6">
    {/* 左侧：标题和数据 */}
    <div>
      <div className="flex items-center gap-2 mb-2">
        <div className="w-2 h-2 bg-new rounded-full" />
        <h2 className="text-text-primary text-sm font-semibold">Profit/Loss</h2>
      </div>
      <p className="text-text-primary text-4xl font-bold mb-1">$0.00</p>
      <p className="text-text-secondary text-sm">Past Month</p>
    </div>

    {/* 右侧：时间筛选和 Polymarket 标识 */}
    <div className="flex flex-col items-end gap-3">
      {/* 时间筛选按钮组 */}
      <div className="flex gap-2">
        <TimeFilterButton active={false}>1D</TimeFilterButton>
        <TimeFilterButton active={false}>1W</TimeFilterButton>
        <TimeFilterButton active={true}>1M</TimeFilterButton>
        <TimeFilterButton active={false}>ALL</TimeFilterButton>
      </div>

      {/* Polymarket 标识 */}
      <div className="flex items-center gap-2 text-text-tertiary">
        <Layers className="w-4 h-4" />
        <span className="text-sm">Polymarket</span>
      </div>
    </div>
  </div>

  {/* 图表区域 */}
  <div className="h-48 bg-gradient-to-b from-transparent via-bg-secondary to-bg-secondary rounded-lg">
    {/* 图表内容 - 待集成图表库 */}
  </div>
</div>
```

#### 子组件：TimeFilterButton
```tsx
<button
  className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
    active
      ? 'bg-long text-black'
      : 'bg-bg-secondary text-text-secondary hover:bg-bg-secondary/80'
  }`}
>
  {children}
</button>
```

#### 样式规范
- **卡片容器**: 与 UserProfileCard 一致
- **标题指示器**: `w-2 h-2 bg-new rounded-full` (绿色圆点)
- **金额显示**: `text-4xl`, `font-bold`, `text-text-primary`
- **时间筛选按钮 (激活)**: `bg-long`, `text-black`
- **时间筛选按钮 (未激活)**: `bg-bg-secondary`, `text-text-secondary`
- **Polymarket 标识**: `text-text-tertiary`, `text-sm`
- **图表容器**: `h-48`, 渐变背景从透明到 `bg-secondary`

---

### 3. PositionsActivitySection 组件

显示用户的仓位和活动信息。

#### 组件结构
```tsx
<div>
  {/* Positions/Activity 标签栏 */}
  <div className="flex gap-8 mb-6">
    <TabButton active={true}>Positions</TabButton>
    <TabButton active={false}>Activity</TabButton>
  </div>

  {/* Positions 内容区 */}
  <div className="bg-bg-card rounded-2xl border border-border-primary p-6">
    {/* 控制栏 */}
    <div className="flex justify-between items-center mb-6">
      {/* 左侧：Active/Closed 切换 */}
      <div className="flex gap-2">
        <StatusButton active={true}>Active</StatusButton>
        <StatusButton active={false}>Closed</StatusButton>
      </div>

      {/* 中间：搜索框 */}
      <div className="flex-1 max-w-md mx-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
          <input
            type="text"
            placeholder="Search positions"
            className="w-full bg-bg-secondary border border-border-primary rounded-lg pl-10 pr-4 py-2 text-text-primary text-sm placeholder:text-text-tertiary focus:outline-none focus:border-border-secondary"
          />
        </div>
      </div>

      {/* 右侧：排序按钮 */}
      <button className="flex items-center gap-2 bg-bg-secondary hover:bg-bg-secondary/80 text-text-primary px-4 py-2 rounded-lg transition-colors">
        <ArrowUpDown className="w-4 h-4" />
        <span className="text-sm font-semibold">Value</span>
      </button>
    </div>

    {/* 表格区域 */}
    <div>
      {/* 表头 */}
      <div className="grid grid-cols-4 gap-4 pb-3 mb-4 border-b border-border-primary">
        <div className="text-text-tertiary text-xs font-semibold uppercase">Market</div>
        <div className="text-text-tertiary text-xs font-semibold uppercase">AVG</div>
        <div className="text-text-tertiary text-xs font-semibold uppercase">Current</div>
        <div className="text-text-tertiary text-xs font-semibold uppercase text-right">Value</div>
      </div>

      {/* 空状态 */}
      <div className="py-16 text-center">
        <p className="text-text-secondary text-sm">No positions found</p>
      </div>
    </div>
  </div>
</div>
```

#### 子组件：TabButton
```tsx
<button
  className={`relative text-sm font-semibold pb-2 transition-colors ${
    active
      ? 'text-text-primary'
      : 'text-text-secondary hover:text-text-primary'
  }`}
>
  {children}
  {active && (
    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-long rounded-full" />
  )}
</button>
```

#### 子组件：StatusButton
```tsx
<button
  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
    active
      ? 'bg-bg-secondary text-text-primary'
      : 'bg-transparent text-text-secondary hover:bg-bg-secondary/50'
  }`}
>
  {children}
</button>
```

#### 样式规范
- **标签栏**: 使用 `gap-8` 间距
- **激活标签**: 底部橙色下划线 (`bg-long`)
- **Active/Closed 按钮**: 激活时使用 `bg-bg-secondary`
- **搜索框**: `bg-bg-secondary`, `border border-border-primary`
- **搜索图标**: `text-text-tertiary`, 左侧内边距 `pl-10`
- **排序按钮**: `bg-bg-secondary`, 悬停效果
- **表头**: `text-text-tertiary`, `text-xs`, `uppercase`, `font-semibold`
- **空状态**: 垂直内边距 `py-16`, 居中显示

---

## 响应式设计

### 桌面端 (lg 及以上)
```tsx
// 双栏布局
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
```

### 移动端
```tsx
// 单列布局，卡片堆叠
<div className="grid grid-cols-1 gap-6">
```

### 搜索框响应式
```tsx
// 移动端隐藏搜索框，使用搜索图标按钮
<div className="hidden md:flex flex-1 max-w-md">
  {/* 搜索框 */}
</div>
<button className="md:hidden">
  <Search className="w-5 h-5" />
</button>
```

---

## 数据状态

### 空状态
- **无仓位**: 显示 "No positions found" 提示
- **无数据**: 图表显示渐变背景占位符

### 有数据状态
- **仓位列表**: 使用表格展示 MARKET, AVG, CURRENT, VALUE
- **图表**: 显示实际盈亏曲线

---

## 交互行为

### Connect 按钮
- 点击后可能切换为 "Connected" 或 "Following" 状态
- 使用 `bg-short` → `bg-new` (紫色 → 绿色)

### Withdraw 按钮动态样式
根据用户的 Positions Value 自动切换样式：

**有余额时** (`positionsValue > $0`):
```tsx
className="bg-short hover:bg-short-hover text-white"
```
- 使用 Short 按钮的紫色配色
- 白色文字，醒目的提现提示

**无余额时** (`positionsValue = $0`):
```tsx
className="bg-bg-secondary hover:bg-bg-secondary/80 border border-border-primary text-text-primary"
```
- 使用次级按钮样式
- 深色背景，低调展示

**实现逻辑**:
```tsx
const hasBalance = () => {
  const numericValue = parseFloat(positionsValue.replace(/[$,]/g, ''))
  return !isNaN(numericValue) && numericValue > 0
}
```
- 移除 `$` 和 `,` 符号
- 转换为数字并判断是否大于 0
- 支持任意货币格式（如 "$1,240.50"）

### 时间筛选
- 点击切换激活状态
- 激活按钮使用 `bg-long text-black`
- 触发图表数据更新

### Active/Closed 切换
- 切换显示活跃仓位或已关闭仓位
- 激活按钮背景 `bg-bg-secondary`

### 排序按钮
- 点击切换升序/降序
- 图标旋转动画 (可选)

---

## 图标使用

```tsx
import { X, Layers, Search, ArrowUpDown } from 'lucide-react'
```

- **X**: Connect 按钮中的关闭图标
- **Layers**: Polymarket 标识图标
- **Search**: 搜索框图标
- **ArrowUpDown**: 排序按钮图标

---

## 配色方案

### 主要颜色
- **卡片背景**: `bg-bg-card` (#1f1f1f)
- **次级背景**: `bg-bg-secondary` (#1a1a1a)
- **边框**: `border-border-primary`
- **主文本**: `text-text-primary` (#ffffff)
- **次要文本**: `text-text-secondary` (#9ca3af)
- **第三级文本**: `text-text-tertiary` (#6b7280)

### 按钮颜色
- **Connect 按钮**: `bg-short` → `bg-short-hover` (紫色)
- **激活状态**: `bg-long` (橙色)
- **指示器**: `bg-new` (绿色圆点)

---

## 实现优先级

### Phase 1: 基础布局
1. UserProfileCard 组件
2. ProfitLossChart 组件 (无图表，仅占位)
3. PositionsActivitySection 组件

### Phase 2: 交互功能
1. Positions/Activity 标签切换
2. Active/Closed 状态切换
3. 搜索功能
4. 排序功能

### Phase 3: 数据集成
1. 用户数据 API 集成
2. 图表库集成 (Chart.js / Recharts)
3. 实时数据更新

---

## 技术栈

- **框架**: Next.js 16
- **样式**: Tailwind CSS v4
- **图标**: Lucide React
- **图表库**: 待定 (推荐 Recharts 或 Chart.js)

---

## 备注

- 所有组件需遵循 CLAUDE.md 中的设计规范
- 确保响应式设计在移动端和桌面端的良好体验
- 图表区域需要后续集成专业图表库
- 用户头像可以使用渐变色占位符或实际头像 URL
- 所有交互状态需要平滑的过渡动画 (`transition-colors`)
