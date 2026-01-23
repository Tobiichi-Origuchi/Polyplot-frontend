interface AvailableBalanceCardProps {
  balance: number
}

export default function AvailableBalanceCard({ balance }: AvailableBalanceCardProps) {
  const isWithdrawDisabled = balance < 0.5

  return (
    <div className="bg-bg-card rounded-2xl p-6 border border-border-primary relative overflow-hidden">
      {/* 装饰性背景图标 */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-5">
        <div className="text-9xl font-bold text-text-primary">$</div>
      </div>

      {/* 内容 - 左右布局 */}
      <div className="relative z-10 flex items-center justify-between">
        {/* 左侧：金额信息 */}
        <div className="flex-1">
          <p className="text-text-secondary text-sm mb-2">Available USDC</p>
          <h2 className="text-currency text-4xl font-bold mb-2">
            ${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h2>
          <div className="flex items-center gap-2 text-text-tertiary text-sm">
            <div className="w-2 h-2 rounded-full bg-text-tertiary"></div>
            <span>Ready to trade</span>
          </div>
          {/* 最小余额提示 */}
          {isWithdrawDisabled && (
            <p className="text-text-tertiary text-xs mt-2">
              Minimum $0.50 required to withdraw
            </p>
          )}
        </div>

        {/* 右侧：Deposit & Withdraw Buttons */}
        <div className="flex flex-col gap-3">
          <button
            className="bg-long hover:bg-long-hover text-black font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Deposit
          </button>
          <button
            className={`font-semibold px-6 py-3 rounded-lg transition-colors ${
              isWithdrawDisabled
                ? 'bg-bg-secondary text-text-tertiary cursor-not-allowed opacity-50'
                : 'bg-short hover:bg-short-hover text-white'
            }`}
            disabled={isWithdrawDisabled}
          >
            Withdraw
          </button>
        </div>
      </div>
    </div>
  )
}
