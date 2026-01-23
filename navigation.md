# Navigation 导航栏组件文档

本文档记录 Polyplot 前端项目的全局导航栏组件及其子组件。

## 组件路径

建议路径: `app/components/navigation/`

## 组件命名规范

- 所有组件使用 PascalCase 命名
- 组件文件名与组件名保持一致

---

## UI 设计概览

Navigation 是固定在页面顶部的全局导航栏，包含以下元素（从左到右）：

1. **Logo** - 品牌标识 "Narrative"
2. **SearchBar** - 搜索框 "Search markets, users, or topics..."
3. **NavLinks** - 导航链接 (Explore, Portfolio, Leaderboard)
4. **BalanceDisplay** - 余额显示 ($1,240.50) + 充值按钮
5. **UserAvatar** - 用户头像 + 在线状态
6. **ThemeToggle** - 主题切换按钮

---

## 组件列表

### Navigation (主容器)
- **文件**: `app/components/navigation/Navigation.tsx`
- **作用**: 顶部导航栏主容器
- **职责**:
  - 整合所有导航子组件
  - 固定在页面顶部 (`sticky top-0` 或 `fixed top-0`)
  - 响应式布局处理
  - 添加背景模糊和半透明效果
- **使用的颜色**:
  - 背景: `bg-bg-primary/95 backdrop-blur-md`
  - 边框: `border-b border-border-primary`
- **样式细节**:
  - 高度: `h-16` 或 `h-20`
  - 内边距: `px-6 lg:px-12`
  - z-index: `z-50`
  - 布局: `flex items-center justify-between`

---

### Logo
- **文件**: `app/components/navigation/Logo.tsx`
- **作用**: 品牌标识组件
- **职责**:
  - 显示品牌 Logo 图标和 "Narrative" 文字
  - 提供回到首页的链接 (`Link href="/"`)
  - Logo 图标为渐变橙紫色方块，带圆角
- **使用的颜色**:
  - Logo 图标: 渐变背景 `bg-gradient-to-br from-long to-short`
  - 文字颜色: `text-text-primary`
- **样式细节**:
  - Logo 图标尺寸: `w-10 h-10` 或 `w-12 h-12`
  - 圆角: `rounded-lg` 或 `rounded-xl`
  - 文字大小: `text-xl` 或 `text-2xl`
  - 文字字重: `font-bold`
  - 容器布局: `flex items-center gap-3`
  - 悬停效果: `hover:opacity-80 transition-opacity`

---

### SearchBar
- **文件**: `app/components/navigation/SearchBar.tsx`
- **作用**: 全局搜索输入框
- **职责**:
  - 搜索市场、用户或话题
  - 显示搜索图标（左侧）
  - 支持实时搜索建议（可选功能）
  - 响应式：移动端可隐藏或折叠为图标按钮
- **使用的颜色**:
  - 背景: `bg-bg-secondary` 或 `bg-bg-card`
  - Placeholder 文本: `text-text-secondary`
  - 输入文本: `text-text-primary`
  - 边框: `border border-border-primary`
  - 图标: `text-text-secondary`
- **样式细节**:
  - 宽度: `w-96` 或 `max-w-md`（桌面端）
  - 圆角: `rounded-lg` 或 `rounded-full`
  - 内边距: `px-4 py-2` 或 `pl-10 pr-4 py-2.5`
  - 图标: Lucide React 的 `Search` 图标
  - 图标位置: `absolute left-3`
  - 聚焦效果: `focus:outline-none focus:ring-2 focus:ring-long`

---

### NavLinks
- **文件**: `app/components/navigation/NavLinks.tsx`
- **作用**: 主导航链接组
- **职责**:
  - 显示主要导航项: Explore, Portfolio, Leaderboard
  - 高亮当前激活的导航项
  - 处理路由跳转 (Next.js `Link`)
  - 响应式：移动端可折叠为汉堡菜单
- **导航项列表**:
  - Explore (探索市场)
  - Portfolio (我的投资组合)
  - Leaderboard (排行榜)
- **使用的颜色**:
  - 激活状态: `text-currency` (金色) 或 `text-long` (橙色)
  - 未激活: `text-text-secondary`
  - 悬停: `hover:text-text-primary`
- **样式细节**:
  - 字重: `font-semibold` 或 `font-medium`
  - 字号: `text-base` 或 `text-sm`
  - 链接间距: `gap-6` 或 `gap-8`
  - 过渡: `transition-colors`
  - 布局: `flex items-center gap-6`

---

### BalanceDisplay
- **文件**: `app/components/navigation/BalanceDisplay.tsx`
- **作用**: 用户余额显示和充值按钮
- **职责**:
  - 显示当前用户余额（如 $1,240.50）
  - 提供充值按钮（+ 图标）
  - 点击充值按钮打开充值弹窗/页面
