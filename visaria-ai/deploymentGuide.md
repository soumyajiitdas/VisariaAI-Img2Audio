# 🚀 Deployment Guide for VisariaAI

This guide will help you deploy the frontend and backend separately on Render while properly configuring CORS.

## 🔧 CORS Configuration Fixed

The CORS policy issues have been resolved with the following improvements:

### Backend Changes:
1. **Environment-based CORS configuration** - More secure and flexible
2. **Proper origin handling** - Supports multiple environments
3. **Enhanced error handling** - Better debugging information

### Frontend Changes:
1. **Centralized API configuration** - Single source of truth for API calls
2. **Better error handling** - More informative error messages for CORS issues
3. **Environment variable support** - Easy configuration for different deployments

## 📋 Environment Configuration

### Backend Environment Variables (`.env` file in `/backend` folder):
```
PORT=8000
FRONTEND_URL=https://your-frontend-app.onrender.com
ADDITIONAL_ORIGINS=
```

### Frontend Environment Variables (`.env` file in `/frontend` folder):
```
NEXT_PUBLIC_API_URL=https://your-backend-app.onrender.com
```

## 🏗️ Deployment Steps on Render

### 1. Deploy Backend First

1. **Create a new Web Service on Render**
2. **Connect your GitHub repository**
3. **Configure the service:**
   - **Root Directory:** `visaria-ai/backend`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Environment:** Python 3

4. **Set Environment Variables:**
   ```
   PORT=8000
   FRONTEND_URL=https://your-frontend-app.onrender.com
   ```
   (Replace `your-frontend-app` with your actual frontend service name)

5. **Note down the backend URL** (e.g., `https://your-backend-app.onrender.com`)

### 2. Deploy Frontend

1. **Create a new Web Service on Render**
2. **Connect your GitHub repository**
3. **Configure the service:**
   - **Root Directory:** `visaria-ai/frontend`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Environment:** Node

4. **Set Environment Variables:**
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-app.onrender.com
   ```
   (Use the backend URL from step 1)

### 3. Update Backend CORS Configuration

1. **Go to your backend service on Render**
2. **Update the `FRONTEND_URL` environment variable** with your actual frontend URL:
   ```
   FRONTEND_URL=https://your-frontend-app.onrender.com
   ```
3. **Redeploy the backend service**

## 🔍 Troubleshooting CORS Issues

### Common Issues and Solutions:

1. **"CORS policy error" in browser console:**
   - Verify that `FRONTEND_URL` in backend matches your frontend URL exactly
   - Check that both services are deployed and running
   - Ensure no trailing slashes in URLs

2. **"Network error: Unable to connect to the server":**
   - Check if backend service is running
   - Verify `NEXT_PUBLIC_API_URL` in frontend is correct
   - Test backend health endpoint: `https://your-backend-app.onrender.com/health`

3. **Environment variables not working:**
   - Ensure environment variables are set in Render dashboard
   - Restart the service after changing environment variables
   - Check that variable names are exactly as shown above

### Development vs Production:

**Development (localhost):**
```bash
# Backend .env
FRONTEND_URL=http://localhost:3000

# Frontend .env  
NEXT_PUBLIC_API_URL=http://localhost:8000
```

**Production (Render):**
```bash
# Backend .env
FRONTEND_URL=https://your-frontend-app.onrender.com

# Frontend .env
NEXT_PUBLIC_API_URL=https://your-backend-app.onrender.com
```

## ✅ Verification Steps

1. **Test backend health endpoint:**
   ```
   curl https://your-backend-app.onrender.com/health
   ```
   Should return: `{"status": "ok"}`

2. **Test frontend loading:**
   - Open your frontend URL in browser
   - Check browser console for any CORS errors
   - Try uploading an image and generating a caption

3. **Test full workflow:**
   - Upload an image
   - Generate caption
   - Play/download audio
   - Check browser network tab for successful API calls

## 🛠️ Additional Configuration

### For Multiple Allowed Origins:
If you need to allow multiple frontend URLs (e.g., staging and production):

```bash
# Backend .env
FRONTEND_URL=https://your-main-frontend.onrender.com
ADDITIONAL_ORIGINS=https://your-staging-frontend.onrender.com,https://your-dev-frontend.onrender.com
```

### Custom Domain Support:
If using custom domains, update the environment variables accordingly:

```bash
# Backend .env
FRONTEND_URL=https://yourdomain.com

# Frontend .env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

## 🆘 Support

If you're still experiencing CORS issues after following this guide:

1. Check browser developer tools console for specific error messages
2. Verify all environment variables are set correctly
3. Ensure both services are deployed and running
4. Test the backend health endpoint directly

The CORS configuration is now production-ready and should handle separate deployments on Render without issues.