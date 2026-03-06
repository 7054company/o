import React from 'react';
import { Home, Search, Plus, Book } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface NavProps {
  onViewChange: (view: 'home' | 'docs') => void;
  onNewBucket: () => void;
  onNewData: () => void;
  currentView: 'home' | 'docs';
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Nav: React.FC<NavProps> = ({
  onViewChange,
  onNewBucket,
  onNewData,
  currentView,
  searchQuery,
  onSearchChange
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="w-full">
      {/* Header */}
      <div className={`relative overflow-hidden rounded-2xl p-6 mb-6 ${
        isDark 
          ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20' 
          : 'bg-gradient-to-r from-blue-50 to-purple-50'
      }`}>
        <div className="relative z-10">
          <h1 className={`text-3xl font-bold mb-2 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            DataHub
          </h1>
          <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
            Manage your data buckets and entries
          </p>
        </div>
        
        {/* Background Effects */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Navigation and Search */}
      <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
        <div className="flex gap-2">
          <button
            onClick={() => onViewChange('home')}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all duration-300 ${
              currentView === 'home'
                ? isDark
                  ? 'bg-white/10 text-white'
                  : 'bg-blue-500 text-white'
                : isDark
                  ? 'text-gray-400 hover:bg-white/5'
                  : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Home className="w-5 h-5" />
            Home
          </button>
          
          <button
            onClick={() => onViewChange('docs')}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all duration-300 ${
              currentView === 'docs'
                ? isDark
                  ? 'bg-white/10 text-white'
                  : 'bg-blue-500 text-white'
                : isDark
                  ? 'text-gray-400 hover:bg-white/5'
                  : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Book className="w-5 h-5" />
            Docs
          </button>
        </div>

        <div className="flex-1 relative">
          <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`} />
          <input
            type="text"
            placeholder="Search buckets and data..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-xl border ${
              isDark
                ? 'bg-white/5 border-white/10 text-white placeholder-gray-400'
                : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
            } focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300`}
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={onNewBucket}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all duration-300 ${
              isDark
                ? 'bg-white/10 hover:bg-white/20 text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            <Plus className="w-5 h-5" />
            New Bucket
          </button>
          
          <button
            onClick={onNewData}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all duration-300 ${
              isDark
                ? 'bg-white/10 hover:bg-white/20 text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            <Plus className="w-5 h-5" />
            New Data
          </button>
        </div>
      </div>
    </div>
  );
};