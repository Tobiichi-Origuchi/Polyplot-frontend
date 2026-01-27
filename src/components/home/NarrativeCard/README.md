# NarrativeCard 组件架构

## 📁 文件结构

```
NarrativeCard/
├── index.tsx              # 主组件入口，管理状态和业务逻辑
├── types.ts               # TypeScript 类型定义
├── CardHeader.tsx         # 卡片头部（图片、分类、状态标签）
├── DefaultView.tsx        # 默认视图（进度条、统计、交易按钮）
├── InputView.tsx          # 输入模式视图（金额输入界面）
├── ProgressBar.tsx        # Long/Short 百分比进度条
├── StatsInfo.tsx          # 统计信息（交易量、参与者）
├── TradeButtons.tsx       # Buy Long/Short 按钮组
└── AmountInput.tsx        # 金额输入控件（输入框、快捷按钮、滑块）
```

## 🎯 组件职责

### index.tsx
- **职责**: 主容器组件，管理所有状态和业务逻辑
- **状态管理**:
  - 交易模式切换 (默认/输入)
  - 交易类型 (Long/Short)
  - 金额管理
  - 认证流程
- **依赖**: 所有子组件

### types.ts
- **职责**: 集中管理类型定义
- **导出**:
  - `NarrativeCardProps`: 主组件 props 接口
  - `TradeType`: 交易类型 ('long' | 'short')

### CardHeader.tsx
- **职责**: 显示卡片头部
- **功能**:
  - 背景图片展示
  - 分类标签 (CategoryBadge)
  - 状态标签 (StatusBadge)
  - 点击跳转详情页

### DefaultView.tsx
- **职责**: 默认视图容器
- **子组件**:
  - ProgressBar (进度条)
  - StatsInfo (统计信息)
  - TradeButtons (交易按钮)

### InputView.tsx
- **职责**: 金额输入视图容器
- **子组件**:
  - AmountInput (金额输入)
  - ProgressBar (进度条)
- **功能**:
  - 显示当前价格
  - 计算潜在收益
  - 确认交易

### ProgressBar.tsx
- **职责**: 显示 Long/Short 比例
- **特性**:
  - 响应式宽度
  - 平滑过渡动画

### StatsInfo.tsx
- **职责**: 显示市场统计信息
- **数据**:
  - 交易量 (Volume)
  - 参与者数量
  - 参与者头像

### TradeButtons.tsx
- **职责**: Buy Long/Short 按钮组
- **特性**:
  - 响应式布局
  - 悬停动画
  - 图标 + 文字

### AmountInput.tsx
- **职责**: 金额输入控件
- **功能**:
  - 数字输入框
  - 快捷增加按钮 (+1, +10)
  - 滑块调节 (1-1000)
- **验证**: 自动限制在 1-1000 范围

## 🔄 数据流

```
index.tsx (状态管理)
    ↓
    ├─→ CardHeader (只读 props)
    └─→ DefaultView / InputView (props + callbacks)
         ↓
         ├─→ ProgressBar (只读 props)
         ├─→ StatsInfo (只读 props)
         ├─→ TradeButtons (callbacks)
         └─→ AmountInput (双向绑定)
```

## 🎨 设计模式

- **容器/展示组件分离**: index.tsx 管理逻辑，子组件负责展示
- **单一职责**: 每个组件只负责一个功能
- **Props 向下传递**: 使用 props 传递数据和回调
- **类型安全**: 所有组件都有完整的 TypeScript 类型定义

## 🚀 使用示例

```tsx
import NarrativeCard, { NarrativeCardProps } from '@/components/home/NarrativeCard';

const market: NarrativeCardProps = {
  id: 'bitcoin-halving',
  category: 'CRYPTO',
  title: 'Bitcoin Halving Effect',
  // ... 其他属性
};

<NarrativeCard
  {...market}
  onBuyLong={() => console.log('Buy Long')}
  onBuyShort={() => console.log('Buy Short')}
/>
```

## 📝 维护指南

### 添加新功能
1. 评估功能属于哪个子组件
2. 如果是新的独立功能，创建新的子组件
3. 在 index.tsx 中添加状态和逻辑
4. 通过 props 传递给子组件

### 修改样式
- 在对应的子组件中修改 Tailwind 类名
- 遵循项目的 CLAUDE.md 设计规范

### 优化性能
- 考虑使用 React.memo() 包装纯展示组件
- 使用 useCallback() 优化回调函数
- 避免在子组件中进行复杂计算

## 🔗 相关文件

- `/src/components/home/CategoryBadge.tsx` - 分类标签
- `/src/components/home/StatusBadge.tsx` - 状态标签
- `/src/components/auth/AuthorizationModal.tsx` - 授权弹窗
- `/src/contexts/AuthContext.tsx` - 认证上下文
