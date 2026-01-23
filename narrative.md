# Narrative 详情页 - 页面结构与组件拆解方案

## 页面概述

Narrative 详情页是一个展示预测市场 Bundle 详细信息并提供交易功能的页面。页面采用两栏布局：左侧展示市场信息和 Bundle 组成，右侧为交易面板。

## 路由设计

```
/narrative/[id]
例如: /narrative/bitcoin-halving-effect
```

## 页面整体结构

```
┌─────────────────────────────────────────────────────────────┐
│  全局导航栏 (Global Navigation)                              │
├─────────────────────────────────────────────────────────────┤
│  面包屑导航 (Breadcrumb)                                     │
├─────────────────────────────────────────────────────────────┤
│  页面头部 (Page Header)                                      │
│  - 标签 (Tags)                                               │
│  - 标题 (Title)                                              │
│  - 描述 (Description)                                        │
│  - 统计信息 (Stats)                                          │
├─────────────────────────────────────────────────────────────┤
│  主内容区域 (Main Content)                                   │
│  ┌─────────────────────┬─────────────────────────────────┐  │
│  │  左侧内容区         │  右侧交易面板                    │  │
│  │  (Left Column)      │  (Trading Panel)                │  │
│  │                     │                                 │  │
│  │  - 价格可视化       │  - AI Insight                   │  │
│  │  - Bundle 组成      │  - Buy/Sell 切换                │  │
│  │                     │  - Long/Short 选择              │  │
│  │                     │  - 价格信息                     │  │
│  │                     │  - 金额输入                     │  │
│  │                     │  - 交易信息                     │  │
│  │                     │  - 确认按钮                     │  │
│  └─────────────────────┴─────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## 组件拆解详细说明

### 1. 面包屑导航组件 (Breadcrumb)

**组件名**: `Breadcrumb.tsx`

**功能**: 显示当前页面在网站层级中的位置

**结构**:
```tsx
Marketplace > Bitcoin Halving Bundle
```

**样式要点**:
- 文本颜色: `text-text-secondary`
- 当前页面文本: `text-text-primary`
- 分隔符: `>` 或使用 `ChevronRight` 图标
- 字体大小: `text-sm`
- 间距: `gap-2`

**Props**:
```typescript
interface BreadcrumbProps {
  items: Array<{
    label: string
    href?: string
  }>
}
```

---

### 2. 页面头部组件 (NarrativeHeader)

**组件名**: `NarrativeHeader.tsx`

**功能**: 展示 Narrative 的核心信息

**包含子组件**:
- 标签组 (Tags)
- 标题 (Title)
- 描述 (Description)
- 统计信息行 (StatsRow)

**结构**:
```tsx
<div className="mb-8">
  {/* 标签行 */}
  <div className="flex gap-2 mb-4">
    <span className="bg-bg-secondary text-text-primary px-3 py-1 rounded-full text-xs font-semibold uppercase">
      CRYPTO
    </span>
    <span className="bg-left text-white px-2 py-1 rounded-md text-xs font-bold uppercase">
      20 LEFT
    </span>
  </div>

  {/* 标题 */}
  <h1 className="text-text-primary text-5xl font-bold mb-4">
    Bitcoin Halving Effect
  </h1>

  {/* 描述 */}
  <p className="text-text-secondary text-lg mb-6 max-w-4xl">
    A composite bundle tracking the key outcomes surrounding the upcoming Bitcoin halving
    event. Trade on price action, network difficulty, and ETF inflows in a single instrument.
  </p>

  {/* 统计信息行 */}
  <div className="flex gap-8">
    <StatItem label="Total Value Locked" value="$1.2M" icon="lock" />
    <StatItem label="Traders" value="1,420" avatars={[...]} />
    <StatItem label="Expiry" value="Apr 24, 2024" />
  </div>
