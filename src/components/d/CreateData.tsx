import React, { useState } from 'react';
import { ArrowLeft, Plus, Tag, Settings, Save, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';

interface CreateDataProps {
  bucketId?: string;
  onBack?: () => void;
}

export const CreateData: React.FC<CreateDataProps> = ({ bucketId, onBack }) => {
  const [data, setData] = useState('');
  const [tags, setTags] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [apiEnabled, setApiEnabled] = useState(false);
  const [requireAuth, setRequireAuth] = useState(true);
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await fetch('https://api-eight-navy-68.vercel.app/api/d/new', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          data,
          name,
          bucket_id: bucketId,
          tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
          config: {
            api: {
              enabled: apiEnabled,
              requireAuth
            }
          }
        })
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || 'Failed to create data');
      }

      if (bucketId) {
        navigate(`/datahub/b/${bucketId}`);
      } else {
        navigate('/datahub');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`w-full max-w-4xl mx-auto p-6 ${
      isDark ? 'text-white' : 'text-gray-900'
    }`}>
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        {onBack && (
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
        )}
        <h1 className="text-2xl font-bold">Create New Data</h1>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Input */}
        <div className="space-y-2">
          <label className={`block text-sm font-medium ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter a name for your data"
            className={`w-full px-4 py-3 rounded-xl border ${
              isDark
                ? 'bg-white/5 border-white/10 text-white placeholder-gray-400'
                : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
            } focus:outline-none focus:ring-2 focus:ring-blue-500/50`}
            required
          />
        </div>

        {/* Data Input */}
        <div className="space-y-2">
          <label className={`block text-sm font-medium ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>
            Data Content
          </label>
          <textarea
            value={data}
            onChange={(e) => setData(e.target.value)}
            placeholder="Enter your data content here..."
            rows={8}
            className={`w-full px-4 py-3 rounded-xl border ${
              isDark
                ? 'bg-white/5 border-white/10 text-white placeholder-gray-400'
                : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
            } focus:outline-none focus:ring-2 focus:ring-blue-500/50`}
            required
          />
        </div>

        {/* Tags Input */}
        <div className="space-y-2">
          <label className={`block text-sm font-medium ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4" />
              Tags
            </div>
          </label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Enter tags separated by commas"
            className={`w-full px-4 py-3 rounded-xl border ${
              isDark
                ? 'bg-white/5 border-white/10 text-white placeholder-gray-400'
                : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
            } focus:outline-none focus:ring-2 focus:ring-blue-500/50`}
          />
        </div>

        {/* API Settings */}
        <div className={`p-4 rounded-xl ${
          isDark ? 'bg-white/5' : 'bg-gray-50'
        }`}>
          <div className="flex items-center gap-2 mb-4">
            <Settings className="w-4 h-4" />
            <h3 className="font-medium">API Settings</h3>
          </div>
          
          <div className="space-y-4">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={apiEnabled}
                onChange={(e) => setApiEnabled(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300"
              />
              <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                Enable API access
              </span>
            </label>

            {apiEnabled && (
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={requireAuth}
                  onChange={(e) => setRequireAuth(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300"
                />
                <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                  Require authentication
                </span>
              </label>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full px-4 py-3 rounded-xl font-medium flex items-center justify-center gap-2 ${
            isDark
              ? 'bg-white/10 hover:bg-white/20'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          } transition-colors disabled:opacity-50`}
        >
          {isLoading ? (
            <Loader className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <Save className="w-5 h-5" />
              Create Data
            </>
          )}
        </button>
      </form>
    </div>
  );
};