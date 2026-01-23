interface PayoutInfoProps {
  amount: number
  isWinner: boolean
}

export default function PayoutInfo({ amount, isWinner }: PayoutInfoProps) {
  return (
    <div className="flex flex-col">
      <span className={`${isWinner ? 'text-text-primary' : 'text-text-tertiary'} font-semibold text-base`}>
        ${amount.toFixed(2)}
      </span>
      <span className={`${isWinner ? 'text-new' : 'text-text-tertiary'} text-sm`}>
        {isWinner ? 'Winner' : 'Lost'}
      </span>
    </div>
  )
}
