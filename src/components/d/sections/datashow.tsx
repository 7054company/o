import React from 'react';
import { useParams } from 'react-router-dom';
import { Database, Search, Filter, MoreVertical } from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';

export const DataShow = () => {
  const { id } = useParams();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const mockData = [
    { id: 1, name: 'User Analytics', type: 'JSON', size: '2.3 MB', updated: '2 min ago' },
    { id: 2, name: 'Transaction Log', type: 'CSV', size: '1.1 MB', updated: '1 hour ago' },
    { id: 3, name: 'System Config', type: 'YAML', size: '156 KB', updated: '3 hours ago' },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className={`text-2xl font-bold mb-2 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          Data Explorer
        </h2>
        <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
          Browse and manage your data entries
        </p>
      </div>

      <div className="mb-6 flex gap-4">
        <div className="flex-1 relative">
          <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`} />
          <input
            type="text"
            placeholder="Search data..."
            className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
              isDark
                ? 'bg-white/5 border-white/10 text-white placeholder-gray-400'
                : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
            } focus:outline-none focus:ring-2 focus:ring-blue-500/50`}
          />
        </div>
        <button className={`p-2 rounded-lg border ${
          isDark
            ? 'bg-white/5 border-white/10 text-white hover:bg-white/10'
            : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
        }`}>
          <Filter className="w-5 h-5" />
        </button>
      </div>

      <div className={`rounded-xl border ${
        isDark
          ? 'bg-white/5 border-white/10'
          : 'bg-white border-gray-200'
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${
                isDark ? 'border-white/10' : 'border-gray-200'
              }`}>
                <th className={`px-6 py-4 text-left text-sm font-medium ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`}>Name</th>
                <th className={`px-6 py-4 text-left text-sm font-medium ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`}>Type</th>
                <th className={`px-6 py-4 text-left text-sm font-medium ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`}>Size</th>
                <th className={`px-6 py-4 text-left text-sm font-medium ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`}>Last Updated</th>
                <th className={`px-6 py-4 text-left text-sm font-medium ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`}></th>
              </tr>
            </thead>
            <tbody>
              {mockData.map((item) => (
                <tr
                  key={item.id}
                  className={`border-b last:border-0 ${
                    isDark ? 'border-white/10' : 'border-gray-200'
                  }`}
                >
                  <td className={`px-6 py-4 ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    <div className="flex items-center gap-3">
                      <Database className={`w-5 h-5 ${
                        isDark ? 'text-blue-400' : 'text-blue-600'
                      }`} />
                      {item.name}
                    </div>
                  </td>
                  <td className={`px-6 py-4 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>{item.type}</td>
                  <td className={`px-6 py-4 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>{item.size}</td>
                  <td className={`px-6 py-4 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>{item.updated}</td>
                  <td className="px-6 py-4">
                    <button className={`p-1 rounded-lg hover:${
                      isDark ? 'bg-white/10' : 'bg-gray-100'
                    }`}>
                      <MoreVertical className={`w-5 h-5 ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};