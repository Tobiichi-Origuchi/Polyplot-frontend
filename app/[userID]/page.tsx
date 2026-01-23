import UserPageClient from './UserPageClient'

interface UserPageProps {
  params: Promise<{
    userID: string
  }>
}

export default async function UserPage({ params }: UserPageProps) {
  const { userID } = await params

  // TODO: Fetch user data from API based on userID
  // For now, using mock data
  const userData = {
    username: userID,
    joinDate: 'Jan 2026',
    views: 0,
    positionsValue: '$0.00',
    profitLoss: '$0.00',
    isConnected: false
  }

  return <UserPageClient userData={userData} />
}
