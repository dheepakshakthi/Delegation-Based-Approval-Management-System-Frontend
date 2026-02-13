# Delegation-Based Approval Management System - Frontend

![Status](https://img.shields.io/badge/Status-Completed-success) ![HTML5](https://img.shields.io/badge/HTML5-E34F26) ![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-purple) ![JS](https://img.shields.io/badge/Vanilla%20JS-ES6%2B-yellow)

A boxy, professional web interface for the Delegation-Based Approval Management System. Built with pure HTML/CSS/JS and Bootstrap 5 for a lightweight, fast, and responsive experience.

## 📚 Documentation Index

- **[Deployment Guide](DEPLOYMENT.md)**: Instructions for deploying the frontend to Render or static hosts.
- **[Testing Guide](TESTING_GUIDE.md)**: Comprehensive manual testing scenarios for all user roles.

## 🚀 Features

- **Role-Based Dashboards**: Custom views for Requesters, Approvers, and Admins.
- **Request Management**: Create, view, cancel, and track approval requests.
- **Approval Workflow**: Streamlined interface for approving or rejecting requests.
- **Delegation Management**: Visual tools to set up and manage approval delegations.
- **User Management**: Admin interface for managing system users.
- **Responsive Design**: "Boxy" theme that works on desktop, tablet, and mobile.

## ⚡ Quick Start

### Prerequisites
- Backend API running on `http://localhost:5000` (See Backend README)
- A web browser (Chrome, Firefox, Edge)
- VS Code "Live Server" extension (recommended) or any static file server

### 1. Setup
No installation required (`npm install` is optional/not needed for runtime).
```bash
git clone <repository-url>
cd Delegation-Based-Approval-Management-System-Frontend
```

### 2. Configuration
The application automatically detects `localhost` and connects to the local backend.
To configure for production, edit `js/config.js`:
```javascript
const API_CONFIG = {
  development: {
    baseURL: 'http://localhost:5000/api'
  },
  production: {
    baseURL: 'https://your-production-backend.com/api'
  }
};
```

### 3. Run
**Option A: VS Code Live Server (Recommended)**
1. Open the folder in VS Code.
2. Right-click `index.html`.
3. Select "Open with Live Server".

**Option B: Simple HTTP Server**
```bash
npx http-server . -p 5500 -o
```

**Option C: Direct File Access**
Simply double-click `index.html` (Note: Some browser security settings might block API calls on `file://` protocol; local server is preferred).

## 🧪 Demo Login

Ensure the backend is seeded before logging in.

| Role | Email | Password |
|------|-------|----------|
| **Admin** | `admin@dbams.com` | `admin123` |
| **Approver** | `john.approver@dbams.com` | `password123` |
| **Requester** | `mike.requester@dbams.com` | `password123` |

## 🎨 Design System

This project uses a custom "Boxy" design theme:
- **No Border Radius**: All elements (cards, buttons, inputs) have sharp corners.
- **Color Palette**: White primary, Green (`#28a745`) secondary/accent.
- **Typography**: Clean, professional sans-serif fonts.
- **Interaction**: Instant feedback, no complex animations for speed.

## 📁 Structure

```
frontend/
├── index.html              # Public landing page
├── login.html              # Authentication
├── dashboard.html          # Main role-based dashboard
├── requests.html           # Request list view
├── create-request.html     # Request submission form
├── pending-approvals.html  # Approver inbox
├── delegations.html        # Delegation management
├── users.html              # Admin user management
├── css/
│   └── styles.css          # Custom theme styles
└── js/
    ├── api.js              # Central API client
    ├── auth.js             # Auth & RBAC logic
    ├── config.js           # Environment configuration
    └── utils.js            # Helpers & formatters
```

## 📄 License

MIT License
