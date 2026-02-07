# Delegation-Based Approval Management System - Frontend

A boxy, clean web application for managing approval requests with delegation capabilities.

## Features

- User authentication (Login/Register)
- Role-based access control (Admin, Approver, Requester)
- Create and manage approval requests
- Approve/reject requests
- Delegate approval authority
- Comment on requests
- Email notifications

## Tech Stack

- HTML5
- Bootstrap 5.3
- Vanilla JavaScript
- Fetch API

## Design

- Boxy design (no rounded corners)
- White primary color
- Green (#28a745) secondary color
- No gradients or animations
- Clean and professional interface

## Local Development

1. **Prerequisites:**
   - Live Server extension for VS Code (or any static file server)
   - Backend running on http://localhost:5000

2. **Setup:**
   ```bash
   # No installation needed - pure HTML/CSS/JS
   ```

3. **Run:**
   - Open the project folder in VS Code
   - Right-click on `index.html`
   - Select "Open with Live Server"
   - Or simply open `index.html` in a browser

4. **Configuration:**
   - Edit `js/config.js` to change API endpoints
   - Backend URL is automatically detected (localhost vs production)

## Project Structure

```
frontend/
├── index.html              # Landing page
├── login.html              # Login page
├── register.html           # Registration page
├── dashboard.html          # Main dashboard
├── profile.html            # User profile
├── requests.html           # My requests list
├── create-request.html     # Create new request
├── request-details.html    # Request details view
├── pending-approvals.html  # Pending approvals (Approver/Admin)
├── delegations.html        # Delegation management
├── create-delegation.html  # Create new delegation
├── users.html              # User management (Admin only)
├── css/
│   └── styles.css          # Custom boxy theme styles
└── js/
    ├── config.js           # Configuration & API URLs
    ├── api.js              # API client & endpoints
    ├── auth.js             # Authentication utilities
    └── utils.js            # Utility functions
```

## Pages Overview

### Public Pages
- **index.html** - Landing page with app info
- **login.html** - User login
- **register.html** - New user registration

### Protected Pages (All Roles)
- **dashboard.html** - Role-specific dashboard with stats
- **profile.html** - View/edit profile and change password
- **requests.html** - View all my requests
- **create-request.html** - Create new approval request
- **request-details.html** - View request details with comments

### Approver/Admin Pages
- **pending-approvals.html** - Review pending approval requests
- **delegations.html** - Manage delegations (view/cancel)
- **create-delegation.html** - Create new delegation

### Admin Only Pages
- **users.html** - User management (view/edit/deactivate)

## API Integration

The frontend connects to the backend API at:
- **Development:** `http://localhost:5000/api`
- **Production:** Configured via `FRONTEND_URL` environment variable

All API calls are made through `js/api.js` which handles:
- Authentication headers
- Error handling
- Token management
- Session expiration

## Environment Variables

Set these in your hosting platform (Render):

```env
# Not needed for static HTML - API URL auto-detected
# Backend URL is configured in js/config.js
```

## Deployment to Render

### Option 1: Static Site

1. **Create New Static Site:**
   - Go to Render Dashboard
   - Click "New +" → "Static Site"
   - Connect your GitHub repository

2. **Configuration:**
   - **Name:** `dbams-frontend`
   - **Build Command:** (leave empty)
   - **Publish Directory:** `.` (root)
   - **Auto-Deploy:** Yes

3. **Update Config:**
   After deployment, update `js/config.js` with your production backend URL:
   ```javascript
   production: {
     baseURL: 'https://your-backend-app.onrender.com/api'
   }
   ```

4. **Redeploy:**
   - Commit and push changes
   - Render will auto-deploy

### Option 2: Web Service with Static Files

If you prefer to serve via Node.js:

1. Create `package.json`:
```json
{
  "name": "dbams-frontend",
  "version": "1.0.0",
  "scripts": {
    "start": "npx http-server . -p $PORT"
  }
}
```

2. **Render Configuration:**
   - **Build Command:** `npm install -g http-server`
   - **Start Command:** `npm start`

## Demo Credentials

After backend seeding:

```
Admin:
  Email: admin@dbams.com
  Password: admin123

Approver:
  Email: john.approver@dbams.com
  Password: password123

Requester:
  Email: mike.requester@dbams.com
  Password: password123
```

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Modern mobile browsers

## Security Features

- JWT token authentication
- Token stored in localStorage
- Auto-logout on session expiration
- CSRF protection via HTTP-only cookies
- Role-based route protection

## Responsive Design

- Desktop-first design
- Mobile-friendly
- Breakpoints at 768px and 992px
- Touch-friendly buttons and controls

## Troubleshooting

### CORS Errors
- Ensure backend CORS is configured to allow your frontend domain
- Check `src/app.js` in backend for allowed origins

### API Connection Issues
- Verify backend is running
- Check API URL in `js/config.js`
- Open browser console for error details

### Login Issues
- Ensure backend database is seeded
- Check network tab in browser dev tools
- Verify credentials are correct

## Development Tips

1. **Browser Dev Tools:** Use F12 to debug JavaScript
2. **Network Tab:** Monitor API requests/responses
3. **Console Tab:** View error messages and logs
4. **Application Tab:** Check localStorage for token

## Support

For issues or questions:
- Check backend logs
- Review browser console errors
- Verify API endpoint configuration

## License

MIT License - See backend repository for details
