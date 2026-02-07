# Render Deployment Guide - DBAMS

Complete guide for deploying both frontend and backend to Render.

## Prerequisites

- GitHub account with repositories for frontend and backend
- Render account (free tier available)
- MongoDB Atlas account (free tier available)

## Part 1: Backend Deployment

### Step 1: Prepare Backend

1. **Ensure .gitignore includes:**
   ```
   node_modules/
   .env
   ```

2. **Push to GitHub:**
   ```bash
   cd Delegation-Based-Approval-Management-System-Backend
   git add .
   git commit -m "Prepare for Render deployment"
   git push origin main
   ```

### Step 2: MongoDB Atlas Setup

1. **Create Cluster:**
   - Go to https://cloud.mongodb.com
   - Create free cluster (if not exists)
   - Note your connection string

2. **Configure Network Access:**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Select "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

3. **Get Connection String:**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<password>` with your database password

### Step 3: Deploy Backend to Render

1. **Create New Web Service:**
   - Go to https://render.com
   - Click "New +" → "Web Service"
   - Connect your GitHub account
   - Select backend repository

2. **Configure Service:**
   ```
   Name: dbams-backend
   Environment: Node
   Region: Choose closest to you
   Branch: main
   Build Command: npm install
   Start Command: node src/server.js
   ```

3. **Add Environment Variables:**
   Click "Advanced" → "Add Environment Variable"
   
   ```env
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=mongodb+srv://adminDatabase:Rb3395@dbams.kpdevvj.mongodb.net/DBAMS
   JWT_SECRET=your-very-secure-random-secret-key-here-minimum-32-characters
   JWT_EXPIRE=7d
   JWT_COOKIE_EXPIRE=7
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-specific-password
   EMAIL_FROM=noreply@dbams.com
   FRONTEND_URL=https://your-frontend.onrender.com
   ```

   **Generate JWT Secret:**
   ```bash
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```

4. **Create Service:**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Note your backend URL: `https://dbams-backend.onrender.com`

### Step 4: Test Backend

Visit: `https://your-backend-url.onrender.com/`

Should see:
```json
{
  "success": true,
  "message": "Delegation-Based Approval Management System API"
}
```

### Step 5: Seed Database

1. **Option A: Using Render Shell**
   - Go to your service
   - Click "Shell" tab
   - Run: `node src/scripts/seed.js`

2. **Option B: Using API Tool (Postman/Thunder Client)**
   - You may need to create a seed endpoint
   - Or manually create admin user via API

## Part 2: Frontend Deployment

### Step 1: Update Frontend Config

1. **Edit `js/config.js`:**
   ```javascript
   const API_CONFIG = {
     development: {
       baseURL: 'http://localhost:5000/api'
     },
     production: {
       baseURL: 'https://dbams-backend.onrender.com/api' // Your actual backend URL
     }
   };
   ```

2. **Commit and Push:**
   ```bash
   cd Delegation-Based-Approval-Management-System-Frontend
   git add .
   git commit -m "Update production API URL"
   git push origin main
   ```

### Step 2: Deploy Frontend to Render

1. **Create New Static Site:**
   - Go to Render Dashboard
   - Click "New +" → "Static Site"
   - Connect GitHub repository
   - Select frontend repository

2. **Configure Static Site:**
   ```
   Name: dbams-frontend
   Branch: main
   Build Command: (leave empty)
   Publish Directory: .
   ```

3. **Create Static Site:**
   - Click "Create Static Site"
   - Wait for deployment (1-2 minutes)
   - Note your frontend URL: `https://dbams-frontend.onrender.com`

### Step 3: Update Backend with Frontend URL

1. **Go to Backend Service:**
   - Open backend service in Render
   - Go to "Environment"
   - Update `FRONTEND_URL` variable:
   ```
   FRONTEND_URL=https://dbams-frontend.onrender.com
   ```

2. **Trigger Redeploy:**
   - Click "Manual Deploy" → "Deploy latest commit"
   - Wait for redeployment

## Part 3: Verification

### Test Complete Flow

1. **Visit Frontend:**
   - Go to `https://your-frontend.onrender.com`
   - Should see landing page

2. **Test Login:**
   - Click "Login"
   - Use demo credentials:
     ```
     Email: admin@dbams.com
     Password: admin123
     ```

3. **Test Features:**
   - ✅ Dashboard loads
   - ✅ Create new request
   - ✅ View requests
   - ✅ Approve/reject (as approver)
   - ✅ Create delegation
   - ✅ View users (as admin)

### Common Issues

#### Issue: CORS Error
**Solution:**
- Verify `FRONTEND_URL` in backend env vars
- Check backend CORS configuration in `src/app.js`
- Ensure frontend domain is correct

