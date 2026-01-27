# AIInsightButton 组件架构

## 📁 文件结构

```
AIInsightButton/
├── index.tsx              # 主组件入口，管理状态和业务逻辑
├── types.ts               # TypeScript 类型定义
├── aiResponses.ts         # AI 响应逻辑
├── AIButton.tsx           # AI Insight 按钮
├── DropdownContent.tsx    # 下拉内容容器
├── MarketAnalysis.tsx     # 市场趋势分析展示
├── MessageList.tsx        # 消息列表容器
├── MessageBubble.tsx      # 单个消息气泡
├── TypingIndicator.tsx    # AI 正在输入指示器
└── MessageInput.tsx       # 消息输入框
```

## 🎯 组件职责

### index.tsx
- **职责**: 主容器组件，管理所有状态和业务逻辑
- **状态管理**:
  - 下拉框开关状态
  - 消息列表管理
  - AI 输入状态
  - 动画状态控制
- **业务逻辑**:
  - 认证检查
  - 消息发送处理
  - AI 响应生成
  - 外部点击关闭
  - 自动滚动

### types.ts
- **职责**: 集中管理类型定义
- **导出**:
  - `Message`: 消息接口 (id, role, content, timestamp)

### aiResponses.ts
- **职责**: AI 响应生成逻辑
- **功能**:
  - 关键词匹配
  - 生成相应回复
  - 易于扩展和维护

### AIButton.tsx
- **职责**: AI Insight 主按钮
- **特性**:
  - 渐变背景
  - 悬停动画效果
  - 展开/收起图标切换
  - 使用 forwardRef 支持 ref 传递

### DropdownContent.tsx
- **职责**: 下拉内容容器
- **子组件**:
  - MarketAnalysis (市场分析)
  - MessageList (消息列表)
  - MessageInput (输入框)
- **特性**:
  - 展开/收起动画
  - 固定最大高度
  - 响应式宽度

### MarketAnalysis.tsx
- **职责**: 显示市场趋势分析
- **功能**:
  - AI 图标
  - 分析内容展示
  - 时间戳显示

### MessageList.tsx
- **职责**: 消息列表容器
- **子组件**:
  - MessageBubble (消息气泡)
  - TypingIndicator (输入指示器)
- **特性**:
  - 可滚动区域
  - 自动滚动到底部
  - 条件渲染

### MessageBubble.tsx
- **职责**: 单个消息气泡
- **功能**:
  - 用户/AI 消息区分
  - 不同样式展示
  - 头像图标

### TypingIndicator.tsx
- **职责**: AI 正在输入指示器
- **特性**:
  - 动画点效果
  - AI 头像图标

### MessageInput.tsx
- **职责**: 消息输入框
- **功能**:
  - 文本输入
  - 发送按钮
  - 回车发送支持
  - 禁用状态管理

## 🔄 数据流

```
index.tsx (状态管理)
    ↓
    ├─→ AIButton (props + ref)
    └─→ DropdownContent (props + callbacks + refs)
         ↓
         ├─→ MarketAnalysis (静态)
         ├─→ MessageList (messages + isTyping + ref)
         │    ↓
         │    ├─→ MessageBubble (message)
         │    └─→ TypingIndicator (条件渲染)
         └─→ MessageInput (双向绑定 + callbacks + ref)
```

## 📊 状态管理

### UI 状态
- `isOpen`: 下拉框是否打开
- `isClosing`: 关闭动画进行中
- `shouldRender`: 是否渲染下拉内容

### 消息状态
- `message`: 当前输入内容
- `messages`: 消息历史数组
- `isTyping`: AI 是否正在输入

### Refs
- `buttonRef`: 按钮元素引用
- `contentRef`: 下拉内容引用
- `messagesContainerRef`: 消息容器引用
- `inputContainerRef`: 输入框容器引用
- `closeTimeoutRef`: 关闭定时器引用

## 🎨 设计模式

### 1. 容器/展示组件分离
- `index.tsx`: 容器组件，管理逻辑
- 子组件: 展示组件，负责 UI

### 2. 单一职责原则
每个组件只负责一个功能模块

### 3. Refs 转发
使用 `forwardRef` 支持 ref 传递

### 4. 事件委托
在主组件统一处理事件逻辑

### 5. 模块化逻辑
AI 响应逻辑独立于组件

## 🚀 使用示例

```tsx
import AIInsightButton from '@/components/home/AIInsightButton';

// 直接使用，无需传递 props
<AIInsightButton />
```

## 💡 核心功能

### 1. 认证检查
- 未登录: 点击打开登录弹窗
- 已登录: 切换下拉框显示

### 2. 消息系统
- 用户消息立即显示
- AI 响应延迟 1-2 秒模拟思考
- 自动滚动到最新消息

### 3. 动画效果
- 下拉框展开/收起动画
- 按钮悬停效果
- AI 输入指示器

### 4. 交互优化
- 点击外部自动关闭
- 回车键发送消息
- 输入框禁用状态

## 🔧 扩展指南

### 添加新的 AI 响应
在 `aiResponses.ts` 中添加新的关键词匹配逻辑：

```typescript
export function getAIResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase();

  if (lowerMessage.includes('your-keyword')) {
    return 'Your custom response';
  }
  // ... 其他逻辑
}
```

### 修改市场分析内容
编辑 `MarketAnalysis.tsx` 组件的内容

### 自定义样式
所有组件都使用 Tailwind CSS，遵循项目的设计规范

### 集成真实 AI API
在 `index.tsx` 的 `handleSendMessage` 函数中替换模拟逻辑：

```typescript
const handleSendMessage = async () => {
  // ... 现有代码

  // 调用真实 API
  const response = await fetch('/api/ai-chat', {
    method: 'POST',
    body: JSON.stringify({ message: userMessage.content }),
  });

  const data = await response.json();

  const aiResponse: Message = {
    id: (Date.now() + 1).toString(),
    role: 'ai',
    content: data.response,
    timestamp: new Date(),
  };

  setMessages(prev => [...prev, aiResponse]);
  setIsTyping(false);
};
```

## 📝 维护指南

### 性能优化建议
- 考虑使用 `React.memo` 优化 MessageBubble
- 使用 `useCallback` 优化回调函数
- 消息列表过长时考虑虚拟滚动

### 测试要点
- 认证状态切换
- 消息发送接收
- 动画流畅性
- 外部点击关闭
- 回车发送功能

## 🔗 相关依赖

- `@/contexts/AuthContext` - 认证上下文
- `lucide-react` - 图标库
- Tailwind CSS - 样式框架
