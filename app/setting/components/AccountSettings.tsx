'use client'

export default function AccountSettings() {
  return (
    <div className="flex-1 bg-bg-primary p-4 lg:p-6">
      <div className="max-w-3xl">
        <h1 className="text-text-primary text-2xl lg:text-3xl font-bold mb-6">
          Account Settings
        </h1>

        <div className="bg-bg-card border border-border-primary rounded-xl p-6">
          <p className="text-text-secondary text-base">
            Account security and authentication settings will be available here.
          </p>
          <p className="text-text-tertiary text-sm mt-3">
            Features: Password change, Two-factor authentication, Login history, etc.
          </p>
        </div>
      </div>
    </div>
  )
}
