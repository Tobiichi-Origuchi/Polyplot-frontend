import { TradeType } from './types';

interface AmountInputProps {
  amount: number;
  tradeType: TradeType;
  onAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAmountBlur: () => void;
  onQuickAdd: (value: number) => void;
  onSliderChange: (value: number) => void;
}

export default function AmountInput({
  amount,
  tradeType,
  onAmountChange,
  onAmountBlur,
  onQuickAdd,
  onSliderChange,
}: AmountInputProps) {
  return (
    <div className="flex gap-3 mb-4">
      {/* 金额输入框和快捷按钮合并 - 60% 宽度 */}
      <div className="w-[60%] bg-bg-secondary border border-border-primary rounded-xl px-4 py-3 flex items-center justify-between gap-3 focus-within:border-long/50 transition-colors">
        <div
          className="flex items-center gap-2 flex-1 min-w-0 cursor-text"
          onClick={(e) => {
            // 点击容器时聚焦输入框
            const input = e.currentTarget.querySelector('input');
            input?.focus();
          }}
        >
          <span className="text-text-primary text-xl font-bold">$</span>
          <input
            type="text"
            inputMode="numeric"
            value={amount}
            onChange={onAmountChange}
            onBlur={onAmountBlur}
            className="bg-transparent text-text-primary text-xl font-bold outline-none w-full min-w-0"
            placeholder="100"
          />
        </div>
        {/* 快捷按钮 */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onQuickAdd(1)}
            className="bg-bg-primary hover:bg-bg-card text-text-primary font-semibold px-2.5 py-1 rounded-md transition-colors text-sm whitespace-nowrap"
          >
            +1
          </button>
          <button
            onClick={() => onQuickAdd(10)}
            className="bg-bg-primary hover:bg-bg-card text-text-primary font-semibold px-2.5 py-1 rounded-md transition-colors text-sm whitespace-nowrap"
          >
            +10
          </button>
        </div>
      </div>

      {/* 滑块 - 40% 宽度 */}
      <div className="w-[40%] flex items-center">
        <input
          type="range"
          min="1"
          max="1000"
          value={amount}
          onChange={(e) => onSliderChange(Number(e.target.value))}
          className={`w-full h-2 rounded-full appearance-none cursor-pointer ${tradeType === 'long' ? 'text-long' : 'text-short'}`}
          style={{
            background: `linear-gradient(to right, ${tradeType === 'long' ? '#fb923c' : '#a855f7'} 0%, ${tradeType === 'long' ? '#fb923c' : '#a855f7'} ${(amount / 1000) * 100}%, #1a1a1a ${(amount / 1000) * 100}%, #1a1a1a 100%)`,
          }}
        />
      </div>
    </div>
  );
}
