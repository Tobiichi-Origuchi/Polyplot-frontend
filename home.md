# Home 页面组件文档

本文档记录 Polyplot 前端项目 Home 页面的所有组件及其作用。

## 组件命名规范

- 所有组件使用 PascalCase 命名
- 组件文件名与组件名保持一致
- 建议组件路径: `app/components/home/`

## 组件列表

### 核心布局组件

#### HomePage
- **文件**: `app/page.tsx` 或 `app/components/home/HomePage.tsx`
- **作用**: Home 页面的主容器组件
- **职责**:
  - 整合所有 Home 页面子组件
  - 管理页面级状态
  - 处理页面布局

---

### 功能组件

#### CategoryFilter
- **文件**: `app/components/home/CategoryFilter.tsx`
- **作用**: 分类筛选导航栏
- **状态**: ✅ 已实现
- **职责**:
  - 显示所有市场分类 (All Narratives, Crypto, Politics, AI & Tech, Pop Culture, Sports)
  - 处理分类切换交互
  - 高亮当前选中分类
  - 横向滚动布局，支持移动端滑动浏览
- **Props**:
  - `onCategoryChange?: (categoryId: string) => void` - 分类切换回调函数
  - `defaultCategory?: string` - 默认选中的分类ID (默认: 'all')
- **图标映射**:
  - All Narratives: `Flame` (火焰)
  - Crypto: `Bitcoin` (比特币)
  - Politics: `Landmark` (地标/政府建筑)
  - AI & Tech: `Sparkles` (星光)
  - Pop Culture: `Gamepad2` (游戏手柄)
  - Sports: `Trophy` (奖杯)
- **使用的颜色**:
  - 激活状态: `bg-long` (橙色) + `text-white` + `shadow-lg`
  - 未激活: `bg-bg-secondary` + `text-text-secondary`
  - 悬停状态: `hover:bg-bg-card` + `hover:text-text-primary`
- **样式特点**:
  - 圆角按钮: `rounded-full`
  - 过渡动画: `transition-all`
  - 横向滚动: `overflow-x-auto` + `scrollbar-hide`
  - 按钮间距: `gap-3`
  - 按钮内边距: `px-6 py-3`

---

#### MarketCard
- **文件**: `app/components/home/MarketCard.tsx`
- **作用**: 市场预测卡片
- **状态**: ✅ 已实现
- **职责**:
  - 展示单个市场预测信息
  - 显示市场封面图、标题、描述
  - 展示 Long/Short 进度条和百分比
  - 显示交易量、参与人数等统计信息
  - 提供 Buy Long 和 Buy Short 操作按钮
  - 显示分类标签和状态标签（NEW/HOT/LEFT）
  - 显示参与者头像群组
- **Props**:
  - `id: string` - 卡片唯一ID
  - `category: string` - 分类名称 (CRYPTO, POLITICS, etc.)
  - `statusBadge?: { type: 'new' | 'hot' | 'left'; text: string }` - 可选状态标签
  - `imageUrl: string` - 卡片背景图片URL
  - `title: string` - 市场标题
  - `description: string` - 市场描述
  - `longPercentage: number` - Long 百分比 (0-100)
  - `shortPercentage: number` - Short 百分比 (0-100)
  - `volume: string` - 交易量显示文本 (如 "$1.2M")
  - `participants: number` - 参与者总数
  - `participantImages?: string[]` - 参与者头像URL数组 (最多显示3个)
  - `onBuyLong?: () => void` - Buy Long 按钮点击回调
  - `onBuyShort?: () => void` - Buy Short 按钮点击回调
- **使用的颜色**:
  - 卡片背景: `bg-bg-card`
  - Long 按钮: `bg-long` + `hover:bg-long-hover`
  - Short 按钮: `bg-short` + `hover:bg-short-hover`
  - 进度条: `bg-long` 和 `bg-short`
- **图标使用**:
  - Buy Long 按钮: `ThumbsUp` (点赞)
  - Buy Short 按钮: `ThumbsDown` (点踩)
  - 交易量: `TrendingUp` (趋势向上)
- **样式特点**:
  - 卡片圆角: `rounded-2xl`
  - 卡片阴影: `shadow-xl` + 悬停时 `shadow-2xl`
  - 图片高度: `h-48`
  - 图片透明度: `opacity-60`
  - 进度条高度: `h-2`
  - 进度条过渡: `transition-all duration-300`
  - 用户头像重叠: `-space-x-2`

