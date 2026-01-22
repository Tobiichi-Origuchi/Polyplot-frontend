'use client';

interface BalanceDisplayProps {
  balance?: number;
  onDeposit?: () => void;
}

export default function BalanceDisplay({ balance = 1240.50, onDeposit }: BalanceDisplayProps) {
  return (
    <>
      {/* Balance Amount Display */}
      <div className="bg-bg-secondary rounded-lg px-4 py-2.5 border border-border-primary">
        <span className="text-currency font-bold text-lg">
          ${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
      </div>

      {/* Deposit Button */}
      <button
        onClick={onDeposit}
        className="bg-long hover:bg-long-hover text-black font-semibold px-5 py-2.5 rounded-lg transition-colors"
      >
        Deposit
      </button>
    </>
  );
}
