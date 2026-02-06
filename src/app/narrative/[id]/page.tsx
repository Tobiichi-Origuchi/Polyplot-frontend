import NarrativeDetailClient from './NarrativeDetailClient'

export async function generateStaticParams() {
  return [
    { id: 'bitcoin-halving-effect' },
    { id: 'ai-market-prediction' }
  ]
}

export default function NarrativeDetailPage() {
  return <NarrativeDetailClient />
}
