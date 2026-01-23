import Image from 'next/image'

interface PriceHistoryCardProps {
  imageUrl: string
  altText: string
  isLive?: boolean
}

export default function PriceHistoryCard({
  imageUrl,
  altText,
  isLive = true,
}: PriceHistoryCardProps) {
  return (
    <div className="bg-bg-card rounded-2xl overflow-hidden border border-border-primary relative">
      {/* LIVE MARKET 标签 */}
      {isLive && (
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-new text-white px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            LIVE MARKET
          </span>
        </div>
      )}

      {/* 图片占位区域 */}
      <div className="relative h-80 flex items-center justify-center bg-gradient-to-br from-bg-secondary to-bg-primary">
        <Image
          src={imageUrl}
          alt={altText}
          width={800}
          height={320}
          className="w-full h-full object-cover opacity-90"
        />

        {/* 价格历史可视化文字叠加 */}
        <div className="absolute inset-0 flex items-center justify-center bg-bg-primary/30 backdrop-blur-sm">
          <span className="text-text-secondary text-sm font-medium">
            Price History Visualization
          </span>
        </div>
      </div>
    </div>
  )
}