</div>
```

**Props**:
```typescript
interface NarrativeHeaderProps {
  category: string
  leftCount?: number
  title: string
  description: string
  totalValueLocked: string
  tradersCount: number
  traderAvatars: string[]
  expiryDate: string
}
```

**样式要点**:
- 标题字体: `text-5xl font-bold`
- 描述最大宽度: `max-w-4xl`
- 统计项之间间距: `gap-8`

---

### 3. 统计项组件 (StatItem)

**组件名**: `StatItem.tsx`

**功能**: 展示单个统计指标

**变体**:
1. 带图标的数值（Total Value Locked）
2. 带头像的数值（Traders）
3. 纯文本数值（Expiry）

**结构**:
```tsx
<div className="flex flex-col gap-1">
  <span className="text-text-tertiary text-sm">{label}</span>
  <div className="flex items-center gap-2">
    {icon && <Icon className="w-4 h-4" />}
    {avatars && <AvatarGroup avatars={avatars} />}
    <span className="text-text-primary text-xl font-semibold">{value}</span>
  </div>
</div>
```

**Props**:
```typescript
interface StatItemProps {
  label: string
  value: string | number
  icon?: 'lock' | 'calendar' | 'users'
  avatars?: string[]
}
```

---

### 4. 价格历史可视化组件 (PriceHistoryCard)

**组件名**: `PriceHistoryCard.tsx`

**功能**: 展示市场实时状态和价格历史可视化

**结构**:
```tsx
<div className="bg-bg-card rounded-2xl overflow-hidden border border-border-primary">
  {/* LIVE MARKET 标签 */}
  <div className="absolute top-4 left-4 z-10">
    <span className="bg-new text-white px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1.5">
      <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
      LIVE MARKET
    </span>
  </div>

  {/* Bitcoin 可视化图像 */}
  <div className="relative h-80 flex items-center justify-center">
    <img src="/bitcoin-coin.png" alt="Bitcoin" className="w-64 h-64 object-contain" />
    <div className="absolute inset-0 flex items-center justify-center">
      <span className="text-text-secondary text-sm font-medium">
        Price History Visualization
      </span>
    </div>
  </div>
</div>
```

**Props**:
```typescript
interface PriceHistoryCardProps {
  isLive: boolean
  imageUrl: string
  altText: string
}
```

**样式要点**:
- 卡片高度: `h-80` (320px)
- LIVE MARKET 标签带脉冲动画: `animate-pulse`
- 图像大小: `w-64 h-64`

---

### 5. Bundle 组成区域 (BundleComposition)

**组件名**: `BundleComposition.tsx`

**功能**: 展示 Bundle 的组成部分及权重

**结构**:
```tsx
<div className="mt-6">
  {/* 头部 */}
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-text-primary text-2xl font-bold">Bundle Composition</h2>
    <a href="#" className="text-long hover:text-long-hover text-sm font-semibold">
      View on Polymarket
    </a>
  </div>

  {/* 组成项列表 */}
  <div className="space-y-4">
    {components.map(component => (
      <BundleComponentCard key={component.id} {...component} />
    ))}
  </div>
</div>
```

**Props**:
```typescript
interface BundleCompositionProps {
  components: BundleComponent[]
  polymarketUrl: string
}

interface BundleComponent {
  id: string
  title: string
  description?: string
  resolutionSource: string
  weight: number
  progressColor: 'long' | 'short' | 'neutral'
}
```

---

### 6. Bundle 组成项卡片 (BundleComponentCard)

**组件名**: `BundleComponentCard.tsx`

**功能**: 展示单个 Bundle 组成部分的详细信息

**结构**:
```tsx
<div className="bg-bg-secondary rounded-xl p-5 border border-border-primary">
  {/* 标题和权重 */}
  <div className="flex justify-between items-start mb-3">
    <h3 className="text-text-primary font-semibold text-base flex-1">
      {title}
    </h3>
    <span className="text-text-primary text-2xl font-bold ml-4">
      {weight}%
    </span>
  </div>

  {/* 副标题/来源 */}
  <p className="text-text-tertiary text-xs mb-3">
    Resolution Source: {resolutionSource}
  </p>

  {/* 进度条 */}
  <div className="w-full bg-bg-primary rounded-full h-2 overflow-hidden">
    <div
      className={`h-full bg-${progressColor} transition-all duration-300`}
      style={{ width: `${weight}%` }}
    />
  </div>

  {/* 权重标签 */}
  <div className="text-right mt-2">
    <span className="text-text-tertiary text-xs uppercase">WEIGHT</span>
  </div>
