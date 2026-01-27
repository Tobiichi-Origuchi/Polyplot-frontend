'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import ProfileSettings from './ProfileSettings';
import NotificationSettings from './NotificationSettings';

type SettingTab = 'profile' | 'notifications';

export default function SettingContent() {
  const [activeTab, setActiveTab] = useState<SettingTab>('profile');

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSettings />;
      case 'notifications':
        return <NotificationSettings />;
      default:
        return <ProfileSettings />;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Sidebar - 自动适配桌面端和移动端 */}
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Content Area */}
      {renderContent()}
    </div>
  );
}
