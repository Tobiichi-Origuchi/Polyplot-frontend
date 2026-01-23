'use client'

import { User, Bell } from 'lucide-react'

type SettingTab = 'profile' | 'notifications'

interface SidebarProps {
  activeTab: SettingTab
  onTabChange: (tab: SettingTab) => void
}

const navItems = [
  { id: 'profile' as const, label: 'Profile', icon: User },
  { id: 'notifications' as const, label: 'Notifications', icon: Bell },
]

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-[240px] bg-bg-primary border-r border-border-primary p-4 min-h-screen">
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id

            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full text-left text-base font-medium px-4 py-3 rounded-lg transition-colors flex items-center gap-2.5 ${
                  isActive
                    ? 'bg-long !text-black font-semibold [&_svg]:!text-black'
                    : 'text-text-secondary hover:bg-bg-secondary'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            )
          })}
        </nav>
      </aside>

      {/* Mobile Top Navigation */}
      <nav className="lg:hidden bg-bg-primary border-b border-border-primary overflow-x-auto">
        <div className="flex gap-2 p-3">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id

            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`px-3 py-2 rounded-lg whitespace-nowrap font-semibold text-sm flex items-center gap-1.5 transition-colors ${
                  isActive
                    ? 'bg-long !text-black [&_svg]:!text-black'
                    : 'bg-bg-secondary text-text-secondary hover:bg-bg-card'
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </button>
            )
          })}
        </div>
      </nav>
    </>
  )
}
