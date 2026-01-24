'use client'

export default function TradingSettings() {
  return (
    <div className="flex-1 bg-bg-primary p-4 lg:p-6">
      <div className="max-w-3xl">
        <h1 className="text-text-primary text-2xl lg:text-3xl font-bold mb-6">
          Trading Settings
        </h1>

        <div className="bg-bg-card border border-border-primary rounded-xl p-6">
          <p className="text-text-secondary text-base">
            Trading preferences and risk management settings will be available here.
          </p>
          <p className="text-text-tertiary text-sm mt-3">
            Features: Default position size, Risk tolerance, Trading limits, etc.
          </p>
        </div>
      </div>
    </div>
  )
}