---

#### MarketGrid
- **文件**: `app/components/home/MarketGrid.tsx`
- **作用**: 市场卡片网格容器
- **职责**:
  - 使用响应式网格布局展示多个 MarketCard
  - 处理卡片排列和间距
- **响应式布局**:
  - 移动端: 1列
  - 平板: 2列 (`md:grid-cols-2`)
  - 桌面: 3列 (`lg:grid-cols-3`)

---

#### StatusBadge
- **文件**: `app/components/home/StatusBadge.tsx`
- **作用**: 状态标签组件
- **状态**: ✅ 已实现
- **职责**:
  - 显示 NEW、HOT、LEFT 等状态标签
  - 支持自定义标签类型和样式
- **Props**:
  - `type: 'new' | 'hot' | 'left'` - 标签类型
  - `text: string` - 标签显示文本
- **使用的颜色**:
  - NEW: `bg-new` (#10b981)
  - HOT: `bg-hot` (#f97316)
  - LEFT: `bg-left` (#ef4444)
- **样式特点**:
  - 文本颜色: `text-white`
  - 字体粗细: `font-bold`
  - 圆角: `rounded-md`
  - 内边距: `px-2 py-1`
  - 文本大小: `text-xs`
  - 大写显示: `uppercase`

---

#### CategoryBadge
- **文件**: `app/components/home/CategoryBadge.tsx`
- **作用**: 分类标签组件
- **状态**: ✅ 已实现
- **职责**:
  - 显示市场分类标签 (CRYPTO, POLITICS, etc.)
  - 使用半透明背景和模糊效果
- **Props**:
  - `category: string` - 分类名称
- **使用的颜色**:
  - 背景: `bg-bg-secondary/80`
  - 文本: `text-text-primary`
- **样式特点**:
  - 背景模糊: `backdrop-blur-sm`
  - 字体粗细: `font-semibold`
  - 圆角: `rounded-full`
  - 内边距: `px-3 py-1`
  - 文本大小: `text-xs`
  - 大写显示: `uppercase`

---

### 待定组件

根据开发需求，后续可能添加以下组件：

- **HeroSection**: 顶部英雄区域/Banner
- **TrendingMarkets**: 热门市场推荐
- **SearchBar**: 搜索栏
- **FilterPanel**: 高级筛选面板
- **SortOptions**: 排序选项
- **LoadMoreButton**: 加载更多按钮

---

## 组件依赖关系

```
HomePage
├── HeroSection (待定)
├── SearchBar (待定)
├── CategoryFilter
├── SortOptions (待定)
└── MarketGrid
    └── MarketCard
        ├── CategoryBadge
        ├── StatusBadge
        └── ProgressBar (内联在 MarketCard 中)
```

---

## 设计规范参考

所有组件严格遵循 `CLAUDE.md` 中定义的设计规范：

- **配色方案**: 使用自定义 Tailwind 颜色类 (bg-long, bg-short, etc.)
- **间距**: 卡片间距 `gap-6`，内边距 `p-6`
- **圆角**: 卡片 `rounded-2xl`，按钮 `rounded-lg`
- **阴影**: 卡片使用 `shadow-xl`
- **过渡**: 交互元素使用 `transition-colors` 或 `transition-all`
- **响应式**: 移动优先，使用 `md:` 和 `lg:` 断点

---

## 更新日志

| 日期 | 组件 | 变更说明 |
|------|------|---------|
| 2026-01-20 | - | 初始文档创建 |
| 2026-01-21 | CategoryFilter | ✅ 实现分类筛选导航栏组件，支持6个分类切换和横向滚动布局 |
| 2026-01-21 | CategoryBadge | ✅ 实现分类标签组件，支持半透明背景和模糊效果 |
| 2026-01-21 | StatusBadge | ✅ 实现状态标签组件，支持 NEW/HOT/LEFT 三种状态样式 |
| 2026-01-21 | MarketCard | ✅ 实现市场预测卡片组件，包含完整的卡片布局、进度条、统计信息和操作按钮 |

---

## 备注

- 所有组件使用 TypeScript 开发
- 所有组件需要支持响应式设计
- 图标使用 Lucide React
- 遵循 Next.js 16 最佳实践
