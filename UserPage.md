# UserPage - 用户个人界面设计规范

## 实现状态

### ✅ 已完成
- **UserProfileCard** 组件 (`app/components/user/UserProfileCard.tsx`)
  - 包含 Deposit 和 Withdraw 按钮
  - Connect 按钮固定在右上角，使用推特 (X) SVG 图标
  - Withdraw 按钮动态配色
  - **使用 Flexbox 布局，Positions Value 和按钮固定在卡片底部** (2026-01-23 更新)
  - **Connect 按钮图标更换为推特官方 SVG** (2026-01-23 更新)
- **UserStatItem** 组件 (`app/components/user/UserStatItem.tsx`)
- **ProfitLossChart** 组件 (`app/components/user/ProfitLossChart.tsx`)
  - 显示盈亏金额和时间段
  - 时间筛选按钮（1D, 1W, 1M, ALL）
  - Polyplot 标识
  - 图表占位区域
  - **优化卡片尺寸，缩小内边距、字体和图表高度** (2026-01-23 更新)
- **TimeFilterButton** 组件 (`app/components/user/TimeFilterButton.tsx`)
- **PositionsActivitySection** 组件 (`app/components/user/PositionsActivitySection.tsx`)
  - Positions/Activity/Created 标签切换
  - Active/Closed 状态切换（Positions 标签）
  - 搜索功能（所有标签）
  - 排序按钮（Positions: Value, Created: Date）
  - 表格布局和空状态 (2026-01-23 新增)
  - **Created 标签页：显示用户创建的 Narratives** (2026-01-23 新增)
- **页面路由** (`app/[userID]/page.tsx` - 服务器组件)
- **UserPageClient** 组件 (`app/[userID]/UserPageClient.tsx` - 客户端组件)
  - 处理所有交互事件（Deposit, Withdraw, Connect）

### ⏳ 待实现
- PositionsActivitySection 数据集成（仓位列表、活动历史）
- 数据 API 集成
- 图表库集成（Recharts 或 Chart.js）

---

## 架构说明

### 服务器组件与客户端组件分离

为了符合 Next.js 15+ 的最佳实践，页面采用了服务器组件与客户端组件分离的架构：

#### 服务器组件 (`app/[userID]/page.tsx`)
- 负责数据获取（从 API 或数据库）
- 处理路由参数（userID 从 URL 中提取）
- 将纯数据传递给客户端组件
- 不包含任何事件处理器或交互逻辑

```tsx
export default async function UserPage({ params }: UserPageProps) {
  const { userID } = await params
  const userData = await fetchUserData(userID) // 服务器端数据获取
  return <UserPageClient userData={userData} />
}
```

**URL 重写机制**: 通过 `next.config.ts` 中的 rewrites 配置，将用户友好的 `/@username` URL 重写到实际的文件系统路由 `/[userID]`：

```typescript
// next.config.ts
async rewrites() {
  return [
    {
      source: '/@:userID',
      destination: '/:userID',
    },
  ];
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

### 示例 3: ProfitLossChart 组件
```tsx
import { ProfitLossChart } from '@/app/components/user'

// 盈利状态
<ProfitLossChart
  profitLoss="$1,240.50"
  period="Past Month"
  isPositive={true}  // 绿色指示器
/>

// 亏损状态
<ProfitLossChart
  profitLoss="-$520.00"
  period="Past Week"
  isPositive={false}  // 红色指示器
/>
```

访问示例页面：`http://localhost:3000/@crazyjjjj`

---

