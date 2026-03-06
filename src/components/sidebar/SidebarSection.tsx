import React from 'react';
import { useSidebar } from './SidebarContext';
import { useTheme } from '../../contexts/ThemeContext';

interface SidebarSectionProps {
  title: string;
  children: React.ReactNode;
}

export const SidebarSection = ({ title, children }: SidebarSectionProps) => {
  const { isExpanded } = useSidebar();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="py-2">
      {isExpanded && (
        <h3 className={`px-3 mb-2 text-xs font-semibold uppercase tracking-wider ${
          isDark ? 'text-gray-400' : 'text-gray-500'
        }`}>
          {title}
        </h3>
      )}
      <div className="space-y-1">
        {children}
      </div>
    </div>
  );
};