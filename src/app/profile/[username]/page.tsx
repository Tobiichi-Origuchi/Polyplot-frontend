import UserPageClient from './UserPageClient'

interface UserPageProps {
  params: Promise<{
    username: string
  }>
}

export async function generateStaticParams() {
  return [
    { username: 'demo' }
  ]
}

export default async function UserPage({ params }: UserPageProps) {
  const { username } = await params

  // TODO: Fetch user data from API based on username
  // For now, using mock data
  const userData = {
    username,
    bio: 'Crypto enthusiast | Long-term investor | Building the future of prediction markets',
    joinDate: 'Jan 2026',
    views: 0,
    positionsValue: '$0.00',
    biggestWin: '$0.00',
    profitLoss: '$0.00'
  }

  return <UserPageClient userData={userData} />
}
