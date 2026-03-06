import axios from 'axios';

interface Bucket {
  id: string;
  name: string;
  config: any;
  created_at: string;
  updated_at: string;
}

const API_URL = 'https://api-eight-navy-68.vercel.app/api/d';

// Helper function to get token
const getToken = () => localStorage.getItem('token');

// Local storage helpers
const CACHE_KEY = 'datahub_buckets';

const cacheBuckets = (buckets: Bucket[]) => {
  localStorage.setItem(CACHE_KEY, JSON.stringify(buckets));
};

const getCachedBuckets = (): Bucket[] => {
  const cached = localStorage.getItem(CACHE_KEY);
  return cached ? JSON.parse(cached) : [];
};

export const getBuckets = async () => {
  try {
    const token = getToken();
    const response = await axios.get(`${API_URL}/b`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    // Cache the buckets
    cacheBuckets(response.data.buckets);
    return response.data.buckets;
  } catch (error) {
    console.error('Error fetching buckets:', error);
    // Return cached data if available
    return getCachedBuckets();
  }
};

export const getBucketById = async (id: string) => {
  // First check cache
  const cached = getCachedBuckets();
  const cachedBucket = cached.find(b => b.id === id);
  
  if (cachedBucket) {
    return cachedBucket;
  }

  // If not in cache, fetch from API
  try {
    const token = getToken();
    const response = await axios.get(`${API_URL}/b/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data.bucket;
  } catch (error) {
    console.error('Error fetching bucket:', error);
    throw error;
  }
};

export const createBucket = async (data: { name: string; config?: any }) => {
  try {
    const token = getToken();
    const response = await axios.post(`${API_URL}/new/b`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    // Update cache with new bucket
    const cached = getCachedBuckets();
    cacheBuckets([...cached, response.data.bucket]);
    
    return response.data;
  } catch (error) {
    console.error('Error creating bucket:', error);
    throw error;
  }
};

export const createData = async (data: any) => {
  try {
    const token = getToken();
    const response = await axios.post(`${API_URL}/new`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating data:', error);
    throw error;
  }
};