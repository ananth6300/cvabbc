# How to Start BBC Construction Website

## Quick Start (Two PowerShell Windows)

### Window 1 - Backend Server:
1. Open PowerShell
2. Navigate to backend folder:
   ```
   cd "C:\Users\HP\OneDrive\Documents\Desktop\building website\backend"
   ```
3. Set environment variables (replace YOUR_MONGODB_URI):
   ```
   $env:PORT="5000"
   $env:MONGODB_URI="YOUR_MONGODB_URI_HERE"
   $env:JWT_SECRET="construction_secret_key_2024"
   $env:OWNER_PASSKEY="cvaram0404"
   $env:UPLOAD_PATH="./uploads"
   ```
4. Start server:
   ```
   npm run dev
   ```
5. You should see: "MongoDB Connected" and "Server running on port 5000"

### Window 2 - Frontend Server:
1. Open a NEW PowerShell window
2. Navigate to frontend folder:
   ```
   cd "C:\Users\HP\OneDrive\Documents\Desktop\building website\frontend"
   ```
3. Start React app:
   ```
   npm start
   ```
4. Browser will open at http://localhost:3000

## Or Use the Scripts:

**Backend:**
- Edit `start-backend.ps1` and replace `YOUR_MONGODB_URI_HERE` with your MongoDB Atlas connection string
- Right-click → Run with PowerShell

**Frontend:**
- Right-click `start-frontend.ps1` → Run with PowerShell

## Troubleshooting:

1. **Backend not connecting to MongoDB:**
   - Make sure you have a MongoDB Atlas account
   - Get your connection string from Atlas dashboard
   - Replace `YOUR_MONGODB_URI_HERE` with the actual connection string

2. **Port already in use:**
   - Close other applications using port 5000 or 3000
   - Or change the PORT in environment variables

3. **npm command not found:**
   - Install Node.js from nodejs.org
   - Restart PowerShell after installation

4. **Module not found errors:**
   - Run `npm install` in both backend and frontend folders

## Owner Login:
- Passkey: `cvaram0404`


