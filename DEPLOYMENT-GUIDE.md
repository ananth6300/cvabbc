# 🚀 Deployment Guide: GitHub + Vercel

## 📋 Quick Steps Summary

### 1. GitHub Setup
```bash
# In PowerShell, navigate to your project
cd "C:\Users\HP\OneDrive\Documents\Desktop\building website"

# Initialize Git
git init
git add .
git commit -m "Initial commit - BBC Construction Website"

# Add your GitHub repo (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/building-website.git
git branch -M main
git push -u origin main
```

### 2. Vercel Deployment
1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "New Project" → Import `building-website`
4. Configure:
   - **Framework**: Other
   - **Root Directory**: `.` 
   - **Build Command**: `cd frontend && npm run build`
   - **Output Directory**: `frontend/build`
   - **Install Command**: `cd frontend && npm install && cd ../backend && npm install`

### 3. Environment Variables (in Vercel Dashboard)
```
MONGODB_URI=mongodb+srv://cvaweb:YOUR_PASSWORD@your-cluster.mongodb.net/construction_db?retryWrites=true&w=majority
JWT_SECRET=construction_secret_key_2024
OWNER_PASSKEY=cva1992
NODE_ENV=production
```

## 🔧 Important Notes

### Before Pushing to GitHub
1. **Update your MongoDB URI** in `start-backend.ps1`
2. **Remove sensitive data** from files if any
3. **Test locally** one more time

### After Deployment
- Your website will be available at: `https://your-project-name.vercel.app`
- Owner login: Use passkey `cva1992`
- All features will work the same as local

### Custom Domain (Optional)
1. In Vercel dashboard → Settings → Domains
2. Add your custom domain
3. Update DNS settings as instructed

## 🐛 Troubleshooting

### Build Issues
- Check that all dependencies are in package.json
- Verify build command is correct
- Check environment variables

### Database Issues
- Ensure MongoDB Atlas allows access from anywhere (0.0.0.0/0)
- Verify connection string format
- Check network access in Atlas settings

### API Issues
- Verify API routes are working locally
- Check CORS settings
- Ensure environment variables are set correctly

## 📱 Live Website Features Once Deployed

✅ Responsive design for all devices  
✅ Client inquiry system with database  
✅ Owner dashboard with authentication  
✅ Project showcase with filtering  
✅ Real-time database updates  
✅ Secure authentication  

Your live construction website will be fully functional!
