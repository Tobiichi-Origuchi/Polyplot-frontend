'use client'

import Image from 'next/image'
import UserStatItem from './UserStatItem'


interface UserProfileCardProps {
  username: string
  avatar?: string
  bio?: string
  joinDate: string
  views: number
  positionsValue: string
  biggestWin?: string
}

export default function UserProfileCard({
  username,
  avatar,
  bio,
  joinDate,
  views,
  positionsValue,
  biggestWin = '$0'
}: UserProfileCardProps) {

  return (
    <div className="bg-bg-card rounded-2xl border border-border-primary p-6 relative flex flex-col">
      {/* 用户信息区域 */}
      <div className="flex items-start gap-4">
        {/* 头像 */}
        {avatar ? (
          <Image
            src={avatar}
            alt={username}
            width={64}
            height={64}
            className="w-16 h-16 rounded-full flex-shrink-0 object-cover"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 via-orange-400 to-yellow-400 flex-shrink-0" />
        )}

        {/* 用户名和元信息 */}
        <div className="flex-1 min-w-0">
          <h1 className="text-text-primary font-bold text-2xl truncate mb-2">
            {username}
          </h1>
          <p className="text-text-secondary text-sm">
            Joined {joinDate} <span className="mx-2">•</span> {views} views
          </p>
        </div>
      </div>

      {/* Bio 介绍栏 */}
      {bio && (
        <div className="mt-4 mb-2">
          <p className="text-text-secondary text-sm leading-relaxed">
            {bio}
          </p>
        </div>
      )}

      {/* 底部区域：统计数据 - 固定在底部 */}
      <div className="flex items-end gap-8 pt-6 border-t border-border-primary mt-auto">
        {/* Positions Value 统计 */}
        <div className="flex-shrink-0">
          <UserStatItem label="Positions Value" value={positionsValue} />
        </div>

        {/* Biggest Win 统计 */}
        <div className="flex-shrink-0">
          <UserStatItem label="Biggest Win" value={biggestWin} />
        </div>
      </div>
    </div>
  )
}
