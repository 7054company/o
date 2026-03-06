import React from 'react';
import { 
  LayoutDashboard, User, Settings, Bell, 
  Shield, HelpCircle, LogOut, Cloud,
  LineChart, Users, Key, Globe,  Database
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { SidebarProvider } from './SidebarContext';
import { SidebarToggle } from './SidebarToggle';
import { SidebarSection } from './SidebarSection';
import { SidebarItem } from './SidebarItem';
import { useTheme } from '../../contexts/ThemeContext';
import { authService } from '../../services/auth.service';

export const Sidebar = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <SidebarProvider>
      {({ isExpanded }) => (
        <aside className={`
          sticky top-0 h-screen transition-all duration-300
          ${isExpanded ? 'w-64' : 'w-16'}
          ${isDark
            ? 'bg-black/40 border-r border-white/10'
            : 'bg-white border-r border-gray-200'
          }
        `}>
          <SidebarToggle />

          <div className="flex-1 overflow-y-auto">
            <SidebarSection title="Main">
              <SidebarItem
                icon={LayoutDashboard}
                label="Dashboard"
                to="/dashboard"
              />
              <SidebarItem
                icon={User}
                label="Account"
                to="/account"
              />
              <SidebarItem
                icon={Cloud}
                label="Deploy"
                to="/deploy"
              />
              <SidebarItem
                icon={LineChart}
                label="7EA Stock"
                to="/stock"
              />
              <SidebarItem
                icon={Users}
                label="Waitlist"
                to="/waitlist"
              />
              <SidebarItem
                icon={Key}
                label="Authority"
                to="/authority"
              />
              <SidebarItem
                icon={Globe}
                label="UniverseX"
                to="/universe"
              />
              <SidebarItem
                icon={Database}
                label="DataHub"
                to="/datahub"
               /> 
              <SidebarItem
                icon={Bell}
                label="Notifications"
                to="/notifications"
                badge="3"
              />
            </SidebarSection>

            <SidebarSection title="Settings">
              <SidebarItem
                icon={Settings}
                label="Preferences"
                to="/settings"
              />
              <SidebarItem
                icon={Shield}
                label="Security"
                to="/security"
              />
            </SidebarSection>

            <SidebarSection title="Support">
              <SidebarItem
                icon={HelpCircle}
                label="Help Center"
                to="/help"
              />
            </SidebarSection>
          </div>

          <div className="pt-2">
            <button
              onClick={handleLogout}
              className={`
                w-full flex items-center gap-4 px-3 py-2 rounded-xl
                transition-all duration-300
                ${isDark
                  ? 'text-red-400 hover:text-red-300 hover:bg-red-500/10'
                  : 'text-red-600 hover:text-red-500 hover:bg-red-50'
                }
              `}
            >
              <LogOut className="w-5 h-5" />
              <span className={`transition-opacity duration-300 ${
                isExpanded ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'
              }`}>
                Logout
              </span>
            </button>
          </div>
        </aside>
      )}
    </SidebarProvider>
  );
};