import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: React.ReactNode;
}

export const AuthInput = ({ label, icon, type, ...props }: AuthInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="space-y-2">
      <label className={`block text-sm font-medium ${
        isDark ? 'text-gray-300' : 'text-gray-700'
      }`}>
        {label}
      </label>
      <div className="relative group">
        <div className={`absolute left-3 top-1/2 -translate-y-1/2 ${
          isDark ? 'text-gray-400' : 'text-gray-500'
        }`}>
          {icon}
        </div>
        <input
          {...props}
          type={inputType}
          className={`
            w-full bg-transparent rounded-xl py-2.5 pl-10 pr-4
            border transition-all duration-200
            ${isDark 
              ? 'border-white/10 focus:border-blue-500/50 text-white placeholder-gray-500'
              : 'border-gray-200 focus:border-blue-500 text-gray-900 placeholder-gray-400'
            }
            focus:outline-none focus:ring-1 focus:ring-blue-500/50
          `}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={`absolute right-3 top-1/2 -translate-y-1/2 ${
              isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-600'
            }`}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>
    </div>
  );
};