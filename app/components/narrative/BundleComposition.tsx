import BundleComponentCard from './BundleComponentCard'

export interface BundleComponent {
  id: string
  title: string
  resolutionSource: string
  weight: number
  progressColor?: 'long' | 'short' | 'neutral'
  polymarketUrl?: string
}

interface BundleCompositionProps {
  components: BundleComponent[]
}

export default function BundleComposition({
  components,
}: BundleCompositionProps) {
  return (
    <div className="mt-8">
      {/* 头部 */}
      <div className="mb-6">
        <h2 className="text-text-primary text-2xl font-bold">
          Bundle Composition
        </h2>
      </div>

      {/* 组成项列表 */}
      <div className="space-y-4">
        {components.map((component) => (
          <BundleComponentCard
            key={component.id}
            title={component.title}
            resolutionSource={component.resolutionSource}
            weight={component.weight}
            progressColor={component.progressColor}
            polymarketUrl={component.polymarketUrl}
          />
        ))}
      </div>
    </div>
  )
}