</div>
```

**Props**:
```typescript
interface BundleComponentCardProps {
  title: string
  resolutionSource: string
  weight: number
  progressColor: 'long' | 'short' | 'neutral'
}
```

**样式要点**:
- 卡片背景: `bg-bg-secondary`
- 进度条高度: `h-2`
- 进度条颜色根据类型变化: `bg-long`, `bg-short`, 或自定义中性色
- 权重数字: `text-2xl font-bold`

---

### 7. 交易面板组件 (TradingPanel)

**组件名**: `TradingPanel.tsx`

**功能**: 提供完整的交易界面，包括买卖切换、Long/Short 选择、金额输入和确认

**结构**:
```tsx
<div className="bg-bg-card rounded-2xl p-6 border border-border-primary sticky top-6">
  {/* AI Insight 折叠区域 */}
  <AIInsightCollapse />

  {/* Buy/Sell 标签切换 */}
  <div className="flex border-b border-border-primary mb-6">
    <button className={`flex-1 pb-3 ${tradeMode === 'buy' ? 'border-b-2 border-long text-text-primary' : 'text-text-tertiary'}`}>
      Buy
    </button>
    <button className={`flex-1 pb-3 ${tradeMode === 'sell' ? 'border-b-2 border-short text-text-primary' : 'text-text-tertiary'}`}>
      Sell
    </button>
  </div>

  {/* Long/Short 切换按钮 */}
  <div className="flex gap-2 mb-6">
    <button className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
      tradeType === 'long'
        ? 'bg-long text-white'
        : 'bg-bg-secondary text-text-secondary'
    }`}>
      Long
    </button>
    <button className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
      tradeType === 'short'
        ? 'bg-short text-white'
        : 'bg-bg-secondary text-text-secondary'
    }`}>
      Short
    </button>
  </div>

  {/* 当前价格 */}
  <PriceDisplay
    label="Current Price"
    price="72¢"
    change="+4.2%"
    changeDirection="up"
  />

  {/* 金额输入区域 */}
  <AmountInput
    balance={1240.50}
    value={amount}
    onChange={setAmount}
  />

  {/* 百分比快捷按钮 */}
  <PercentageButtons
    percentages={[0, 25, 50, 75, 100]}
    onSelect={handlePercentageSelect}
  />

  {/* 交易信息显示 */}
  <TradeInfo
    estimatedShares={0.00}
    avgPrice={0.72}
    maxProfit={0.00}
  />

  {/* 确认按钮 */}
  <button className={`w-full py-4 rounded-lg font-bold text-white transition-colors mb-3 ${
    tradeType === 'long'
      ? 'bg-long hover:bg-long-hover'
      : 'bg-short hover:bg-short-hover'
  }`}>
    Buy {tradeType === 'long' ? 'Long' : 'Short'}
  </button>

  {/* 服务条款 */}
  <p className="text-text-tertiary text-xs text-center">
    By trading, you agree to the <a href="#" className="underline">Terms of Service</a>
  </p>
