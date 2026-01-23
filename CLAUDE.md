# Polyplot Frontend - 技术栈与设计规范

## 技术栈

- **框架**: Next.js 16
- **样式**: Tailwind CSS v4
- **组件库**: Lucid React (Lucide Icons)
- **语言**: TypeScript

## Tailwind CSS v4 自定义配色使用

项目使用 Tailwind CSS v4，所有自定义颜色已在 `app/globals.css` 中配置。

### 在代码中使用自定义颜色

```tsx
// 背景色
<div className="bg-bg-primary">           {/* #0f0f0f */}
<div className="bg-bg-secondary">         {/* #1a1a1a */}
<div className="bg-bg-card">              {/* #1f1f1f */}

// Long (做多) 按钮
<button className="bg-long hover:bg-long-hover">
  Buy Long
</button>

// Short (做空) 按钮
<button className="bg-short hover:bg-short-hover">
  Buy Short
</button>

// 状态标签
<span className="bg-new">NEW</span>
<span className="bg-hot">HOT</span>
<span className="bg-left">20 LEFT</span>

// 文本颜色
<h1 className="text-text-primary">       {/* 主文本 */}
<p className="text-text-secondary">      {/* 次要文本 */}
<span className="text-text-tertiary">    {/* 第三级文本 */}
<span className="text-currency">         {/* 货币金色 */}

// 边框
<div className="border border-border-primary">
```

## 核心配色方案

> 所有配色已在 `app/globals.css` 中通过 Tailwind CSS v4 的 `@theme` 配置。

### 主题
深色主题 (Dark Theme)

### 背景色
- **主背景**: `#0f0f0f` → `bg-bg-primary`
- **次级背景**: `#1a1a1a` → `bg-bg-secondary`
- **卡片背景**: `#1f1f1f` → `bg-bg-card`

### 主要交互色

#### 橙色/金色（做多 - Long）
- **主色**: `#fb923c` → `bg-long`
- **悬停**: `#f97316` → `bg-long-hover`
- **深色**: `#ea580c` → `bg-long-dark`
- **用途**: Buy Long 按钮、Long 百分比进度条
- **⚠️ 重要规范**: **所有使用 `bg-long`、`bg-long-hover` 或 `bg-long-dark` 作为背景色的组件，其文字颜色必须使用 `text-black`（黑色），以确保最佳的对比度和可读性**

#### 紫色（做空 - Short）
- **主色**: `#a855f7` → `bg-short`
- **悬停**: `#9333ea` → `bg-short-hover`
- **深色**: `#7e22ce` → `bg-short-dark`
- **用途**: Buy Short 按钮、Short 百分比进度条

### 状态与标签颜色

#### 绿色（新内容 - NEW）
- **主色**: `#10b981` → `bg-new`
- **用途**: NEW 标签

#### 红色（紧急/限量 - LEFT）
- **主色**: `#ef4444` → `bg-left`
- **用途**: "20 LEFT" 等限量标签

#### 金色（货币/价值）
- **主色**: `#fbbf24` → `text-currency`
- **用途**: 货币显示 ($1,240.50)

#### 橙色（热门 - HOT）
- **主色**: `#f97316` → `bg-hot`
- **用途**: HOT 标签

### 文本颜色

- **主文本**: `#ffffff` → `text-text-primary`
- **次要文本**: `#9ca3af` → `text-text-secondary`
- **第三级文本**: `#6b7280` → `text-text-tertiary`

### 边框颜色

- **主边框**: `rgba(75, 85, 99, 0.3)` → `border-border-primary`
- **次级边框**: `rgba(55, 65, 81, 0.5)` → `border-border-secondary`

## UI组件规范

### 按钮样式

#### Primary Button (Buy Long)
```tsx
className="bg-long hover:bg-long-hover text-black font-semibold px-6 py-3 rounded-lg transition-colors"
```

**注意**: Long 按钮使用 `text-black` 以确保在琥珀色背景上的最佳对比度。

#### Secondary Button (Buy Short)
```tsx
className="bg-short hover:bg-short-hover text-white font-semibold px-6 py-3 rounded-lg transition-colors"
```

### 卡片样式

```tsx
className="bg-bg-card rounded-2xl overflow-hidden backdrop-blur-sm border border-border-primary shadow-xl"
```

