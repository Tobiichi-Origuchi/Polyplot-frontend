# Portfolio 详情页 - 设计规范

## 页面概述

Portfolio 页面是用户管理其预测市场仓位的核心页面，包含资产总览、活跃仓位管理和已结算仓位记录。

## 页面结构

```
Portfolio Page
├── Header Section (页面标题区域)
├── Stats Cards Section (统计卡片区域 - 3个卡片)
├── Active Positions Section (活跃仓位区域)
└── Settled Positions Section (已结算仓位区域)
```

---

## 1. Header Section - 页面标题区域

### 布局结构
```tsx
<div className="mb-8">
  <h1 className="text-text-primary text-4xl font-bold mb-3">Portfolio</h1>
  <p className="text-text-secondary text-base">
    Track your positions on future events. Manage your risk and redeem your winnings from settled markets.
  </p>
</div>
```

### 设计规范
- **标题**: 大号字体 (`text-4xl`), 加粗 (`font-bold`), 白色文本
- **描述文本**: 中号字体 (`text-base`), 次要文本颜色
- **间距**: 标题与描述间距 `mb-3`, 整体区域底部间距 `mb-8`

---

## 2. Stats Cards Section - 统计卡片区域

### 布局结构
三个卡片横向排列，响应式布局：
```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
  {/* Card 1: Total Value */}
  {/* Card 2: Available USDC */}
  {/* Card 3: Total P&L */}
</div>
```

### Card 1: Total Value (总价值卡片)

#### 视觉特征
- 背景图标: 大号 "B" 字母图标（半透明，装饰性）
- 主要数据: `$5,682.34`
- 增长指标: `+12.5% this week` (绿色，带向上箭头)

#### 组件结构
```tsx
<div className="bg-bg-card rounded-2xl p-6 border border-border-primary relative overflow-hidden">
  {/* 装饰性背景图标 */}
  <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-5">
    <div className="text-9xl font-bold text-text-primary">B</div>
  </div>

  {/* 内容 */}
  <div className="relative z-10">
    <p className="text-text-secondary text-sm mb-2">Total Value</p>
    <h2 className="text-text-primary text-4xl font-bold mb-2">$5,682.34</h2>
    <div className="flex items-center gap-1 text-new text-sm font-semibold">
      <TrendingUp className="w-4 h-4" />
      <span>+12.5% this week</span>
    </div>
  </div>
</div>
```

#### 设计规范
- **标签**: `text-text-secondary`, `text-sm`
- **金额**: `text-4xl`, `font-bold`, `text-text-primary`
- **增长指标**: `text-new` (绿色), 带 `TrendingUp` 图标
- **背景装饰**: 大号字母，绝对定位，`opacity-5`

### Card 2: Available USDC (可用资金卡片)

#### 视觉特征
- 背景图标: 美元符号 "$" (半透明)
- 主要数据: `$1,240.50` (使用货币金色 `text-currency`)
- 状态指示: `Ready to trade` (灰色圆点 + 文本)

#### 组件结构
```tsx
<div className="bg-bg-card rounded-2xl p-6 border border-border-primary relative overflow-hidden">
  {/* 装饰性背景图标 */}
  <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-5">
    <div className="text-9xl font-bold text-text-primary">$</div>
  </div>

  {/* 内容 */}
  <div className="relative z-10">
    <p className="text-text-secondary text-sm mb-2">Available USDC</p>
    <h2 className="text-currency text-4xl font-bold mb-2">$1,240.50</h2>
    <div className="flex items-center gap-2 text-text-tertiary text-sm">
      <div className="w-2 h-2 rounded-full bg-text-tertiary"></div>
      <span>Ready to trade</span>
    </div>
  </div>
</div>
```