## 页面路由
- **URL 格式**: `/@[userID]`（通过 rewrites 实现）
- **示例**: `/@crazyjjjj`
- **路由文件位置**: `app/[userID]/page.tsx`
- **实现方式**: Next.js rewrites 将 `/@:userID` 重写到 `/:userID`

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
<div className="bg-bg-card rounded-2xl border border-border-primary p-6 relative flex flex-col">
  {/* Connect 按钮 - 固定在右上角 */}
  <button className="absolute top-6 right-6 bg-short hover:bg-short-hover text-white text-sm font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors">
    Connect
    <TwitterIcon className="w-3.5 h-3.5" />
  </button>

  {/* 用户信息区域 */}
  <div className="flex items-start gap-4 pr-28">
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

  {/* 底部区域：统计数据和操作按钮 - 固定在底部 */}
  <div className="flex items-end gap-4 pt-6 border-t border-border-primary mt-auto">
    {/* Positions Value 统计 */}
    <div className="flex-shrink-0">
      <UserStatItem label="Positions Value" value="$0.00" />
    </div>

    {/* Deposit 按钮 */}
    <button className="flex-1 bg-long hover:bg-long-hover text-black font-semibold px-6 py-3 rounded-lg transition-colors">
      Deposit
    </button>

    {/* Withdraw 按钮 */}
    <button className="flex-1 bg-bg-secondary hover:bg-bg-secondary/80 border border-border-primary text-text-primary font-semibold px-6 py-3 rounded-lg transition-colors">
      Withdraw
    </button>
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
- **卡片容器**: `bg-bg-card`, `rounded-2xl`, `border border-border-primary`, `p-6`, `relative`, `flex flex-col`
  - **布局**: 使用 Flexbox 垂直布局，确保底部区域固定在卡片底部
- **Connect 按钮**:
  - 定位: `absolute top-6 right-6` (固定在卡片右上角)
  - 颜色: `bg-short` 和 `bg-short-hover` (未连接) / `bg-new` 和 `hover:bg-emerald-600` (已连接)
  - 尺寸: `text-sm`, `px-3 py-1.5`
- **用户信息区域**: `pr-28` (右侧内边距避免与按钮重叠)
- **头像**: 固定尺寸 `w-16 h-16`，渐变色从紫色到橙色到黄色
- **用户名**: `text-2xl`, `font-bold`, `text-text-primary`, `truncate`
- **元信息**: `text-text-secondary`, `text-sm`
- **底部区域**: `mt-auto` (自动推送到底部) + Flexbox 横向布局 (`flex items-end gap-4`)
  - Positions Value: `flex-shrink-0` (固定宽度，不收缩)
  - 按钮: `flex-1` (平分剩余空间)
- **统计标签**: `text-text-secondary`, `text-xs`
- **统计数值**: `text-text-primary`, `text-xl`, `font-bold`
- **Deposit 按钮**:
  - 颜色: `bg-long hover:bg-long-hover text-black` (橙色背景，黑色文字)
  - 尺寸: `px-6 py-3`, `flex-1`
- **Withdraw 按钮**:
  - 动态配色（根据余额状态）
    - 有余额 (>$0): `bg-short hover:bg-short-hover text-white` (紫色，Short 按钮配色)
    - 无余额 (=$0): `bg-bg-secondary hover:bg-bg-secondary/80 border border-border-primary text-text-primary` (深色次级按钮)
  - 尺寸: `px-6 py-3`, `flex-1`

---

### 2. ProfitLossChart 组件

显示用户的盈亏图表和数据。

#### Props 定义

```tsx
interface ProfitLossChartProps {
  profitLoss: string       // 盈亏金额（如 "$0.00" 或 "$1,240.50"）
  period?: string          // 时间段（默认 "Past Month"）
  isPositive?: boolean     // 是否盈利（默认 true）- 控制指示器颜色
}
```

#### 组件文件位置
- 主组件: `app/components/user/ProfitLossChart.tsx`
- 时间筛选按钮: `app/components/user/TimeFilterButton.tsx`
- 导出文件: `app/components/user/index.ts`

