'use client'

import { useState } from 'react'
import { Layers } from 'lucide-react'
import TimeFilterButton from './TimeFilterButton'

type TimeFilter = '1D' | '1W' | '1M' | 'ALL'

interface ProfitLossChartProps {
  profitLoss: string
  period?: string
  isPositive?: boolean
}

export default function ProfitLossChart({
  profitLoss,
  period = 'Past Month',
  isPositive = true
}: ProfitLossChartProps) {
  const [activeFilter, setActiveFilter] = useState<TimeFilter>('1M')

  const handleFilterChange = (filter: TimeFilter) => {
    setActiveFilter(filter)
    // TODO: 在这里处理时间筛选逻辑，更新图表数据
    console.log('Filter changed to:', filter)
  }

  return (
    <div className="bg-bg-card rounded-2xl border border-border-primary p-4">
      {/* 头部区域 */}
      <div className="flex justify-between items-start mb-4">
        {/* 左侧：标题和数据 */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div
              className={`w-2 h-2 rounded-full ${
                isPositive ? 'bg-new' : 'bg-left'
              }`}
            />
            <h2 className="text-text-primary text-sm font-semibold">
              Profit/Loss
            </h2>
          </div>
          <p className="text-text-primary text-3xl font-bold mb-1">
            {profitLoss}
          </p>
          <p className="text-text-secondary text-xs">{period}</p>
        </div>

        {/* 右侧：时间筛选和 Polymarket 标识 */}
        <div className="flex flex-col items-end gap-2">
          {/* 时间筛选按钮组 */}
          <div className="flex gap-1.5">
            <TimeFilterButton
              active={activeFilter === '1D'}
              onClick={() => handleFilterChange('1D')}
            >
              1D
            </TimeFilterButton>
            <TimeFilterButton
              active={activeFilter === '1W'}
              onClick={() => handleFilterChange('1W')}
            >
              1W
            </TimeFilterButton>
            <TimeFilterButton
              active={activeFilter === '1M'}
              onClick={() => handleFilterChange('1M')}
            >
              1M
            </TimeFilterButton>
            <TimeFilterButton
              active={activeFilter === 'ALL'}
              onClick={() => handleFilterChange('ALL')}
            >
              ALL
            </TimeFilterButton>
          </div>

          {/* Polyplot 标识 */}
          <div className="flex items-center gap-1.5 text-text-tertiary">
            <Layers className="w-3.5 h-3.5" />
            <span className="text-xs">Polyplot</span>
          </div>
        </div>
      </div>

      {/* 图表区域 */}
      <div className="h-36 bg-gradient-to-b from-transparent via-bg-secondary to-bg-secondary rounded-lg flex items-center justify-center">
        {/* 图表占位符 - 待集成图表库 */}
        <p className="text-text-tertiary text-sm">Chart - Coming Soon</p>
      </div>
    </div>
  )
}
