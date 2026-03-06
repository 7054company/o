import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Copy, CheckCircle } from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';

interface Bucket {
  id: string;
  name: string;
  config: Record<string, any>;
  created_at?: string;
  updated_at?: string;
}

export const Overview = () => {
  const { id } = useParams<{ id: string }>();
  const [bucket, setBucket] = useState<Bucket | null>(null);
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const loadBucket = () => {
      const bucketsStr = localStorage.getItem('datahub_buckets');
      if (bucketsStr) {
        const buckets: Bucket[] = JSON.parse(bucketsStr);
        const foundBucket = buckets.find(b => b.id === id);
        if (foundBucket) {
          setBucket(foundBucket);
        }
      }
    };

    loadBucket();
  }, [id]);

  const handleCopyId = async () => {
    if (bucket?.id) {
      await navigator.clipboard.writeText(bucket.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!bucket) {
    return (
      <div className={`p-6 rounded-lg ${
        isDark ? 'bg-white/5' : 'bg-gray-50'
      }`}>
        <p className={`text-center ${
          isDark ? 'text-gray-400' : 'text-gray-600'
        }`}>
          No bucket found with ID: {id}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className={`p-6 rounded-lg ${
        isDark ? 'bg-white/5' : 'bg-gray-50'
      }`}>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className={`text-xl font-semibold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {bucket.name}
            </h3>
            <button
              onClick={handleCopyId}
              className={`p-2 rounded-lg transition-colors ${
                isDark
                  ? 'hover:bg-white/10 text-gray-400 hover:text-white'
                  : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
              }`}
              title="Copy bucket ID"
            >
              {copied ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <Copy className="w-5 h-5" />
              )}
            </button>
          </div>

          <div className="space-y-2">
            <p className={`text-sm ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <span className="font-medium">ID:</span> {bucket.id}
            </p>
            {bucket.created_at && (
              <p className={`text-sm ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <span className="font-medium">Created:</span>{' '}
                {new Date(bucket.created_at).toLocaleString()}
              </p>
            )}
            {bucket.updated_at && (
              <p className={`text-sm ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <span className="font-medium">Last Updated:</span>{' '}
                {new Date(bucket.updated_at).toLocaleString()}
              </p>
            )}
          </div>
        </div>
      </div>

      {Object.keys(bucket.config).length > 0 && (
        <div className={`p-6 rounded-lg ${
          isDark ? 'bg-white/5' : 'bg-gray-50'
        }`}>
          <h3 className={`text-lg font-semibold mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Configuration
          </h3>
          <pre className={`p-4 rounded-lg overflow-auto ${
            isDark
              ? 'bg-black/30 text-gray-300'
              : 'bg-white text-gray-700'
          }`}>
            {JSON.stringify(bucket.config, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};