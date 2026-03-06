import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Database, Settings, FileText } from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';

interface NavProps {
  bucketId: string;
}

export const Nav: React.FC<NavProps> = ({ bucketId }) => {
  const location = useLocation();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    {
      name: 'Overview',
      path: `/datahub/b/${bucketId}`,
      icon: Database
    },
    {
      name: 'Data',
      path: `/datahub/b/${bucketId}/data`,
      icon: FileText
    },
    {
      name: 'Settings',
      path: `/datahub/b/${bucketId}/settings`,
      icon: Settings
    }
  ];

  return (
    <nav className={`flex items-center gap-1 px-4 border-b ${
      isDark ? 'border-white/10' : 'border-gray-200'
    }`}>
      {navItems.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
            isActive(item.path)
              ? isDark
                ? 'border-white text-white'
                : 'border-blue-500 text-blue-500'
              : isDark
                ? 'border-transparent text-gray-400 hover:text-white'
                : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <item.icon className="w-4 h-4" />
          {item.name}
        </Link>
      ))}
    </nav>
  );
};