### 标签样式

#### Category Tags
```tsx
className="bg-bg-secondary/80 backdrop-blur-sm text-text-primary text-xs font-semibold px-3 py-1 rounded-full uppercase"
```

#### Status Tags (NEW, HOT, LEFT)
```tsx
// NEW
className="bg-new text-white text-xs font-bold px-2 py-1 rounded-md uppercase"

// HOT
className="bg-hot text-white text-xs font-bold px-2 py-1 rounded-md uppercase"

// LEFT
className="bg-left text-white text-xs font-bold px-2 py-1 rounded-md uppercase"
```

### 进度条样式

```tsx
// Long 进度条
className="h-2 bg-long rounded-full"

// Short 进度条
className="h-2 bg-short rounded-full"
```

### Narrative Card - 金额输入模式

当用户点击 NarrativeCard 的 Buy Long 或 Buy Short 按钮时，卡片切换到金额输入模式。

#### 布局特性
```tsx
// 卡片内容区域 - 输入模式下向上移动
className={`p-6 h-70 flex flex-col relative bg-bg-card rounded-t-2xl transition-all duration-300 ${isInputMode ? '-mt-16' : ''}`}

// 标题 - 单行显示
<h3 className="text-text-primary font-bold text-xl mb-2 truncate">

// 描述 - 两行显示，固定高度
<p className="text-text-secondary text-sm mb-4 line-clamp-2 h-10">

// 关闭按钮 - 与标题对齐
<button className="absolute top-3.5 right-2 text-text-tertiary hover:text-text-primary transition-colors">
```

#### 金额输入界面组件

##### Position Amount 标签和状态标签
```tsx
<div className="flex justify-between items-center mb-3">
  <span className="text-text-secondary text-sm font-medium">Position Amount</span>
  <span className={`${tradeType === 'long' ? 'bg-long' : 'bg-short'} px-3 py-1 rounded-md text-white text-sm font-semibold`}>
    Buying {tradeType === 'long' ? 'Long' : 'Short'}
  </span>
</div>
```

##### 金额显示和快捷按钮（60% 宽度）
```tsx
<div className="w-[60%] bg-bg-secondary border border-border-primary rounded-xl px-4 py-3 flex items-center justify-between">
  <span className="text-text-primary text-xl font-bold">$ {amount}</span>
  <div className="flex items-center gap-2">
    <button className="bg-bg-primary hover:bg-bg-card text-text-primary font-semibold px-2.5 py-1 rounded-md transition-colors text-sm">+1</button>
    <button className="bg-bg-primary hover:bg-bg-card text-text-primary font-semibold px-2.5 py-1 rounded-md transition-colors text-sm">+10</button>
  </div>
</div>
```

##### 范围滑块（40% 宽度）
```tsx
<div className="w-[40%] flex items-center">
  <input
    type="range"
    min="1"
    max="1000"
    className={`w-full h-2 rounded-full appearance-none cursor-pointer ${tradeType === 'long' ? 'text-long' : 'text-short'}`}
    style={{
      background: `linear-gradient(to right, ${color} 0%, ${color} ${percentage}%, #1a1a1a ${percentage}%, #1a1a1a 100%)`
    }}
  />
</div>
```

##### 收益信息行
```tsx
<div className="flex justify-between items-center mb-4 px-2">
  <div className="flex flex-col">
    <span className="text-text-tertiary text-xs">Current Price</span>
    <span className="text-text-primary text-sm font-semibold">${currentPrice}</span>
  </div>
  <div className="flex flex-col items-end">
    <span className="text-text-tertiary text-xs">Potential Profit</span>
    <span className={`text-sm font-semibold ${tradeType === 'long' ? 'text-long' : 'text-short'}`}>
      +${potentialProfit}
    </span>
  </div>
</div>
```

##### 确认按钮
```tsx
<button className={`w-full ${tradeType === 'long' ? 'bg-long hover:bg-long-hover' : 'bg-short hover:bg-short-hover'} text-white font-bold py-3 rounded-lg transition-colors mb-4`}>
  Confirm {tradeType === 'long' ? 'Long' : 'Short'}
