import React from 'react';
import { NavLink } from 'react-router-dom';
import { DivideIcon as LucideIcon } from 'lucide-react';
import { useSidebar } from './SidebarContext';
import { useTheme } from '../../contexts/ThemeContext';

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  to: string;
  badge?: string | number;
}

export const SidebarItem = ({ icon: Icon, label, to, badge }: SidebarItemProps) => {
  const { isExpanded } = useSidebar();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <NavLink
      to={to}
      className={({ isActive }) => `
        group relative flex items-center gap-4 px-3 py-2 rounded-xl
        transition-all duration-300
        ${isActive
          ? isDark
            ? 'bg-white/10 text-white'
            : 'bg-blue-50 text-blue-600'
          : isDark
            ? 'text-gray-400 hover:text-white hover:bg-white/5'
            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
        }
      `}
    >
      <Icon className="w-5 h-5 shrink-0" />
      
      <span className={`whitespace-nowrap transition-all duration-300 ${
        isExpanded ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'
      }`}>
        {label}
      </span>

      {badge && isExpanded && (
        <span className={`
          absolute right-2 px-2 py-0.5 text-xs rounded-full
          transition-all duration-300
          ${isDark
            ? 'bg-white/10 text-white'
            : 'bg-blue-100 text-blue-600'
          }
        `}>
          {badge}
        </span>
      )}

      {/* Tooltip for collapsed state */}
      {!isExpanded && (
        <div className="
          absolute left-full ml-2 px-2 py-1 rounded-lg
          whitespace-nowrap opacity-0 group-hover:opacity-100
          transition-opacity duration-300 pointer-events-none
          bg-gray-900 text-white text-sm z-50
        ">
          {label}
        </div>
      )}
    </NavLink>
  );
};