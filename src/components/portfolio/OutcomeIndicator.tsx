import { CheckCircle, XCircle } from 'lucide-react'

interface OutcomeIndicatorProps {
  outcome: 'yes' | 'no'
}

export default function OutcomeIndicator({ outcome }: OutcomeIndicatorProps) {
  const isYes = outcome === 'yes'

  return (
    <div className="flex items-center gap-2">
      {isYes ? (
        <CheckCircle className="w-5 h-5 text-new" />
      ) : (
        <XCircle className="w-5 h-5 text-left" />
      )}
      <span className={`${isYes ? 'text-new' : 'text-left'} font-semibold text-base`}>
        {isYes ? 'YES' : 'NO'}
      </span>
    </div>
  )
}
