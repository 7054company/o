import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface AuthButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
}

export const AuthButton = ({ children, isLoading, ...props }: AuthButtonProps) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      {...props}
      disabled={isLoading || props.disabled}
      className={`
        group relative w-full px-4 py-3 rounded-xl font-medium
        transition-all duration-300 disabled:opacity-70
        ${isDark 
          ? 'bg-gradient-to-r from-blue-600/80 to-indigo-600/80 hover:from-blue-500/80 hover:to-indigo-500/80 text-white'
          : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white'
        }
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        ${isDark ? 'focus:ring-offset-black' : 'focus:ring-offset-white'}
      `}
    >
      <span className="absolute inset-0 rounded-xl overflow-hidden">
        <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
      </span>
      <span className="relative flex items-center justify-center gap-2">
        {isLoading ? (
          <span className="inline-block animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
        ) : children}
      </span>
    </button>
  );
};