#### 功能特性
- **动态指示器颜色**: 根据 `isPositive` 属性显示绿色（盈利）或红色（亏损）圆点
- **时间筛选**: 支持 1D, 1W, 1M, ALL 四种时间范围切换
- **状态管理**: 使用 `useState` 管理当前选中的时间筛选器
- **Polyplot 品牌标识**: 显示 Polyplot 图标和文字
- **图表占位**: 预留图表区域，便于后续集成 Recharts 或 Chart.js

#### 组件结构
```tsx
<div className="bg-bg-card rounded-2xl border border-border-primary p-4">
  {/* 头部区域 */}
  <div className="flex justify-between items-start mb-4">
    {/* 左侧：标题和数据 */}
    <div>
      <div className="flex items-center gap-2 mb-1">
        <div className="w-2 h-2 bg-new rounded-full" />
        <h2 className="text-text-primary text-sm font-semibold">Profit/Loss</h2>
      </div>
      <p className="text-text-primary text-3xl font-bold mb-1">$0.00</p>
      <p className="text-text-secondary text-xs">Past Month</p>
    </div>

    {/* 右侧：时间筛选和 Polyplot 标识 */}
    <div className="flex flex-col items-end gap-2">
      {/* 时间筛选按钮组 */}
      <div className="flex gap-1.5">
        <TimeFilterButton active={false}>1D</TimeFilterButton>
        <TimeFilterButton active={false}>1W</TimeFilterButton>
        <TimeFilterButton active={true}>1M</TimeFilterButton>
        <TimeFilterButton active={false}>ALL</TimeFilterButton>
      </div>

      {/* Polyplot 标识 */}
      <div className="flex items-center gap-1.5 text-text-tertiary">
        <Layers className="w-3.5 h-3.5" />
        <span className="text-xs">Polyplot</span>
      </div>
    </div>
  </div>

  {/* 图表区域 */}
  <div className="h-36 bg-gradient-to-b from-transparent via-bg-secondary to-bg-secondary rounded-lg">
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
- **卡片容器**: `bg-bg-card`, `rounded-2xl`, `border border-border-primary`, `p-4` (优化后尺寸)
- **头部区域**: `mb-4` (缩小间距)
- **标题指示器**: `w-2 h-2 bg-new rounded-full` (绿色圆点)
- **标题和数据间距**: `mb-1` (缩小间距)
- **金额显示**: `text-3xl`, `font-bold`, `text-text-primary` (缩小字体)
- **时间段文字**: `text-xs`, `text-text-secondary` (缩小字体)
- **时间筛选按钮 (激活)**: `bg-long`, `text-black`
- **时间筛选按钮 (未激活)**: `bg-bg-secondary`, `text-text-secondary`
- **时间筛选按钮组**: `gap-1.5` (缩小间距)
- **右侧区域间距**: `gap-2` (缩小间距)
- **Polyplot 标识**: `text-text-tertiary`, `text-xs` (缩小字体)
- **Polyplot 图标**: `w-3.5 h-3.5` (缩小尺寸)
- **Polyplot 间距**: `gap-1.5` (缩小间距)
- **图表容器**: `h-36`, 渐变背景从透明到 `bg-secondary` (缩小高度)

---

### 3. PositionsActivitySection 组件

显示用户的仓位和活动信息。

#### Props 定义

```tsx
interface PositionsActivitySectionProps {
  // 可以后续添加数据 props
  // positions?: Position[]
  // activities?: Activity[]
}
```

#### 组件文件位置
- 主组件: `app/components/user/PositionsActivitySection.tsx`
- 导出文件: `app/components/user/index.ts`

#### 功能特性
- **三标签切换**: Positions、Activity 和 Created 标签页切换
- **状态筛选**: Active/Closed 仓位状态切换（仅 Positions 标签）
- **搜索功能**: 实时搜索仓位或 narratives
  - Positions: "Search positions"
  - Created: "Search narratives"
- **排序功能**:
  - Positions 标签: 按 Value 排序
  - Created 标签: 按 Date 排序
- **响应式布局**: 自适应表格和网格布局
- **空状态展示**: 无数据时的友好提示
  - Positions: "No positions found"
  - Activity: "Activity - Coming Soon"
  - Created: "No narratives created yet"

#### 组件结构
```tsx
<div>
  {/* Positions/Activity/Created 标签栏 */}
  <div className="flex gap-8 mb-6 border-b border-border-primary">
    <TabButton active={activeTab === 'positions'} onClick={() => setActiveTab('positions')}>
      Positions
    </TabButton>
    <TabButton active={activeTab === 'activity'} onClick={() => setActiveTab('activity')}>
      Activity
    </TabButton>
    <TabButton active={activeTab === 'created'} onClick={() => setActiveTab('created')}>
      Created
    </TabButton>
  </div>

  {/* Positions 内容区 */}
  {activeTab === 'positions' && (
    <div className="bg-bg-card rounded-2xl border border-border-primary p-6">
      {/* 控制栏 */}
      <div className="flex justify-between items-center mb-6 gap-4">
        {/* 左侧：Active/Closed 切换 */}
        <div className="flex gap-2">
          <StatusButton active={activeStatus === 'active'} onClick={() => setActiveStatus('active')}>
            Active
          </StatusButton>
          <StatusButton active={activeStatus === 'closed'} onClick={() => setActiveStatus('closed')}>
            Closed
          </StatusButton>
        </div>

        {/* 中间：搜索框 */}
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
            <input
              type="text"
              placeholder="Search positions"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-bg-secondary border border-border-primary rounded-lg pl-10 pr-4 py-2.5 text-text-primary text-sm placeholder:text-text-tertiary focus:outline-none focus:border-border-secondary transition-colors"
            />
          </div>
        </div>

        {/* 右侧：排序按钮 */}
        <button className="flex items-center gap-2 bg-bg-secondary hover:bg-bg-secondary/80 text-text-primary px-4 py-2.5 rounded-lg transition-colors border border-border-primary">
          <ArrowUpDown className="w-4 h-4" />
          <span className="text-sm font-semibold">Value</span>
        </button>
      </div>

      {/* 表格区域 */}
      <div>
        {/* 表头 */}
        <div className="grid grid-cols-4 gap-4 pb-3 mb-4 border-b border-border-primary">
          <div className="text-text-tertiary text-xs font-semibold uppercase tracking-wide">Market</div>
          <div className="text-text-tertiary text-xs font-semibold uppercase tracking-wide">Avg</div>
          <div className="text-text-tertiary text-xs font-semibold uppercase tracking-wide">Current</div>
          <div className="text-text-tertiary text-xs font-semibold uppercase tracking-wide text-right flex items-center justify-end gap-1">
            Value
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 11.5l-4-4h8l-4 4z" />
            </svg>
          </div>
        </div>

        {/* 空状态 */}
        <div className="py-20 text-center">
          <p className="text-text-secondary text-sm">No positions found</p>
        </div>
      </div>
    </div>
  )}

  {/* Activity 内容区 */}
  {activeTab === 'activity' && (
    <div className="bg-bg-card rounded-2xl border border-border-primary p-6">
      <div className="py-20 text-center">
        <p className="text-text-secondary text-sm">Activity - Coming Soon</p>
      </div>
    </div>
  )}

  {/* Created 内容区 - 显示用户创建的 Narratives */}
  {activeTab === 'created' && (
    <div className="bg-bg-card rounded-2xl border border-border-primary p-6">
      {/* 控制栏 */}
      <div className="flex justify-between items-center mb-6 gap-4">
        {/* 左侧：搜索框 */}
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
            <input
              type="text"
              placeholder="Search narratives"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-bg-secondary border border-border-primary rounded-lg pl-10 pr-4 py-2.5 text-text-primary text-sm placeholder:text-text-tertiary focus:outline-none focus:border-border-secondary transition-colors"
            />
          </div>
        </div>

        {/* 右侧：排序按钮 */}
        <button className="flex items-center gap-2 bg-bg-secondary hover:bg-bg-secondary/80 text-text-primary px-4 py-2.5 rounded-lg transition-colors border border-border-primary">
          <ArrowUpDown className="w-4 h-4" />
          <span className="text-sm font-semibold">Date</span>
        </button>
      </div>

      {/* Narratives 展示区域 */}
      <div>
        {/* 空状态 */}
        <div className="py-20 text-center">
          <p className="text-text-secondary text-sm">No narratives created yet</p>
        </div>

        {/* 待实现：Narratives 网格 */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {narratives.map((narrative) => (
            <NarrativeCard key={narrative.id} {...narrative} />
          ))}
        </div> */}
      </div>
    </div>
  )}