</div>
```

**Props**:
```typescript
interface TradingPanelProps {
  narrativeId: string
  currentPrice: number
  priceChange: number
  userBalance: number
}
```

**状态管理**:
```typescript
const [tradeMode, setTradeMode] = useState<'buy' | 'sell'>('buy')
const [tradeType, setTradeType] = useState<'long' | 'short'>('long')
const [amount, setAmount] = useState<number>(0)
```

**样式要点**:
- 粘性定位: `sticky top-6`
- 选中的 Tab 带底部边框: `border-b-2`
- 按钮颜色根据 tradeType 动态变化

---

### 8. AI Insight 折叠组件 (AIInsightCollapse)

**组件名**: `AIInsightCollapse.tsx`

**功能**: 可折叠的 AI 分析洞察区域

**结构**:
```tsx
<div className="mb-6">
  <button
    onClick={() => setIsOpen(!isOpen)}
    className="w-full flex items-center justify-between bg-gradient-to-r from-short/20 to-long/20 rounded-lg px-4 py-3 border border-border-primary hover:border-border-secondary transition-colors"
  >
    <div className="flex items-center gap-2">
      <Sparkles className="w-5 h-5 text-long" />
      <span className="text-text-primary font-semibold">AI Insight</span>
    </div>
    <ChevronDown className={`w-5 h-5 text-text-secondary transition-transform ${isOpen ? 'rotate-180' : ''}`} />
  </button>

  {isOpen && (
    <div className="mt-3 p-4 bg-bg-secondary rounded-lg border border-border-primary">
      <p className="text-text-secondary text-sm">
        AI 分析内容...
      </p>
    </div>
  )}
</div>
```

**Props**:
```typescript
interface AIInsightCollapseProps {
  insight: string
}
```

**样式要点**:
- 使用渐变背景: `from-short/20 to-long/20`
- 图标: `Sparkles` from Lucide
- 折叠动画: `transition-transform rotate-180`

---

### 9. 价格展示组件 (PriceDisplay)

**组件名**: `PriceDisplay.tsx`

**功能**: 展示当前价格和涨跌幅

**结构**:
```tsx
<div className="mb-4">
  <span className="text-text-tertiary text-sm block mb-1">{label}</span>
  <div className="flex items-center gap-3">
    <span className="text-text-primary text-4xl font-bold">{price}</span>
    <span className={`text-sm font-semibold ${
      changeDirection === 'up' ? 'text-new' : 'text-left'
    }`}>
      {change} Today
    </span>
  </div>
</div>
```

**Props**:
```typescript
interface PriceDisplayProps {
  label: string
  price: string
  change: string
  changeDirection: 'up' | 'down'
}
```

---

### 10. 金额输入组件 (AmountInput)

**组件名**: `AmountInput.tsx`

**功能**: 金额输入框，显示用户余额

**结构**:
```tsx
<div className="mb-4">
  <div className="flex justify-between items-center mb-2">
    <span className="text-text-secondary text-sm">Amount</span>
    <span className="text-text-tertiary text-xs">Balance: ${balance.toFixed(2)}</span>
  </div>

  <div className="bg-bg-secondary border border-border-primary rounded-xl px-4 py-3 flex items-center">
    <span className="text-text-tertiary mr-2">$</span>
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      placeholder="0.00"
      className="bg-transparent text-text-primary text-xl font-bold flex-1 outline-none"
    />
    <span className="text-text-tertiary text-sm ml-2">USDC</span>
  </div>
</div>
```

**Props**:
```typescript
interface AmountInputProps {
  balance: number
  value: number
  onChange: (value: number) => void
}
```

**样式要点**:
- 输入框文本: `text-xl font-bold`
- 货币符号和单位: `text-text-tertiary`

---

### 11. 百分比快捷按钮组 (PercentageButtons)

**组件名**: `PercentageButtons.tsx`

**功能**: 提供快捷百分比选择（0%, 25%, 50%, 75%, 100%）

**结构**:
```tsx
<div className="flex justify-between gap-2 mb-6">
  {percentages.map(percentage => (
    <button
      key={percentage}
      onClick={() => onSelect(percentage)}
      className="flex-1 bg-bg-secondary hover:bg-bg-card text-text-secondary hover:text-text-primary py-2 rounded-lg text-sm font-semibold transition-colors border border-border-primary"
    >
      {percentage}%
    </button>
  ))}
