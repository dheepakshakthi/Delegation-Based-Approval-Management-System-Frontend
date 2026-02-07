// Authentication and Authorization utilities

// Check if user is authenticated
function isAuthenticated() {
  const token = localStorage.getItem(APP_CONFIG.tokenKey);
  return !!token;
}

// Get current user from localStorage
function getCurrentUser() {
  const userStr = localStorage.getItem(APP_CONFIG.userKey);
  if (userStr) {
    try {
      return JSON.parse(userStr);
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  }
  return null;
}

// Check if user has specific role
function hasRole(role) {
  const user = getCurrentUser();
  return user && user.role === role;
}

// Check if user has any of the specified roles
function hasAnyRole(roles) {
  const user = getCurrentUser();
  return user && roles.includes(user.role);
}

// Redirect to login if not authenticated
function requireAuth() {
  if (!isAuthenticated()) {
    window.location.href = '/login.html';
    return false;
  }
  return true;
}

// Require specific role
function requireRole(role) {
  if (!requireAuth()) return false;
  
  if (!hasRole(role)) {
    showError('You do not have permission to access this page');
    window.location.href = '/dashboard.html';
    return false;
  }
  return true;
}

// Require any of the specified roles
function requireAnyRole(roles) {
  if (!requireAuth()) return false;
  
  if (!hasAnyRole(roles)) {
    showError('You do not have permission to access this page');
    window.location.href = '/dashboard.html';
    return false;
  }
  return true;
}

// Redirect to dashboard if already authenticated
function redirectIfAuthenticated() {
  if (isAuthenticated()) {
    window.location.href = '/dashboard.html';
    return true;
  }
  return false;
}

// Logout user
function logout() {
  authAPI.logout();
}

// Initialize user info in navbar
function initUserInfo() {
  const user = getCurrentUser();
  if (user) {
    const userNameEl = document.getElementById('userName');
    const userRoleEl = document.getElementById('userRole');
    
    if (userNameEl) {
      userNameEl.textContent = user.name;
    }
    if (userRoleEl) {
      userRoleEl.textContent = user.role;
    }
  }
}

// Show/hide elements based on role
function initRoleBasedUI() {
  const user = getCurrentUser();
  if (!user) return;

  // Hide elements that don't match user role
  document.querySelectorAll('[data-role]').forEach(element => {
    const allowedRoles = element.getAttribute('data-role').split(',').map(r => r.trim());
    if (!allowedRoles.includes(user.role)) {
      element.style.display = 'none';
    }
  });

  // Show elements that match user role
  document.querySelectorAll('[data-show-role]').forEach(element => {
    const allowedRoles = element.getAttribute('data-show-role').split(',').map(r => r.trim());
    if (allowedRoles.includes(user.role)) {
      element.style.display = '';
    }
  });
}

// Initialize auth on page load
document.addEventListener('DOMContentLoaded', function() {
  // Check if we're on a public page (login/register)
  const publicPages = ['/login.html', '/register.html', '/index.html', '/'];
  const currentPath = window.location.pathname;
  const isPublicPage = publicPages.some(page => currentPath.endsWith(page)) || currentPath === '/';

  if (!isPublicPage) {
    // Protected page - require authentication
    if (requireAuth()) {
      initUserInfo();
      initRoleBasedUI();
    }
  } else if (currentPath.endsWith('/login.html') || currentPath.endsWith('/register.html')) {
    // Login/Register page - redirect if already authenticated
    redirectIfAuthenticated();
  }
});
