import React from 'react';
import { ArrowLeft, Book, Code, Shield, Zap } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface DocsProps {
  onBack: () => void;
}

export const Docs = ({ onBack }: DocsProps) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const sections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: <Book className="w-5 h-5" />,
      content: 'Learn how to create buckets, manage data, and integrate DataHub into your applications.'
    },
    {
      id: 'api-reference',
      title: 'API Reference',
      icon: <Code className="w-5 h-5" />,
      content: 'Comprehensive API documentation for DataHub endpoints and operations.'
    },
    {
      id: 'security',
      title: 'Security Guide',
      icon: <Shield className="w-5 h-5" />,
      content: 'Best practices for securing your data and implementing authentication.'
    },
    {
      id: 'performance',
      title: 'Performance Tips',
      icon: <Zap className="w-5 h-5" />,
      content: 'Optimize your data operations and improve application performance.'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className={`p-2 rounded-lg transition-colors ${
            isDark
              ? 'hover:bg-white/10 text-gray-400 hover:text-white'
              : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
          }`}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className={`text-2xl font-bold ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          Documentation
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section) => (
          <div
            key={section.id}
            className={`group relative p-6 rounded-xl border transition-all ${
              isDark
                ? 'bg-white/5 border-white/10 hover:bg-white/10'
                : 'bg-white border-gray-200 hover:border-blue-500/50 hover:shadow-lg'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg ${
                isDark ? 'bg-white/10' : 'bg-blue-50'
              }`}>
                {section.icon}
              </div>
              <div>
                <h3 className={`text-lg font-semibold mb-2 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {section.title}
                </h3>
                <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                  {section.content}
                </p>
              </div>
            </div>
            <div className={`absolute inset-0 rounded-xl transition-opacity duration-300 ${
              isDark ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10' : ''
            } opacity-0 group-hover:opacity-100`} />
          </div>
        ))}
      </div>
    </div>
  );
};