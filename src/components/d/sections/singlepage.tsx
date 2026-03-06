import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Settings, Users, Database, Activity } from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';
import { DataShow } from './datashow';
import { Overview } from './overview';

interface Tab {
  id: string;
  name: string;
  icon: React.ElementType;
}

const tabs: Tab[] = [
  { id: 'overview', name: 'Overview', icon: Activity },
  { id: 'data', name: 'Data', icon: Database },
  { id: 'users', name: 'Users', icon: Users },
  { id: 'settings', name: 'Settings', icon: Settings },
];

export const SinglePage = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    // You can add any initialization logic here
  }, [id]);

  const handleBack = () => {
    navigate('/datahub');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <Overview bucketId={id} />;
      case 'data':
        return <DataShow bucketId={id} />;
      case 'users':
        return <div>Users Content</div>;
      case 'settings':
        return <div>Settings Content</div>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen mt-16 bg-white dark:bg-black transition-colors duration-300">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={handleBack}
                className={`p-2 rounded-lg ${
                  isDark
                    ? 'hover:bg-white/10 text-gray-400 hover:text-white'
                    : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                } transition-colors`}
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className={`ml-4 text-xl font-semibold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Bucket Details
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center px-3 py-4 text-sm font-medium border-b-2 
                    ${activeTab === tab.id
                      ? isDark
                        ? 'border-blue-500 text-blue-500'
                        : 'border-blue-600 text-blue-600'
                      : isDark
                        ? 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                    transition-colors duration-200
                  `}
                >
                  <Icon className="w-5 h-5 mr-2" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default SinglePage;