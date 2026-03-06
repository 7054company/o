import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

interface AuthCardProps {
  children: React.ReactNode;
}

export const AuthCard = ({ children }: AuthCardProps) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="relative w-full max-w-md p-8">
      {/* Animated background gradients */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 blur-3xl animate-pulse" />
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-indigo-500/20 to-pink-500/20 blur-3xl animate-pulse delay-1000" />
      
      <div className={`relative backdrop-blur-xl rounded-2xl p-8 shadow-2xl ${
        isDark 
          ? 'bg-black/40 border border-white/10' 
          : 'bg-white/80 border border-gray-200'
      }`}>
        {children}
      </div>
    </div>
  );
};