#### 设计规范
- **金额颜色**: `text-currency` (金色 #fbbf24)
- **状态指示器**: 灰色小圆点 (`w-2 h-2 rounded-full`)
- **状态文本**: `text-text-tertiary`

### Card 3: Total P&L (总盈亏卡片)

#### 视觉特征
- 背景图标: 向上趋势线图案 (半透明)
- 主要数据: `+$441.84` (绿色，带 "+" 号)
- 副标签: `All Time Profit`

#### 组件结构
```tsx
<div className="bg-bg-card rounded-2xl p-6 border border-border-primary relative overflow-hidden">
  {/* 装饰性背景图标 - 趋势线 */}
  <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-5">
    <TrendingUp className="w-32 h-32 text-text-primary" />
  </div>

  {/* 内容 */}
  <div className="relative z-10">
    <p className="text-text-secondary text-sm mb-2">Total P&L</p>
    <h2 className="text-new text-4xl font-bold mb-2">+$441.84</h2>
    <p className="text-text-secondary text-sm">All Time Profit</p>
  </div>
</div>
```

#### 设计规范
- **盈利金额**: `text-new` (绿色), 带 "+" 前缀
- **亏损金额**: 使用 `text-left` (红色), 带 "-" 前缀
- **副标签**: `text-text-secondary`

---

## 3. Active Positions Section - 活跃仓位区域

### Section Header

```tsx
<div className="flex items-center gap-2 mb-6">
  <Zap className="w-6 h-6 text-long" />
  <h2 className="text-text-primary text-2xl font-bold">Active Positions</h2>
  <span className="bg-bg-secondary text-text-secondary text-sm font-semibold px-2.5 py-0.5 rounded-full">
    3
  </span>
</div>
```

#### 设计规范
- **闪电图标**: `Zap` from Lucide, 橙色 (`text-long`)
- **标题**: `text-2xl`, `font-bold`
- **数量徽章**: 圆角胶囊形状，深灰色背景

### Table Structure

#### 表头
```tsx
<div className="grid grid-cols-[2fr_1.5fr_1fr_1fr_0.8fr] gap-4 px-6 py-3 bg-bg-secondary/50 rounded-t-xl">
  <div className="text-text-tertiary text-xs font-semibold uppercase">Market</div>
  <div className="text-text-tertiary text-xs font-semibold uppercase">Position</div>
  <div className="text-text-tertiary text-xs font-semibold uppercase">Avg. Price</div>
  <div className="text-text-tertiary text-xs font-semibold uppercase">Unrealized P&L</div>
  <div className="text-text-tertiary text-xs font-semibold uppercase">Action</div>
</div>
```

#### 表头设计规范
- **列宽比例**: `2fr : 1.5fr : 1fr : 1fr : 0.8fr`
- **文本**: 大写字母, `text-xs`, `font-semibold`, 灰色
- **背景**: 半透明深灰色 (`bg-bg-secondary/50`)

### Position Row Component (仓位行组件)

#### Row 1: Bitcoin Halving Effect (LONG Position)

```tsx
<div className="grid grid-cols-[2fr_1.5fr_1fr_1fr_0.8fr] gap-4 px-6 py-4 bg-bg-card border-b border-border-primary items-center">
  {/* Market 列 */}
  <div className="flex items-center gap-3">
    <div className="w-12 h-12 rounded-full bg-bg-secondary border border-border-primary flex items-center justify-center">
      <Bitcoin className="w-6 h-6 text-long" />
    </div>
    <div className="flex flex-col">
      <h3 className="text-text-primary font-semibold text-base">Bitcoin Halving Effect</h3>
      <p className="text-text-tertiary text-sm">Will Bitcoin exceed $75k before halving?</p>
    </div>
  </div>

  {/* Position 列 */}
  <div className="flex items-center gap-2">
    <span className="bg-long px-3 py-1 rounded-md text-white text-sm font-semibold flex items-center gap-1">
      <TrendingUp className="w-4 h-4" />
      LONG
    </span>
    <span className="text-text-secondary text-sm">150 Shares</span>
  </div>

  {/* Avg. Price 列 */}
  <div className="flex flex-col">
    <span className="text-text-primary font-semibold">$0.42</span>
    <span className="text-text-tertiary text-sm">Cur: $0.65</span>
  </div>

  {/* Unrealized P&L 列 */}
  <div className="flex flex-col">
    <span className="text-new font-semibold text-base">+$34.50</span>
    <span className="text-new text-sm">+54.7%</span>
  </div>

  {/* Action 列 */}
  <button className="bg-long hover:bg-long-hover text-white font-semibold px-6 py-2 rounded-lg transition-colors">
    Sell
  </button>
</div>
```

#### Row 2: GPT-5 Release Date (SHORT Position)

```tsx
{/* Position 列 - SHORT 变体 */}
<div className="flex items-center gap-2">
  <span className="bg-short px-3 py-1 rounded-md text-white text-sm font-semibold flex items-center gap-1">
    <TrendingDown className="w-4 h-4" />
    SHORT
  </span>
  <span className="text-text-secondary text-sm">500 Shares</span>
</div>
```

#### Row 3: Taylor Swift Album (LONG Position with Loss)

```tsx
{/* Unrealized P&L 列 - 亏损状态 */}
<div className="flex flex-col">
  <span className="text-left font-semibold text-base">-$3.50</span>
  <span className="text-left text-sm">-8.5%</span>
</div>
```

### Position Badge 设计规范

#### LONG Badge
```tsx
className="bg-long px-3 py-1 rounded-md text-white text-sm font-semibold flex items-center gap-1"
// 图标: TrendingUp (向上箭头)
```

#### SHORT Badge
```tsx
className="bg-short px-3 py-1 rounded-md text-white text-sm font-semibold flex items-center gap-1"
// 图标: TrendingDown (向下箭头)
```

### P&L 显示规范

#### 盈利显示
- **金额**: `text-new` (绿色), 带 "+" 前缀
- **百分比**: `text-new`, 带 "+" 前缀

#### 亏损显示
- **金额**: `text-left` (红色), 带 "-" 前缀
- **百分比**: `text-left`, 带 "-" 前缀

---

## 4. Settled Positions Section - 已结算仓位区域

### Section Header

```tsx
<div className="flex items-center gap-2 mb-6 mt-12">
  <Flag className="w-6 h-6 text-text-secondary" />
  <h2 className="text-text-primary text-2xl font-bold">Settled Positions</h2>
  <span className="bg-bg-secondary text-text-secondary text-sm font-semibold px-2.5 py-0.5 rounded-full">
    2
  </span>
</div>
```

#### 设计规范
- **旗帜图标**: `Flag` from Lucide, 灰色 (`text-text-secondary`)
- **区域间距**: 顶部 `mt-12`

### Table Structure

#### 表头
```tsx
<div className="grid grid-cols-[2fr_1fr_1fr_1fr_0.8fr] gap-4 px-6 py-3 bg-bg-secondary/50 rounded-t-xl">
  <div className="text-text-tertiary text-xs font-semibold uppercase">Market</div>
  <div className="text-text-tertiary text-xs font-semibold uppercase">Your Pick</div>
  <div className="text-text-tertiary text-xs font-semibold uppercase">Outcome</div>
  <div className="text-text-tertiary text-xs font-semibold uppercase">Final Payout</div>
  <div className="text-text-tertiary text-xs font-semibold uppercase">Status</div>
</div>
```

### Settled Position Row Component

#### Row 1: Super Bowl LVIII Winner (赢家 - 可提现)

```tsx
<div className="grid grid-cols-[2fr_1fr_1fr_1fr_0.8fr] gap-4 px-6 py-4 bg-bg-card border-b border-border-primary items-center border-l-4 border-l-new">
  {/* Market 列 */}
  <div className="flex items-center gap-3">
    <div className="w-12 h-12 rounded-full bg-bg-secondary border border-border-primary flex items-center justify-center">
      {/* 橄榄球图标 */}
    </div>
    <div className="flex flex-col">
      <h3 className="text-text-primary font-semibold text-base">Super Bowl LVIII Winner</h3>
      <p className="text-text-tertiary text-sm">Did the Chiefs win back-to-back?</p>
    </div>
  </div>

  {/* Your Pick 列 */}
  <div>
    <span className="text-text-secondary text-sm">Yes (Long)</span>
  </div>

  {/* Outcome 列 */}
  <div className="flex items-center gap-2">
    <CheckCircle className="w-5 h-5 text-new" />
    <span className="text-new font-semibold text-base">YES</span>
  </div>

  {/* Final Payout 列 */}
  <div className="flex flex-col">
    <span className="text-text-primary font-semibold text-base">$210.00</span>
    <span className="text-new text-sm">Winner</span>
  </div>

  {/* Status 列 */}
  <button className="bg-new hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
    <Download className="w-4 h-4" />
    Redeem
  </button>
</div>
```

#### 设计规范 - 赢家状态
- **左侧边框**: `border-l-4 border-l-new` (绿色强调边框)
- **结果图标**: `CheckCircle` (绿色打勾)
- **结果文本**: `text-new` (绿色)
- **状态标签**: "Winner" (绿色)
- **操作按钮**: `bg-new` (绿色背景), 带 `Download` 图标, 文本 "Redeem"

#### Row 2: Oscars Best Picture 2024 (输家 - 已结算)

```tsx
<div className="grid grid-cols-[2fr_1fr_1fr_1fr_0.8fr] gap-4 px-6 py-4 bg-bg-card items-center">
  {/* Market 列 */}
  <div className="flex items-center gap-3">
    <div className="w-12 h-12 rounded-full bg-bg-secondary border border-border-primary flex items-center justify-center">
      {/* 奥斯卡奖杯图标 */}
    </div>
    <div className="flex flex-col">
      <h3 className="text-text-primary font-semibold text-base">Oscars Best Picture 2024</h3>
      <p className="text-text-tertiary text-sm">Will Barbie win Best Picture?</p>
    </div>
  </div>

  {/* Your Pick 列 */}
  <div>
    <span className="text-text-secondary text-sm">Yes (Long)</span>
  </div>

  {/* Outcome 列 */}
  <div className="flex items-center gap-2">
    <XCircle className="w-5 h-5 text-left" />
    <span className="text-left font-semibold text-base">NO</span>
  </div>

  {/* Final Payout 列 */}
  <div className="flex flex-col">
    <span className="text-text-tertiary font-semibold text-base">$0.00</span>
    <span className="text-text-tertiary text-sm">Lost</span>
  </div>

  {/* Status 列 */}
  <button className="bg-bg-secondary text-text-tertiary font-semibold px-6 py-2 rounded-lg cursor-not-allowed" disabled>
    Settled
  </button>
</div>
```

#### 设计规范 - 输家状态
- **无左侧边框**
- **结果图标**: `XCircle` (红色叉号)
- **结果文本**: `text-left` (红色)
- **状态标签**: "Lost" (灰色)
- **操作按钮**: `bg-bg-secondary` (灰色背景), 禁用状态, 文本 "Settled"

---

## 5. 组件拆解计划

### 建议组件层级

```
PortfolioPage/
├── PortfolioHeader (页面标题组件)
├── StatsCardsContainer
│   ├── StatCard (通用统计卡片)
│   │   ├── TotalValueCard
│   │   ├── AvailableBalanceCard
│   │   └── TotalPnLCard
├── ActivePositionsSection
│   ├── SectionHeader (通用区域标题组件)
│   ├── PositionsTable
│   │   ├── TableHeader
│   │   └── ActivePositionRow
│   │       ├── MarketInfo (市场信息列)
│   │       ├── PositionBadge (仓位标识)
│   │       ├── PriceInfo (价格信息列)
│   │       ├── PnLDisplay (盈亏显示列)
│   │       └── ActionButton (操作按钮)
└── SettledPositionsSection
    ├── SectionHeader (复用)
    ├── SettledPositionsTable
    │   ├── TableHeader
    │   └── SettledPositionRow
    │       ├── MarketInfo (复用)
    │       ├── OutcomeIndicator (结果指示器)
    │       ├── PayoutInfo (支付信息)
    │       └── StatusButton (状态按钮)
```

### 可复用组件

#### 1. SectionHeader
- 用于 Active Positions 和 Settled Positions
- Props: `icon`, `title`, `count`

#### 2. MarketInfo
- 用于所有表格行
- Props: `iconSrc`, `title`, `description`

#### 3. PositionBadge
- 显示 LONG/SHORT 标识
- Props: `type: 'long' | 'short'`, `shares: number`

#### 4. PnLDisplay
- 显示盈亏金额和百分比
- Props: `amount: number`, `percentage: number`

---

## 6. 颜色使用总结

| 元素 | 颜色类名 | 用途 |
|------|---------|------|
| LONG 按钮/标识 | `bg-long` | 做多仓位 |
| SHORT 按钮/标识 | `bg-short` | 做空仓位 |
| 盈利金额/百分比 | `text-new` | 正向收益 |
| 亏损金额/百分比 | `text-left` | 负向收益 |
| 货币金额 (USDC) | `text-currency` | 可用余额 |
| Redeem 按钮 | `bg-new` | 可提现状态 |
| Settled 按钮 | `bg-bg-secondary` | 已结算状态 |
| 结果 YES | `text-new` | 正确预测 |
| 结果 NO | `text-left` | 错误预测 |

---

## 7. 响应式设计考虑

### 桌面端 (1024px+)
- Stats Cards: 3列布局 (`grid-cols-3`)
- Table: 使用 grid 布局，固定列宽比例

### 平板端 (768px - 1023px)
- Stats Cards: 3列保持 (`md:grid-cols-3`)
- Table: 可能需要调整列宽比例

### 移动端 (<768px)
- Stats Cards: 单列布局 (`grid-cols-1`)
- Table: 转换为卡片式布局（垂直堆叠信息）

---

## 8. 交互行为

### 按钮悬停状态
- **Sell 按钮**: `hover:bg-long-hover` 或 `hover:bg-short-hover`
- **Redeem 按钮**: `hover:bg-green-600`
- **Settled 按钮**: 禁用，无悬停效果

### 动画效果
- 所有按钮: `transition-colors`
- 数值变化: 可考虑 `transition-all duration-300`

---

## 9. 数据结构建议

### Active Position 数据类型
```typescript
interface ActivePosition {
  id: string
  market: {
    title: string
    description: string
    iconType: string // 'bitcoin' | 'gpt' | 'music' 等
  }
  position: {
    type: 'long' | 'short'
    shares: number
  }
  pricing: {
    avgPrice: number
    currentPrice: number
  }
  pnl: {
    amount: number
    percentage: number
  }
}
```

### Settled Position 数据类型
```typescript
interface SettledPosition {
  id: string
  market: {
    title: string
    description: string
    iconType: string
  }
  userPick: 'long' | 'short'
  outcome: 'yes' | 'no'
  isWinner: boolean
  finalPayout: number
  status: 'redeemable' | 'settled'
}
```

---

## 10. 开发优先级

### Phase 1: 基础组件
1. PortfolioHeader
2. StatCard (三个变体)
3. SectionHeader

### Phase 2: Active Positions
1. PositionBadge
2. PnLDisplay
3. ActivePositionRow
4. PositionsTable

### Phase 3: Settled Positions
1. OutcomeIndicator
2. PayoutInfo
3. SettledPositionRow
4. SettledPositionsTable

### Phase 4: 页面组装
1. 整合所有组件
2. 添加响应式处理
3. 添加动画效果
4. 测试交互逻辑

---

## 11. 注意事项

- 所有金额格式化统一使用 `$` 前缀和两位小数
- 百分比统一显示一位小数，带 `%` 后缀
- 盈利金额必须带 `+` 前缀，亏损带 `-` 前缀
- 图标统一使用 Lucide React
- 遵循 CLAUDE.md 中的颜色和样式规范
- 确保所有可交互元素有明确的悬停状态
- 保持深色主题的视觉对比度
- 表格行背景使用 `bg-bg-card`，边框使用 `border-border-primary`
