'use client'

import { Mail, Bell } from 'lucide-react'
import { useState } from 'react'
import ToggleSwitch from './ToggleSwitch'

export default function NotificationSettings() {
  // Email notifications state
  const [emailResolutions, setEmailResolutions] = useState(true)

  // In-app notifications state
  const [inAppOrderFills, setInAppOrderFills] = useState(true)
  const [inAppResolutions, setInAppResolutions] = useState(true)

  return (
    <div className="flex-1 bg-bg-primary p-4 lg:p-6">
      <div className="max-w-3xl">
        <h1 className="text-text-primary text-2xl lg:text-3xl font-bold mb-6">
          Notifications Settings
        </h1>

        {/* Email Notifications Card */}
        <div className="bg-bg-card border border-border-primary rounded-xl p-6 mb-4">
          {/* Email Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-xl bg-bg-secondary flex items-center justify-center flex-shrink-0">
              <Mail className="w-7 h-7 text-text-primary" />
            </div>
            <h2 className="text-text-primary text-xl font-bold">Email</h2>
          </div>

          {/* Email Settings */}
          <div className="flex items-center justify-between">
            <span className="text-text-primary text-base">Resolutions</span>
            <ToggleSwitch
              enabled={emailResolutions}
              onChange={setEmailResolutions}
            />
          </div>
        </div>

        {/* In-app Notifications Card */}
        <div className="bg-bg-card border border-border-primary rounded-xl p-6">
          {/* In-app Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-xl bg-bg-secondary flex items-center justify-center flex-shrink-0">
              <Bell className="w-7 h-7 text-text-primary" />
            </div>
            <h2 className="text-text-primary text-xl font-bold">In-app</h2>
          </div>

          {/* In-app Settings */}
          <div className="space-y-4">
            {/* Order Fills */}
            <div className="flex items-center justify-between">
              <span className="text-text-primary text-base">Order Fills</span>
              <ToggleSwitch
                enabled={inAppOrderFills}
                onChange={setInAppOrderFills}
              />
            </div>

            {/* Resolutions */}
            <div className="flex items-center justify-between">
              <span className="text-text-primary text-base">Resolutions</span>
              <ToggleSwitch
                enabled={inAppResolutions}
                onChange={setInAppResolutions}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

