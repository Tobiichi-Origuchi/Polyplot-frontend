'use client'

import { useState } from 'react'
import { Search, ArrowUpDown } from 'lucide-react'

type Tab = 'positions' | 'activity'
type Status = 'active' | 'closed'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface PositionsActivitySectionProps {
  // 可以后续添加数据 props
}

// TabButton 子组件
const TabButton = ({
  active,
  onClick,
  children
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) => (
  <button
    onClick={onClick}
    className={`relative text-lg font-semibold pb-3 transition-colors ${
      active ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'
    }`}
  >
    {children}
    {active && (
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-long rounded-full" />
    )}
  </button>
)

// StatusButton 子组件
const StatusButton = ({
  active,
  onClick,
  children
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) => (
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
)

export default function PositionsActivitySection({}: PositionsActivitySectionProps) {
  const [activeTab, setActiveTab] = useState<Tab>('positions')
  const [activeStatus, setActiveStatus] = useState<Status>('active')
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div>
      {/* Positions/Activity 标签栏 */}
      <div className="flex gap-8 mb-6 border-b border-border-primary">
        <TabButton active={activeTab === 'positions'} onClick={() => setActiveTab('positions')}>
          Positions
        </TabButton>
        <TabButton active={activeTab === 'activity'} onClick={() => setActiveTab('activity')}>
          Activity
        </TabButton>
      </div>

      {/* Positions 内容区 */}
      {activeTab === 'positions' && (
        <div className="bg-bg-card rounded-2xl border border-border-primary p-6">
          {/* 控制栏 */}
          <div className="flex justify-between items-center mb-6 gap-4">
            {/* 左侧：Active/Closed 切换 */}
            <div className="flex gap-2">
              <StatusButton
                active={activeStatus === 'active'}
                onClick={() => setActiveStatus('active')}
              >
                Active
              </StatusButton>
              <StatusButton
                active={activeStatus === 'closed'}
                onClick={() => setActiveStatus('closed')}
              >
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
              <div className="text-text-tertiary text-xs font-semibold uppercase tracking-wide">
                Market
              </div>
              <div className="text-text-tertiary text-xs font-semibold uppercase tracking-wide">
                Avg
              </div>
              <div className="text-text-tertiary text-xs font-semibold uppercase tracking-wide">
                Current
              </div>
              <div className="text-text-tertiary text-xs font-semibold uppercase tracking-wide text-right flex items-center justify-end gap-1">
                Value
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
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
    </div>
  )
}
