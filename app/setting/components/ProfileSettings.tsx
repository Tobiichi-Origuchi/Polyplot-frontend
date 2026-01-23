'use client'

import { Upload, X } from 'lucide-react'
import { useState } from 'react'

export default function ProfileSettings() {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('crazyjjj')
  const [bio, setBio] = useState('')

  const handleSaveChanges = () => {
    // TODO: Implement save logic
    console.log('Saving changes...', { email, username, bio })
  }

  const handleUploadAvatar = () => {
    // TODO: Implement avatar upload logic
    console.log('Upload avatar clicked')
  }

  const handleConnectX = () => {
    // TODO: Implement X (Twitter) connection logic
    console.log('Connect X clicked')
  }

  return (
    <div className="flex-1 bg-bg-primary p-4 lg:p-6">
      <div className="max-w-3xl">
        <h1 className="text-text-primary text-2xl lg:text-3xl font-bold mb-6">
          Profile Settings
        </h1>

        {/* Avatar Upload Section */}
        <div className="flex items-center gap-4 mb-6">
          {/* Avatar with gradient */}
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 via-yellow-400 to-purple-600 flex items-center justify-center flex-shrink-0">
            {/* Placeholder for user avatar */}
          </div>

          {/* Upload Button */}
          <button
            onClick={handleUploadAvatar}
            className="bg-bg-secondary hover:bg-bg-card text-text-primary font-semibold px-4 py-2.5 rounded-lg transition-colors flex items-center gap-2 border border-border-primary"
          >
            <Upload className="w-4 h-4" />
            Upload
          </button>
        </div>

        {/* Email Field */}
        <div className="mb-5">
          <label className="block text-text-primary text-sm font-semibold mb-1.5">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-bg-card border border-border-primary rounded-lg px-4 py-2.5 text-text-primary placeholder-text-tertiary focus:outline-none focus:border-long transition-colors"
            placeholder="your@email.com"
          />
          <p className="text-text-tertiary text-sm mt-1.5">
            Receive important market updates
          </p>
        </div>

        {/* Username Field */}
        <div className="mb-5">
          <label className="block text-text-primary text-sm font-semibold mb-1.5">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-bg-card border border-border-primary rounded-lg px-4 py-2.5 text-text-primary placeholder-text-tertiary focus:outline-none focus:border-long transition-colors"
            placeholder="username"
          />
        </div>

        {/* Bio Field */}
        <div className="mb-6">
          <label className="block text-text-primary text-sm font-semibold mb-1.5">
            Bio
          </label>
          <textarea
            rows={4}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full bg-bg-card border border-border-primary rounded-lg px-4 py-2.5 text-text-primary placeholder-text-tertiary focus:outline-none focus:border-long transition-colors resize-none"
            placeholder="Bio"
          />
        </div>

        {/* Social Connections */}
        <div className="mb-6">
          <h3 className="text-text-primary text-base font-semibold mb-3">
            Social Connections
          </h3>

          <button
            onClick={handleConnectX}
            className="bg-bg-card hover:bg-bg-secondary border border-border-primary text-text-primary font-semibold px-4 py-2.5 rounded-lg transition-colors flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Connect X
          </button>
        </div>

        {/* Save Changes Button */}
        <button
          onClick={handleSaveChanges}
          className="bg-long hover:bg-long-hover text-black font-bold px-6 py-3 rounded-lg transition-colors"
        >
          Save changes
        </button>
      </div>
    </div>
  )
}