</div>
```

**Props**:
```typescript
interface PercentageButtonsProps {
  percentages: number[]
  onSelect: (percentage: number) => void
}
```

---

### 12. 交易信息展示组件 (TradeInfo)

**组件名**: `TradeInfo.tsx`

**功能**: 展示预估份额、平均价格和最大收益

**结构**:
```tsx
<div className="bg-bg-secondary rounded-lg p-4 mb-6 space-y-3">
  <div className="flex justify-between items-center">
    <span className="text-text-tertiary text-sm">Est. Shares</span>
    <span className="text-text-primary font-semibold">{estimatedShares.toFixed(2)}</span>
  </div>

  <div className="flex justify-between items-center">
    <span className="text-text-tertiary text-sm">Avg. Price</span>
    <span className="text-text-primary font-semibold">{avgPrice.toFixed(2)} USDC</span>
  </div>

  <div className="flex justify-between items-center">
    <span className="text-text-tertiary text-sm">Max Profit</span>
    <span className="text-text-primary font-semibold">${maxProfit.toFixed(2)}</span>
  </div>
</div>
```

**Props**:
```typescript
interface TradeInfoProps {
  estimatedShares: number
  avgPrice: number
  maxProfit: number
}
```

---

## 布局规范

### 响应式设计

#### 桌面端 (lg: 1024px+)
```tsx
<div className="container mx-auto px-6 py-8">
  <Breadcrumb />
  <NarrativeHeader />

  <div className="grid grid-cols-12 gap-6">
    {/* 左侧内容区 - 8列 */}
    <div className="col-span-8">
      <PriceHistoryCard />
      <BundleComposition />
    </div>

    {/* 右侧交易面板 - 4列 */}
    <div className="col-span-4">
      <TradingPanel />
    </div>
  </div>
</div>
```

#### 平板端 (md: 768px - 1023px)
```tsx
<div className="grid grid-cols-1 gap-6">
  {/* 交易面板移到顶部 */}
  <TradingPanel />
  <PriceHistoryCard />
  <BundleComposition />
</div>
```

#### 移动端 (sm: < 768px)
- 单列布局
- 交易面板可能需要固定在底部或作为抽屉式组件

---

## 数据结构与类型定义

### Narrative 数据模型

```typescript
interface Narrative {
  id: string
  slug: string
  title: string
  description: string
  category: string

  // 状态标签
  tags: {
    isNew?: boolean
    isHot?: boolean
    leftCount?: number
  }

  // 统计数据
  stats: {
    totalValueLocked: number
    tradersCount: number
    traderAvatars: string[]
    expiryDate: string
  }

  // 价格信息
  pricing: {
    currentPrice: number
    priceChange24h: number
    priceHistory: PricePoint[]
  }

  // Bundle 组成
  composition: BundleComponent[]

  // 市场状态
  market: {
    isLive: boolean
    longPercentage: number
    shortPercentage: number
  }

  // AI 洞察
  aiInsight?: string

  // 外部链接
  polymarketUrl?: string
}

interface PricePoint {
  timestamp: number
  price: number
}