- **使用的颜色**:
  - 余额文字: `text-currency` (金色 #fbbf24)
  - 背景: `bg-bg-secondary` 或 `bg-bg-card`
  - 边框: `border border-border-primary` (可选)
  - 加号按钮背景: `bg-long hover:bg-long-hover`
  - 加号图标: `text-white`
- **样式细节**:
  - 容器圆角: `rounded-full`
  - 容器内边距: `pl-4 pr-1 py-1` (左侧留余额文字空间)
  - 余额字重: `font-bold`
  - 余额字号: `text-base` 或 `text-lg`
  - 加号按钮: 圆形 `w-8 h-8 rounded-full`
  - 加号图标: Lucide React 的 `Plus` 图标
  - 布局: `flex items-center gap-2`
  - 过渡: `transition-all`

---

### UserAvatar
- **文件**: `app/components/navigation/UserAvatar.tsx`
- **作用**: 用户头像和在线状态指示器
- **职责**:
  - 显示用户头像图片
  - 显示在线状态（右下角绿色小圆点）
  - 点击打开用户下拉菜单（个人设置、登出等）
  - 支持未登录状态的占位显示
- **使用的颜色**:
  - 头像边框: `border-2 border-border-primary` (可选)
  - 在线状态圆点: `bg-green-500` 或 `bg-emerald-500`
  - 圆点边框: `border-2 border-bg-primary` (与导航栏背景一致)
- **样式细节**:
  - 头像尺寸: `w-10 h-10` 或 `w-12 h-12`
  - 圆角: `rounded-full`
  - 在线状态尺寸: `w-3 h-3`
  - 在线状态位置: `absolute bottom-0 right-0`
  - 容器: `relative` (用于定位在线状态)
  - 悬停效果: `hover:opacity-80 cursor-pointer`
  - 过渡: `transition-opacity`

---

### ThemeToggle
- **文件**: `app/components/navigation/ThemeToggle.tsx`
- **作用**: 主题模式切换按钮
- **职责**:
  - 切换亮色/暗色主题
  - 显示对应主题图标（太阳/月亮）
  - 保存用户主题偏好到 localStorage
  - 与系统主题设置同步（可选）
- **使用的颜色**:
  - 背景: `bg-bg-secondary hover:bg-bg-card` 或透明
  - 图标颜色: `text-text-secondary hover:text-text-primary`
- **样式细节**:
  - 图标: Lucide React 的 `Sun` (亮色主题) / `Moon` (暗色主题)
  - 按钮尺寸: `w-10 h-10`
  - 圆角: `rounded-full` 或 `rounded-lg`
  - 图标大小: `size={20}` 或 `size={22}`
  - 过渡: `transition-all`
  - 居中对齐: `flex items-center justify-center`

---

## 组件依赖关系

```
Navigation
├── Logo
├── SearchBar
├── NavLinks
├── BalanceDisplay
├── UserAvatar
└── ThemeToggle
```

---

## 响应式设计

### 桌面端 (lg 及以上)
- 显示所有组件
- 水平排列
- 搜索框完整显示

### 平板端 (md - lg)
- 搜索框宽度缩小
- 导航链接保持显示
- 其他组件正常显示

### 移动端 (sm 及以下)
- Logo 保持显示
- 搜索框折叠为图标按钮
- NavLinks 折叠到汉堡菜单
- BalanceDisplay、UserAvatar、ThemeToggle 保持显示（或部分隐藏）

---

## 设计规范参考

遵循 `CLAUDE.md` 中定义的设计规范：

- **配色方案**: 使用自定义 Tailwind 颜色类
- **背景**: `bg-bg-primary` + 半透明和模糊效果
- **边框**: `border-border-primary`
- **过渡动画**: `transition-colors` / `transition-all`
- **圆角**: 按钮 `rounded-full` 或 `rounded-lg`
- **阴影**: 可选添加 `shadow-md`

---

## 交互行为

### SearchBar
- 聚焦时显示搜索建议下拉列表
- 支持键盘导航（上下箭头选择建议）
- ESC 键关闭建议列表

### NavLinks
- 当前路由对应的链接高亮显示
- 悬停时显示下划线或颜色变化

### BalanceDisplay
- 点击充值按钮打开充值模态框
- 余额数字可能带有动画效果（余额变化时）

### UserAvatar
- 点击打开用户下拉菜单
- 菜单包含：个人资料、设置、登出等选项

### ThemeToggle
- 点击切换主题
- 图标平滑旋转或淡入淡出过渡

---

## 更新日志

| 日期 | 组件 | 变更说明 |
|------|------|---------|
| 2026-01-20 | 所有组件 | 完成所有 Navigation 子组件开发 (Logo, SearchBar, NavLinks, BalanceDisplay, UserAvatar, ThemeToggle, Navigation) |
| 2026-01-20 | 演示页面 | 创建 /navigation-demo 演示页面 |
| 2026-01-20 | Navigation 组件体系 | 初始文档创建，定义所有子组件 |

---

## 备注

- Navigation 组件在所有页面共享，应放置在根布局 `app/layout.tsx` 中
- 所有组件使用 TypeScript 开发
- 图标使用 Lucide React
- 遵循 Next.js 16 最佳实践
- 考虑添加骨架屏加载状态（用户数据未加载时）
