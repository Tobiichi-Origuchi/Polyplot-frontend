'use client'

import { useState } from 'react'
import { Search, ArrowUpDown, ExternalLink } from 'lucide-react'

type Tab = 'positions' | 'activity' | 'created'
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
          {/* 表头 */}
          <div className="grid grid-cols-[120px_1fr_180px] gap-6 pb-4 mb-6 border-b border-border-primary">
            <div className="text-text-tertiary text-xs font-semibold uppercase tracking-wide">
              Type
            </div>
            <div className="text-text-tertiary text-xs font-semibold uppercase tracking-wide">
              Market
            </div>
            <div className="text-text-tertiary text-xs font-semibold uppercase tracking-wide text-right">
              Amount
            </div>
          </div>

          {/* 活动列表 */}
          <div className="space-y-6">
            {/* Activity Item 1 - Buy */}
            <div className="grid grid-cols-[120px_1fr_180px] gap-6 items-center">
              {/* Type */}
              <div className="text-text-primary font-medium">Buy</div>

              {/* Market */}
              <div className="flex items-center gap-3">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-long flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">$</span>
                </div>

                {/* Market Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-text-primary font-medium text-base mb-1 truncate">
                    Will Bitcoin dip to $85,000 in January?
                  </h4>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="bg-short text-white px-2 py-0.5 rounded font-semibold">
                      No 73¢
                    </span>
                    <span className="text-text-secondary">1.4 shares</span>
                  </div>
                </div>
              </div>

              {/* Amount */}
              <div className="text-right">
                <div className="text-text-primary text-xl font-bold mb-1">$1.04</div>
                <button className="text-text-tertiary text-sm hover:text-text-primary transition-colors inline-flex items-center gap-1">
                  13 hours ago
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Activity Item 2 - Sell */}
            <div className="grid grid-cols-[120px_1fr_180px] gap-6 items-center">
              {/* Type */}
              <div className="text-text-primary font-medium">Sell</div>

              {/* Market */}
              <div className="flex items-center gap-3">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-short flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
                    <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                  </svg>
                </div>

                {/* Market Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-text-primary font-medium text-base mb-1 truncate">
                    Will a SpaceX Starship launch reach orbit in February?
                  </h4>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="bg-short text-white px-2 py-0.5 rounded font-semibold">
                      Yes 45¢
                    </span>
                    <span className="text-text-secondary">100.0 shares</span>
                  </div>
                </div>
              </div>

              {/* Amount */}
              <div className="text-right">
                <div className="text-text-primary text-xl font-bold mb-1">$45.00</div>
                <button className="text-text-tertiary text-sm hover:text-text-primary transition-colors inline-flex items-center gap-1">
                  1 day ago
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Activity Item 3 - Buy */}
            <div className="grid grid-cols-[120px_1fr_180px] gap-6 items-center">
              {/* Type */}
              <div className="text-text-primary font-medium">Buy</div>

              {/* Market */}
              <div className="flex items-center gap-3">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-bg-secondary flex items-center justify-center flex-shrink-0">
                  <svg
                    className="w-6 h-6 text-text-primary"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </div>

                {/* Market Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-text-primary font-medium text-base mb-1 truncate">
                    Will &apos;Oppenheimer&apos; win Best Picture at the Oscars?
                  </h4>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="bg-short text-white px-2 py-0.5 rounded font-semibold">
                      Yes 92¢
                    </span>
                    <span className="text-text-secondary">500.0 shares</span>
                  </div>
                </div>
              </div>

              {/* Amount */}
              <div className="text-right">
                <div className="text-text-primary text-xl font-bold mb-1">$460.00</div>
                <button className="text-text-tertiary text-sm hover:text-text-primary transition-colors inline-flex items-center gap-1">
                  3 days ago
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* End of Results */}
          <div className="mt-12 pt-8 border-t border-border-primary">
            <p className="text-text-tertiary text-sm text-center uppercase tracking-wider">
              End of Results
            </p>
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

          {/* Narratives 网格展示区域 */}
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
  )
}
