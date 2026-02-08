// API Client for making HTTP requests

class APIClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  // Get authentication token
  getToken() {
    return localStorage.getItem(APP_CONFIG.tokenKey);
  }

  // Get headers with authentication
  getHeaders(includeAuth = true) {
    const headers = {
      'Content-Type': 'application/json'
    };

    if (includeAuth) {
      const token = this.getToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  // Handle API errors
  handleError(error, response) {
    if (response) {
      // Server responded with error
      if (response.status === 401) {
        // Unauthorized - clear token and redirect to login
        localStorage.removeItem(APP_CONFIG.tokenKey);
        localStorage.removeItem(APP_CONFIG.userKey);
        window.location.href = '/login.html';
        throw new Error('Session expired. Please login again.');
      }
      
      return response.json().then(data => {
        throw new Error(data.message || data.error || 'An error occurred');
      }).catch(err => {
        throw new Error(err.message || 'An error occurred');
      });
    } else {
      // Network error
      throw new Error(error.message || 'Network error occurred');
    }
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      ...options,
      headers: this.getHeaders(options.includeAuth !== false)
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        return this.handleError(null, response);
      }

      return await response.json();
    } catch (error) {
      return this.handleError(error, null);
    }
  }

  // GET request
  async get(endpoint, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    return this.request(url, { method: 'GET' });
  }

  // POST request
  async post(endpoint, data = {}, includeAuth = true) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      includeAuth
    });
  }

  // PUT request
  async put(endpoint, data = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  // DELETE request
  async delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE'
    });
  }
}

// Create API client instance
const api = new APIClient(API_BASE_URL);

// Authentication API calls
const authAPI = {
  async login(email, password) {
    const response = await api.post('/auth/login', { email, password }, false);
    if (response.success && response.token) {
      localStorage.setItem(APP_CONFIG.tokenKey, response.token);
      // Store the user object correctly (it's in response.user, not response.data)
      localStorage.setItem(APP_CONFIG.userKey, JSON.stringify(response.user));
    }
    return response;
  },

  async register(userData) {
    const response = await api.post('/auth/register', userData, false);
    if (response.success && response.token) {
      localStorage.setItem(APP_CONFIG.tokenKey, response.token);
      // Store the user object correctly (it's in response.user, not response.data)
      localStorage.setItem(APP_CONFIG.userKey, JSON.stringify(response.user));
    }
    return response;
  },

  async getCurrentUser() {
    const response = await api.get('/auth/me');
    if (response.success) {
      localStorage.setItem(APP_CONFIG.userKey, JSON.stringify(response.data));
    }
    return response;
  },

  async updateProfile(userData) {
    return await api.put('/auth/profile', userData);
  },

  async updatePassword(passwords) {
    return await api.put('/auth/updatepassword', passwords);
  },

  async logout() {
    try {
      await api.post('/auth/logout', {});
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem(APP_CONFIG.tokenKey);
      localStorage.removeItem(APP_CONFIG.userKey);
      window.location.href = '/login.html';
    }
  }
};

// User API calls
const userAPI = {
  async getUsers(params = {}) {
    return await api.get('/users', params);
  },

  async getUserById(id) {
    return await api.get(`/users/${id}`);
  },

  async getUsersByRole(role) {
    return await api.get(`/users/role/${role}`);
  },

  async updateUser(id, userData) {
    return await api.put(`/users/${id}`, userData);
  },

  async deactivateUser(id) {
    return await api.delete(`/users/${id}`);
  }
};

// Request API calls
const requestAPI = {
  async getRequests(params = {}) {
    return await api.get('/requests', params);
  },

  async getPendingRequests() {
    return await api.get('/requests/pending');
  },

  async getMyRequests() {
    return await api.get('/requests/my-requests');
  },

  async getRequestById(id) {
    return await api.get(`/requests/${id}`);
  },

  async createRequest(requestData) {
    return await api.post('/requests', requestData);
  },

  async updateRequest(id, requestData) {
    return await api.put(`/requests/${id}`, requestData);
  },

  async cancelRequest(id) {
    return await api.delete(`/requests/${id}`);
  },

  async approveRequest(id) {
    return await api.put(`/requests/${id}/approve`);
  },

  async rejectRequest(id, reason) {
    return await api.put(`/requests/${id}/reject`, { reason });
  }
};

// Comment API calls
const commentAPI = {
  async getComments(requestId) {
    return await api.get(`/requests/${requestId}/comments`);
  },

  async addComment(requestId, comment) {
    return await api.post(`/requests/${requestId}/comments`, { comment });
  },

  async deleteComment(commentId) {
    return await api.delete(`/comments/${commentId}`);
  }
};

// Delegation API calls
const delegationAPI = {
  async getDelegations(params = {}) {
    return await api.get('/delegations', params);
  },

  async getActiveDelegations() {
    return await api.get('/delegations/active');
  },

  async getMyDelegations() {
    return await api.get('/delegations/my-delegations');
  },

  async getDelegationsToMe() {
    return await api.get('/delegations/to-me');
  },

  async getDelegationById(id) {
    return await api.get(`/delegations/${id}`);
  },

  async createDelegation(delegationData) {
    return await api.post('/delegations', delegationData);
  },

  async updateDelegation(id, delegationData) {
    return await api.put(`/delegations/${id}`, delegationData);
  },

  async cancelDelegation(id) {
    return await api.delete(`/delegations/${id}`);
  }
};
