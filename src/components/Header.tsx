import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { ThemeToggle } from './ThemeToggle';
import { useHeaderAnimation } from '../hooks/useHeaderAnimation';
import { NavLink } from './navigation/NavLink';

export const Header = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const location = useLocation();
  const isVisible = useHeaderAnimation();

  const navItems = [
    { name: 'Documentation', path: '/documentation' },
    { name: 'Contact', path: '/contact' },
    { name: 'About', path: '/about' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-lg border-b border-gray-200 dark:border-white/10 transition-all duration-700 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
    }`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="https://raw.githubusercontent.com/7054company/7eax/refs/heads/master/logo1.png" 
              alt="Logo" 
              className="h-11 w-auto"
            />
            <span className={`text-xl font-bold ${
              isDark 
                ? 'text-white dark-glow-sm' 
                : 'text-gray-900'
            }`}>
              CloudPlatform
            </span>
          </Link>

          <div className="flex items-center">
            <nav className="hidden md:flex items-center space-x-6 mr-8">
              {navItems.map((item) => (
                <NavLink key={item.name} to={item.path}>
                  {item.name}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              {location.pathname !== '/login' && (
                <Link
                  to="/login"
                  className={`px-4 py-2 rounded-lg ${
                    isDark
                      ? 'bg-white/10 text-white hover:bg-white/20 dark-glow-xs'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  } transition-all duration-200`}
                >
                  Login
                </Link>
              )}
              <div className="relative">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};