# Quick Start Guide - DBAMS

Get the Delegation-Based Approval Management System running locally in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account (or local MongoDB)
- Web browser (Chrome recommended)
- Git

## Step 1: Backend Setup (2 minutes)

### 1.1 Navigate to Backend
```bash
cd "d:\dheepak shakthi\fsd_39\Delegation-Based-Approval-Management-System-Backend"
```

### 1.2 Install Dependencies
```bash
npm install
```

### 1.3 Create .env File
Create a file named `.env` in the backend root with:

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=:"your_mongodb_uri"
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
JWT_COOKIE_EXPIRE=7
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=noreply@dbams.com
FRONTEND_URL=http://localhost:5500
```

### 1.4 Seed Database (Create Demo Users)
```bash
npm run seed
```

You should see:
```
✅ Database seeded successfully!
✅ Created 5 users
✅ Created 10 approval requests
✅ Created 3 delegations
✅ Created 15 comments
```

### 1.5 Start Backend Server
```bash
npm run dev
```

You should see:
```
🚀 Server running in development mode
📍 Server running on port 5000
✅ MongoDB Connected: dbams.kpdevvj.mongodb.net
```

**Keep this terminal open!**

## Step 2: Frontend Setup (1 minute)

### 2.1 Open Frontend Folder
Open a new terminal/command prompt:
```bash
cd "d:\dheepak shakthi\fsd_39\Delegation-Based-Approval-Management-System-Frontend"
```

### 2.2 Open in Browser

**Option A: Using VS Code Live Server**
1. Open the frontend folder in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"
4. Browser opens at `http://localhost:5500` or `http://127.0.0.1:5500`

**Option B: Direct Browser Open**
1. Navigate to the frontend folder
2. Double-click `index.html`
3. Opens in default browser

**Option C: Using http-server**
```bash
npx http-server . -p 3000 -o
```

## Step 3: Test the Application (2 minutes)

### 3.1 Login with Demo Accounts

**Admin Account:**
```
Email: admin@dbams.com
Password: admin123
```

**Approver Account:**
```
Email: john.approver@dbams.com
Password: password123
```

**Requester Account:**
```
Email: mike.requester@dbams.com
Password: password123
```

### 3.2 Test Features

1. **Login as Requester** (mike.requester@dbams.com)
   - ✅ View dashboard
   - ✅ Create a new request
   - ✅ View your requests
   - ✅ Add comments

2. **Login as Approver** (john.approver@dbams.com)
   - ✅ View pending approvals
   - ✅ Approve or reject requests
   - ✅ Create a delegation
   - ✅ View delegation status

3. **Login as Admin** (admin@dbams.com)
   - ✅ View all requests
   - ✅ Manage users
   - ✅ Update user roles
   - ✅ View system statistics

## Troubleshooting

### Backend Won't Start

**Error: MongoDB Connection Failed**
```bash
# Check if MongoDB URI is correct in .env
# Verify MongoDB Atlas is accessible
# Check network connection
```

**Error: Port 5000 Already in Use**
```bash
# Change PORT in .env to 5001
PORT=5001

# Update frontend config.js:
baseURL: 'http://localhost:5001/api'
```

### Frontend Issues

**Error: CORS Policy Blocked**
- Ensure backend is running
- Check `FRONTEND_URL` in backend `.env`
- Verify frontend URL matches (http://localhost:5500 or http://127.0.0.1:5500)

**Error: Cannot Login**
- Check if backend is running
- Verify API URL in `js/config.js`
- Check browser console (F12) for errors
- Ensure database was seeded

**Error: 404 Not Found**
- Check if backend API is responding: http://localhost:5000/
- Verify routes are correct

## File Structure

```
workspace/
├── Delegation-Based-Approval-Management-System-Backend/
│   ├── src/
│   │   ├── server.js          # Entry point
│   │   ├── app.js             # Express app
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── scripts/
│   │   │   └── seed.js        # Database seeding
│   │   └── utils/
│   ├── package.json
│   └── .env                   # Create this!
│
└── Delegation-Based-Approval-Management-System-Frontend/
    ├── index.html             # Landing page
    ├── login.html             # Start here
    ├── dashboard.html
    ├── css/
    │   └── styles.css         # Boxy theme
    └── js/
        ├── config.js          # API configuration
        ├── api.js             # API client
        ├── auth.js            # Auth utilities
        └── utils.js           # Helper functions
```

## Next Steps

1. ✅ Application is running locally
2. ⏩ Explore all features
3. ⏩ Customize colors in `css/styles.css`
4. ⏩ Add your own data
5. ⏩ Deploy to Render (see DEPLOYMENT.md)

## Quick Commands Reference

### Backend
```bash
# Install dependencies
npm install

# Seed database
npm run seed

# Start development server
npm run dev

# Start production server
npm start
```

### Frontend
```bash
# No build needed - pure HTML/CSS/JS
# Just open in browser or use Live Server
```

## Environment URLs

- **Backend API:** http://localhost:5000
- **Frontend:** http://localhost:5500 (or port Live Server uses)
- **API Docs:** See API_GUIDE.md in backend folder

## Demo Data Created by Seeding

- **5 Users:**
  - 1 Admin
  - 2 Approvers
  - 2 Requesters

- **10 Approval Requests:**
  - Various types (Leave, Purchase, Budget, etc.)
  - Different statuses (Pending, Approved, Rejected)
  - Different priorities (Low to Urgent)

- **3 Delegations:**
  - Some active, some scheduled
  - Between different approvers

- **15 Comments:**
  - Distributed across various requests

## Support & Documentation

- **Backend API:** See `API_GUIDE.md` in backend folder
- **Database Schema:** See `DATABASE_SCHEMA.md` in backend folder
- **Deployment:** See `DEPLOYMENT.md` in both folders
- **Full Documentation:** See `README.md` files

## Tips

1. **Keep Backend Running:** The backend must be running for frontend to work
2. **Check Console:** Use F12 in browser to debug issues
3. **Test All Roles:** Login as different users to see role-based features
4. **Clear Storage:** If issues persist, clear browser localStorage (F12 → Application → Local Storage)

---

**🎉 You're all set! Start exploring the application!**

Need help? Check the browser console (F12) for detailed error messages.
