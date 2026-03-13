// Central API base configuration for browser and build-time env
const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export function apiUrl(path = '') {
  if (!path.startsWith('/')) return `${API_BASE}/${path}`;
  return `${API_BASE}${path}`;
}

export { API_BASE };

// Check if we're in build mode
export const isBuildTime = process.env.NODE_ENV === 'production' && !process.env.REACT_APP_API_URL;


