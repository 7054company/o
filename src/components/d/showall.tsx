import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Database, Search, Clock } from 'lucide-react';
import { getBuckets } from './api';
import { useTheme } from '../../contexts/ThemeContext';

interface Bucket {
  id: string;
  name: string;
  config: any;
  created_at: string;
  updated_at: string;
}

export const ShowAll = () => {
  const [buckets, setBuckets] = useState<Bucket[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const fetchBuckets = async () => {
      try {
        const data = await getBuckets();
        setBuckets(data);
      } catch (error) {
        console.error('Error fetching buckets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBuckets();
  }, []);

  const filteredBuckets = buckets.filter(bucket =>
    bucket.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBucketClick = (id: string) => {
    navigate(`/datahub/b/${id}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
          isDark ? 'text-gray-400' : 'text-gray-500'
        }`} />
        <input
          type="text"
          placeholder="Search buckets..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`w-full pl-12 pr-4 py-3 rounded-xl border ${
            isDark
              ? 'bg-white/5 border-white/10 text-white placeholder-gray-400'
              : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500'
          } focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300`}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBuckets.map((bucket) => (
          <div
            key={bucket.id}
            onClick={() => handleBucketClick(bucket.id)}
            className={`p-6 rounded-xl cursor-pointer transition-all duration-300 ${
              isDark
                ? 'bg-white/5 hover:bg-white/10 border-white/10'
                : 'bg-white hover:bg-gray-50 border-gray-200'
            } border`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <Database className={`w-5 h-5 ${
                  isDark ? 'text-blue-400' : 'text-blue-600'
                }`} />
                <h3 className={`font-semibold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {bucket.name}
                </h3>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Clock className={`w-4 h-4 ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <span className={`text-sm ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Created: {new Date(bucket.created_at).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className={`w-4 h-4 ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <span className={`text-sm ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Updated: {new Date(bucket.updated_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};