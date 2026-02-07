// Utility functions

// Show success message
function showSuccess(message) {
  showToast(message, 'success');
}

// Show error message
function showError(message) {
  showToast(message, 'error');
}

// Show info message
function showInfo(message) {
  showToast(message, 'info');
}

// Show toast notification
function showToast(message, type = 'info') {
  // Create toast container if it doesn't exist
  let toastContainer = document.getElementById('toastContainer');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toastContainer';
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  // Create toast element
  const toast = document.createElement('div');
  toast.className = `toast-notification toast-${type}`;
  toast.innerHTML = `
    <div class="toast-content">
      <span class="toast-icon">${getToastIcon(type)}</span>
      <span class="toast-message">${message}</span>
    </div>
    <button class="toast-close" onclick="this.parentElement.remove()">&times;</button>
  `;

  toastContainer.appendChild(toast);

  // Auto remove after 5 seconds
  setTimeout(() => {
    toast.remove();
  }, 5000);
}

// Get toast icon based on type
function getToastIcon(type) {
  const icons = {
    success: '✓',
    error: '✕',
    info: 'ⓘ',
    warning: '⚠'
  };
  return icons[type] || icons.info;
}

// Format date
function formatDate(date) {
  if (!date) return '-';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
}

// Format datetime
function formatDateTime(date) {
  if (!date) return '-';
  const d = new Date(date);
  return d.toLocaleString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Format date for input fields (YYYY-MM-DD)
function formatDateForInput(date) {
  if (!date) return '';
  const d = new Date(date);
  return d.toISOString().split('T')[0];
}

// Get status badge HTML
function getStatusBadge(status) {
  const badges = {
    'Pending': '<span class="badge badge-warning">Pending</span>',
    'Approved': '<span class="badge badge-success">Approved</span>',
    'Rejected': '<span class="badge badge-danger">Rejected</span>',
    'Cancelled': '<span class="badge badge-secondary">Cancelled</span>'
  };
  return badges[status] || `<span class="badge">${status}</span>`;
}

// Get priority badge HTML
function getPriorityBadge(priority) {
  const badges = {
    'Urgent': '<span class="badge badge-danger">Urgent</span>',
    'High': '<span class="badge badge-warning">High</span>',
    'Medium': '<span class="badge badge-info">Medium</span>',
    'Low': '<span class="badge badge-secondary">Low</span>'
  };
  return badges[priority] || `<span class="badge">${priority}</span>`;
}

// Get request type badge HTML
function getRequestTypeBadge(type) {
  return `<span class="badge badge-primary">${type}</span>`;
}

// Show loading spinner
function showLoading(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.innerHTML = `
      <div class="text-center py-5">
        <div class="spinner-border text-success" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p class="mt-2 text-muted">Loading...</p>
      </div>
    `;
  }
}

// Hide loading and show content
function hideLoading(elementId, content) {
  const element = document.getElementById(elementId);
  if (element) {
    element.innerHTML = content;
  }
}

// Show empty state
function showEmptyState(elementId, message = 'No data available') {
  const element = document.getElementById(elementId);
  if (element) {
    element.innerHTML = `
      <div class="text-center py-5">
        <p class="text-muted">${message}</p>
      </div>
    `;
  }
}

// Confirm dialog
function confirmDialog(message) {
  return confirm(message);
}

// Format currency
function formatCurrency(amount) {
  if (!amount) return '-';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

// Truncate text
function truncateText(text, maxLength = 100) {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

// Debounce function
function debounce(func, wait = 300) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Get query parameter from URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Set query parameter in URL
function setQueryParam(param, value) {
  const url = new URL(window.location);
  url.searchParams.set(param, value);
  window.history.pushState({}, '', url);
}

// Validate email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate required fields
function validateForm(formId) {
  const form = document.getElementById(formId);
  if (!form) return false;

  const requiredFields = form.querySelectorAll('[required]');
  let isValid = true;

  requiredFields.forEach(field => {
    if (!field.value.trim()) {
      field.classList.add('is-invalid');
      isValid = false;
    } else {
      field.classList.remove('is-invalid');
    }
  });

  return isValid;
}

// Calculate days between dates
function daysBetween(date1, date2) {
  const oneDay = 24 * 60 * 60 * 1000;
  const firstDate = new Date(date1);
  const secondDate = new Date(date2);
  return Math.round(Math.abs((firstDate - secondDate) / oneDay));
}

// Check if date is in the past
function isPastDate(date) {
  return new Date(date) < new Date();
}

// Initialize tooltips (Bootstrap)
function initTooltips() {
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
  initTooltips();
});