#### Issue: API Connection Failed
**Solution:**
- Verify backend is running
- Check API URL in frontend `js/config.js`
- Ensure backend URL doesn't have trailing slash

#### Issue: MongoDB Connection Error
**Solution:**
- Verify MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
- Check connection string format
- Ensure database user has correct permissions

#### Issue: Email Not Sending
**Solution:**
- Use Gmail App Password, not regular password
- Enable "Less secure app access" or use App Password
- Verify EMAIL_* environment variables

## Part 4: Post-Deployment

### 1. Custom Domain (Optional)

**Backend:**
- Go to backend service → Settings → Custom Domain
- Add your domain (e.g., api.yourdomain.com)

**Frontend:**
- Go to static site → Settings → Custom Domain
- Add your domain (e.g., app.yourdomain.com)

### 2. Monitor Services

- Check "Logs" tab for errors
- Set up "Notifications" for deploy failures
- Monitor "Metrics" for performance

### 3. Backup Strategy

- MongoDB Atlas has automatic backups
- Download local copy of database periodically
- Keep git repositories up to date

### 4. Free Tier Limitations

**Render Free Tier:**
- Services spin down after 15 minutes of inactivity
- First request after sleep takes ~30 seconds
- 750 hours/month total across all services

**Solutions:**
- Upgrade to paid plan for production
- Use UptimeRobot to ping services every 14 minutes
- Warn users about first-load delay

### 5. Enable Auto-Deploy

**Backend:**
- Settings → Build & Deploy → Auto-Deploy: Yes

**Frontend:**
- Settings → Build & Deploy → Auto-Deploy: Yes

Now any push to main branch auto-deploys!

## Part 5: Environment Variables Summary

### Backend Environment Variables

```env
# Node Environment
NODE_ENV=production

# Server Port (Render provides this)
PORT=5000

# Database
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/DBAMS

# JWT Configuration
JWT_SECRET=generate-with-crypto-randomBytes-64
JWT_EXPIRE=7d
JWT_COOKIE_EXPIRE=7

# Email Configuration (Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=noreply@dbams.com

# Frontend URL (for CORS)
FRONTEND_URL=https://your-frontend.onrender.com
```

### Frontend (No Env Vars Needed)
Configuration is in `js/config.js` file.

## Part 6: Maintenance

### Update Application

1. **Make Changes Locally:**
   ```bash
   # Make your code changes
   git add .
   git commit -m "Your change description"
   git push origin main
   ```

2. **Auto-Deploy:**
   - Render automatically deploys on push (if enabled)
   - Check deployment logs

3. **Manual Deploy:**
   - Go to service/site
   - Click "Manual Deploy" → "Deploy latest commit"

### View Logs

**Backend:**
- Go to service → Logs
- Use search to find specific errors
- Download logs for analysis

**Frontend:**
- Go to static site → Deploys
- Click on deploy to view build logs

### Database Management

**View Data:**
- Use MongoDB Atlas web interface
- Or use MongoDB Compass (desktop app)
- Connection string is same as `MONGODB_URI`

**Backup:**
```bash
# Using mongodump (requires MongoDB tools)
mongodump --uri="your-connection-string"
```

## Troubleshooting Checklist

- [ ] Backend deploys successfully
- [ ] Backend root endpoint returns JSON
- [ ] MongoDB connection works
- [ ] Frontend deploys successfully
- [ ] Frontend loads in browser
- [ ] Login works (test with admin@dbams.com)
- [ ] API calls succeed (check browser console)
- [ ] CORS allows frontend domain
- [ ] Environment variables are correct
- [ ] Email notifications work (optional)

## Support Resources

- **Render Docs:** https://render.com/docs
- **MongoDB Atlas:** https://docs.atlas.mongodb.com
- **Bootstrap 5:** https://getbootstrap.com/docs/5.3

## Cost Estimate

**Free Tier (Current):**
- MongoDB Atlas: $0
- Render Backend: $0 (with limitations)
- Render Frontend: $0
- **Total: $0/month**

**Paid Tier (Recommended for Production):**
- MongoDB Atlas: $9/month (M2 cluster)
- Render Backend: $7/month (Starter plan)
- Render Frontend: $0 (static site always free)
- **Total: ~$16/month**

## Next Steps

1. ✅ Deploy backend to Render
2. ✅ Deploy frontend to Render
3. ✅ Test complete application flow
4. ⏳ Set up custom domain (optional)
5. ⏳ Enable monitoring and alerts
6. ⏳ Create backup strategy
7. ⏳ Consider upgrading for production

---

**Deployment Complete! 🎉**

Your Delegation-Based Approval Management System is now live!
