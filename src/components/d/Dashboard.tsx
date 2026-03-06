import React, { useState } from 'react';
import { Nav } from './nav';
import { ShowAll } from './showall';
import { Docs } from './docs';
import { CreateBucket } from './CreateBucket';
import { CreateData } from './CreateData';
import { useTheme } from '../../contexts/ThemeContext';

export const Dashboard = () => {
  const [currentView, setCurrentView] = useState<'home' | 'docs'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewBucket, setShowNewBucket] = useState(false);
  const [showNewData, setShowNewData] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const handleViewChange = (view: 'home' | 'docs') => {
    setCurrentView(view);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto p-6">
        <Nav
          currentView={currentView}
          onViewChange={handleViewChange}
          onNewBucket={() => setShowNewBucket(true)}
          onNewData={() => setShowNewData(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {currentView === 'home' ? (
          <ShowAll searchQuery={searchQuery} />
        ) : (
          <Docs onBack={() => setCurrentView('home')} />
        )}

        {/* New Bucket Dialog */}
        {showNewBucket && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className={`relative w-full max-w-2xl p-6 rounded-2xl ${
              isDark ? 'bg-gray-900' : 'bg-white'
            } shadow-xl`}>
              <CreateBucket onClose={() => setShowNewBucket(false)} />
            </div>
          </div>
        )}

        {/* New Data Dialog */}
        {showNewData && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className={`relative w-full max-w-2xl p-6 rounded-2xl ${
              isDark ? 'bg-gray-900' : 'bg-white'
            } shadow-xl`}>
              <CreateData onClose={() => setShowNewData(false)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};