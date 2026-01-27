import { TradeType } from './types';
import AmountInput from './AmountInput';
import ProgressBar from './ProgressBar';

interface InputViewProps {
  title: string;
  description: string;
  tradeType: TradeType;
  amount: number;
  currentPrice: string;
  potentialProfit: string;
  longPercentage: number;
  shortPercentage: number;
  onAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAmountBlur: () => void;
  onQuickAdd: (value: number) => void;
  onSliderChange: (value: number) => void;
  onConfirm: () => void;
}

export default function InputView({
  title,
  description,
  tradeType,
  amount,
  currentPrice,
  potentialProfit,
  longPercentage,
  shortPercentage,
  onAmountChange,
  onAmountBlur,
  onQuickAdd,
  onSliderChange,
  onConfirm,
}: InputViewProps) {
  return (
    <>
      <h3 className="text-text-primary font-bold text-xl mb-2 truncate">
        {title}
      </h3>
      <p className="text-text-secondary text-sm mb-4 line-clamp-2 h-10">
        {description}
      </p>

      {/* 金额输入界面 */}
      <div className="relative flex-1 flex flex-col">
        {/* Position Amount 和 Buying Long/Short 标签 */}
        <div className="flex justify-between items-center mb-3">
          <span className="text-text-secondary text-sm font-medium">
            Position Amount
          </span>
          <span className={`${tradeType === 'long' ? 'bg-long text-black' : 'bg-short text-white'} px-3 py-1 rounded-md text-sm font-semibold`}>
            Buying {tradeType === 'long' ? 'Long' : 'Short'}
          </span>
        </div>

        {/* 金额输入行 */}
        <AmountInput
          amount={amount}
          tradeType={tradeType}
          onAmountChange={onAmountChange}
          onAmountBlur={onAmountBlur}
          onQuickAdd={onQuickAdd}
          onSliderChange={onSliderChange}
        />

        {/* 收益和单价信息 */}
        <div className="flex justify-between items-center mb-4 px-2">
          <div className="flex flex-col">
            <span className="text-text-tertiary text-xs">Current Price</span>
            <span className="text-text-primary text-sm font-semibold">${currentPrice}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-text-tertiary text-xs">Potential Profit</span>
            <span className={`text-sm font-semibold ${tradeType === 'long' ? 'text-long' : 'text-short'}`}>
              +${potentialProfit}
            </span>
          </div>
        </div>

        {/* 确认按钮 */}
        <button
          onClick={onConfirm}
          className={`w-full ${tradeType === 'long' ? 'bg-long hover:bg-long-hover text-black' : 'bg-short hover:bg-short-hover text-white'} font-bold py-3 rounded-lg transition-colors mb-4`}
        >
          Confirm {tradeType === 'long' ? 'Long' : 'Short'}
        </button>

        {/* 进度条 */}
        <div className="mt-auto">
          <ProgressBar longPercentage={longPercentage} shortPercentage={shortPercentage} />
        </div>
      </div>
    </>
  );
}
