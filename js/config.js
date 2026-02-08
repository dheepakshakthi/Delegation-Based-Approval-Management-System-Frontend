// API Configuration
const API_CONFIG = {
  development: {
    baseURL: 'http://localhost:5000/api'
  },
  production: {
    baseURL: 'https://delegation-based-approval-management.onrender.com/api' // Update with actual Render URL
  }
};

// Determine environment
const ENV = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
  ? 'development' 
  : 'production';

// Export API Base URL
const API_BASE_URL = API_CONFIG[ENV].baseURL;

// App Configuration
const APP_CONFIG = {
  appName: 'Delegation-Based Approval Management System',
  appShortName: 'DBAMS',
  tokenKey: 'dbams_token',
  userKey: 'dbams_user',
  sessionTimeout: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
};
