import { Download } from 'lucide-react'

interface StatusButtonProps {
  status: 'redeemable' | 'settled'
  onRedeem?: () => void
}

export default function StatusButton({ status, onRedeem }: StatusButtonProps) {
  const isRedeemable = status === 'redeemable'

  if (isRedeemable) {
    return (
      <button
        onClick={onRedeem}
        className="bg-new hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        <Download className="w-4 h-4" />
        Redeem
      </button>
    )
  }

  return (
    <button
      disabled
      className="bg-bg-secondary text-text-tertiary font-semibold px-6 py-2 rounded-lg cursor-not-allowed"
    >
      Settled
    </button>
  )
}
