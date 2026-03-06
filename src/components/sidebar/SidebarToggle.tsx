import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSidebar } from './SidebarContext';
import { useTheme } from '../../contexts/ThemeContext';

export const SidebarToggle = () => {
  const { isExpanded, toggleSidebar } = useSidebar();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleSidebar}
      className={`
        absolute -right-3 top-6 p-1.5 rounded-full
        transition-all duration-300
        ${isDark
          ? 'bg-gray-800 text-gray-400 hover:text-white'
          : 'bg-white text-gray-600 hover:text-gray-900 shadow-md'
        }
      `}
    >
      {isExpanded ? (
        <ChevronLeft className="w-4 h-4" />
      ) : (
        <ChevronRight className="w-4 h-4" />
      )}
    </button>
  );
};