</div>
```

#### 子组件：TabButton
```tsx
<button
  onClick={onClick}
  className={`relative text-lg font-semibold pb-3 transition-colors ${
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
  onClick={onClick}
  className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
    active
      ? 'bg-bg-secondary text-text-primary'
      : 'bg-transparent text-text-secondary hover:bg-bg-secondary/50'
  }`}
>
  {children}
</button>
```

#### 样式规范
- **标签栏**:
  - 三个标签: Positions, Activity, Created
  - 使用 `gap-8` 间距
  - 底部边框 `border-b border-border-primary`
  - 标签字体 `text-lg font-semibold`
  - 标签底部内边距 `pb-3`
- **激活标签**:
  - 底部橙色下划线 (`bg-long`)
  - 高度 `h-0.5`
- **内容区卡片**: `bg-bg-card`, `rounded-2xl`, `border border-border-primary`, `p-6`
- **控制栏**:
  - Flexbox 布局 `flex justify-between items-center mb-6 gap-4`
  - Active/Closed 按钮：`px-5 py-2.5`
  - 搜索框最大宽度：`max-w-2xl`
- **Active/Closed 按钮**:
  - 激活时：`bg-bg-secondary text-text-primary`
  - 未激活：`bg-transparent text-text-secondary hover:bg-bg-secondary/50`
- **搜索框**:
  - 背景：`bg-bg-secondary`
  - 边框：`border border-border-primary`
  - 聚焦边框：`focus:border-border-secondary`
  - 内边距：`pl-10 pr-4 py-2.5`
- **搜索图标**: `text-text-tertiary`, `w-4 h-4`, 左侧定位 `left-3`
- **排序按钮**:
  - 背景：`bg-bg-secondary hover:bg-bg-secondary/80`
  - 边框：`border border-border-primary`
  - 内边距：`px-4 py-2.5`
  - Positions 标签: "Value" 排序
  - Created 标签: "Date" 排序
- **表头**:
  - 4列网格布局：`grid grid-cols-4 gap-4`
  - 文字：`text-text-tertiary`, `text-xs`, `uppercase`, `font-semibold`, `tracking-wide`
  - 边框：`border-b border-border-primary`
  - Value 列右对齐并包含下拉箭头图标
- **空状态**:
  - 垂直内边距：`py-20`
  - 文字居中：`text-center`
  - 文字样式：`text-text-secondary text-sm`
  - Positions: "No positions found"
  - Activity: "Activity - Coming Soon"
  - Created: "No narratives created yet"
- **Created 标签页特性**:
  - 搜索框占位符：`"Search narratives"`
  - 排序按钮：按 Date 排序
  - 预留网格布局：`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`
  - 用于展示 NarrativeCard 组件

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
import { Layers, Search, ArrowUpDown } from 'lucide-react'
```

- **TwitterIcon**: Connect 按钮中的推特 (X) 官方 SVG 图标（自定义组件）
- **Layers**: Polyplot 标识图标
- **Search**: 搜索框图标
- **ArrowUpDown**: 排序按钮图标

### 推特图标组件
```tsx
const TwitterIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)
```

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