</button>
```

##### 底部进度条
```tsx
<div className="mt-auto">
  <div className="flex justify-between text-xs mb-2">
    <span className="text-long font-semibold">{longPercentage}% LONG</span>
    <span className="text-short font-semibold">{shortPercentage}% SHORT</span>
  </div>
  <div className="h-2 bg-bg-secondary rounded-full overflow-hidden flex">
    <div className="bg-long transition-all duration-300" style={{ width: `${longPercentage}%` }}></div>
    <div className="bg-short transition-all duration-300" style={{ width: `${shortPercentage}%` }}></div>
  </div>
</div>
```

#### 关键设计决策
- **固定卡片高度**: `h-70` (280px) 确保所有卡片高度一致
- **卡片上移动画**: `-mt-16` 使输入模式下卡片内容向上移动，部分覆盖背景图
- **宽度比例**: 金额输入 60% + 滑块 40%，确保布局稳定
- **文本限制**: 标题单行，描述两行（固定高度 `h-10`），避免高度变化
- **平滑过渡**: `transition-all duration-300` 提供流畅的切换动画

## 字体规范

- **标题**: Font weight 700 (Bold)
- **按钮文本**: Font weight 600 (Semibold)
- **正文**: Font weight 400 (Regular)
- **标签**: Font weight 600-700 (Semibold-Bold)
- **金额输入显示**: `text-xl` (20px), Font weight 700 (Bold)

## 间距规范

- **卡片间距**: `gap-6` (24px)
- **卡片内边距**: `p-6` (24px)
- **按钮间距**: `gap-3` (12px)
- **标签间距**: `gap-2` (8px)

## 圆角规范

- **卡片**: `rounded-2xl` (16px)
- **按钮**: `rounded-lg` (8px)
- **标签**: `rounded-md` / `rounded-full` (4px / 全圆角)

## 阴影与特效

- **卡片阴影**: `shadow-xl`
- **背景模糊**: `backdrop-blur-sm`
- **边框**: `border border-gray-800/50`
- **过渡动画**: `transition-colors` / `transition-all duration-200`

## 响应式设计

- **移动端**: 单列布局
- **平板**: 2列布局 (`md:grid-cols-2`)
- **桌面**: 3列布局 (`lg:grid-cols-3`)

## 图标使用

使用 Lucide React 图标库：
```tsx
import { TrendingUp, TrendingDown, Flame, Clock } from 'lucide-react'
```

## CSS 变量快速参考

### 在 CSS/Tailwind 中使用

| 类型 | CSS 变量 | Tailwind 类名 | 颜色值 |
|------|---------|--------------|--------|
| 主背景 | `--color-bg-primary` | `bg-bg-primary` | #0f0f0f |
| 次级背景 | `--color-bg-secondary` | `bg-bg-secondary` | #1a1a1a |
| 卡片背景 | `--color-bg-card` | `bg-bg-card` | #1f1f1f |
| Long 主色 | `--color-long` | `bg-long` | #fb923c |
| Long 悬停 | `--color-long-hover` | `bg-long-hover` | #f97316 |
| Short 主色 | `--color-short` | `bg-short` | #a855f7 |
| Short 悬停 | `--color-short-hover` | `bg-short-hover` | #9333ea |
| NEW 标签 | `--color-new` | `bg-new` | #10b981 |
| HOT 标签 | `--color-hot` | `bg-hot` | #f97316 |
| LEFT 标签 | `--color-left` | `bg-left` | #ef4444 |
| 货币金色 | `--color-currency` | `text-currency` | #fbbf24 |
| 主文本 | `--color-text-primary` | `text-text-primary` | #ffffff |
| 次要文本 | `--color-text-secondary` | `text-text-secondary` | #9ca3af |
| 主边框 | `--color-border-primary` | `border-border-primary` | rgba(75,85,99,0.3) |

## 备注

- **所有的样式设计都需要遵循响应式设计原则**，确保在移动端、平板和桌面端都有良好的用户体验
- 所有交互元素应有明确的悬停状态
- 保持一致的视觉层次和对比度
- 使用渐变和背景图片增强视觉吸引力
- 确保深色主题下的可读性
- 优先使用自定义 Tailwind 类名（如 `bg-long`），而不是硬编码颜色值
- 所有配色方案集中在 `app/globals.css` 中管理，便于维护
- **样式编写完成后，必须运行 `npm run lint` 检查是否存在语法错误或代码规范问题**