interface BundleComponent {
  id: string
  title: string
  description?: string
  resolutionSource: string
  weight: number
  progressColor: 'long' | 'short' | 'neutral'
}
```

---

## API 端点设计

### 获取 Narrative 详情
```
GET /api/narratives/:id
```

**响应**:
```json
{
  "id": "bitcoin-halving-effect",
  "slug": "bitcoin-halving-effect",
  "title": "Bitcoin Halving Effect",
  "description": "A composite bundle tracking...",
  "category": "CRYPTO",
  "tags": {
    "leftCount": 20
  },
  "stats": {
    "totalValueLocked": 1200000,
    "tradersCount": 1420,
    "traderAvatars": [...],
    "expiryDate": "2024-04-24"
  },
  "pricing": {
    "currentPrice": 0.72,
    "priceChange24h": 4.2,
    "priceHistory": [...]
  },
  "composition": [...],
  "market": {
    "isLive": true,
    "longPercentage": 50,
    "shortPercentage": 50
  },
  "aiInsight": "...",
  "polymarketUrl": "https://polymarket.com/..."
}
```

---

## 组件构建顺序建议

### Phase 1: 基础展示组件
1. ✅ Breadcrumb
2. ✅ StatItem
3. ✅ BundleComponentCard
4. ✅ PriceDisplay

### Phase 2: 组合组件
5. ✅ NarrativeHeader (使用 StatItem)
6. ✅ BundleComposition (使用 BundleComponentCard)
7. ✅ PriceHistoryCard

### Phase 3: 交互组件
8. ✅ AIInsightCollapse
9. ✅ AmountInput
10. ✅ PercentageButtons
11. ✅ TradeInfo

### Phase 4: 复杂组合组件
12. ✅ TradingPanel (集成 Phase 3 的所有组件)

### Phase 5: 页面组装
13. ✅ NarrativeDetailPage (集成所有组件)

---

## 注意事项

### 样式一致性
- 所有组件必须使用 `CLAUDE.md` 中定义的自定义 Tailwind 类名
- 颜色使用 `bg-long`、`bg-short`、`text-text-primary` 等，不使用硬编码颜色值
- 保持与首页 NarrativeCard 的视觉一致性

### 响应式设计
- 优先设计桌面端（1440px）
- 确保在平板端（768px）和移动端（375px）的良好体验
- 交易面板在移动端可能需要特殊处理（固定底部或抽屉）

### 性能优化
- 价格数据可能需要实时更新（WebSocket 或轮询）
- 考虑使用 React.memo 优化重渲染
- 图片懒加载

### 可访问性
- 所有交互元素必须支持键盘操作
- 提供合适的 ARIA 标签
- 确保颜色对比度符合 WCAG 标准

### 状态管理
- 交易面板的状态可能需要全局状态管理（如 Zustand 或 Context）
- 考虑用户登录状态和钱包连接状态

---

## 下一步行动

1. **创建基础组件**: 从 Phase 1 开始，逐个实现基础展示组件
2. **组件测试**: 每个组件完成后进行单元测试
3. **组合组装**: 按 Phase 顺序逐步组合更复杂的组件
4. **页面集成**: 最后将所有组件集成到完整页面
5. **样式微调**: 根据设计稿进行细节调整
6. **交互测试**: 测试所有交互流程
7. **响应式测试**: 在不同设备尺寸下测试
8. **性能优化**: 优化加载速度和运行时性能

---

## 技术决策

### 状态管理方案
- 建议使用 **Zustand** 或 **React Context + useReducer**
- 交易状态（tradeMode, tradeType, amount）需要在 TradingPanel 内部管理
- 用户余额和钱包连接状态需要全局管理

### 数据获取方案
- 使用 **Next.js App Router** 的 Server Components 进行初始数据获取
- 使用 **SWR** 或 **TanStack Query** 处理客户端数据缓存和重新验证
- 价格实时更新考虑使用 WebSocket

### 样式方案
- 完全使用 **Tailwind CSS v4**
- 遵循 `CLAUDE.md` 中的自定义配色
- 不引入额外的 CSS-in-JS 库

---

## 附录：设计稿关键尺寸

- 页面最大宽度: `1440px`
- 左侧内容区宽度: `66.67%` (8/12 列)
- 右侧交易面板宽度: `33.33%` (4/12 列)
- 卡片圆角: `rounded-2xl` (16px)
- 按钮圆角: `rounded-lg` (8px)
- 组件间距: `gap-6` (24px)
- 卡片内边距: `p-6` (24px)
- 价格历史卡片高度: `h-80` (320px)
- 交易面板粘性定位: `sticky top-6`
