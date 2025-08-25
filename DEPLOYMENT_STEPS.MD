# Quick Deployment Steps - Render Backend + Vercel Frontend

## 🚀 Deploy Backend to Render (Recommended for ML workloads)

### Step 1: MongoDB Setup
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account and cluster
3. Get connection string (replace `<password>` with your password)

### Step 2: Deploy to Render  
1. Go to [render.com](https://render.com) → Sign up
2. Click "New +" → "Web Service" 
3. Connect GitHub → Select your repository
4. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `pip install -r requirements.txt` 
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Add Environment Variables:
   ```
   MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/
   DB_NAME=visaria_ai
   CORS_ORIGINS=https://visaria-ai.vercel.app
   ```
6. Deploy! 🚀

### Step 3: Get Your Backend URL
- After deployment, you'll get a URL like: `https://your-app-name.onrender.com`
- Test it: `https://your-app-name.onrender.com/api/` should return `{"message": "Hello World"}`

## 🌐 Deploy Frontend to Vercel

### Step 1: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) → Sign up
2. "New Project" → Import from GitHub  
3. Select your repository
4. Set **Root Directory**: `frontend` (if in subfolder)
5. Deploy!

### Step 2: Configure Frontend Environment  
1. In Vercel project → Settings → Environment Variables
2. Add:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-name.onrender.com
   ```
3. Redeploy to apply changes

## ✅ Test Everything

1. **Visit your frontend URL** (Vercel will provide it)
2. **Upload an image** using drag-drop or file selection
3. **Select a language** (English/Hindi/Bengali)  
4. **Click "Generate Caption"** 
5. **Verify**: Caption appears + audio plays automatically
6. **Test audio controls**: Play Again & Download buttons
7. **Check History page**: Previous results should be saved

## 🔧 Troubleshooting

### If Backend Not Working:
- Check Render logs for errors
- Verify MongoDB connection string is correct
- Ensure CORS_ORIGINS includes your frontend URL

### If Frontend Can't Connect:
- Check Vercel environment variables
- Verify NEXT_PUBLIC_API_URL points to correct Render URL  
- Check browser console for CORS errors

### If Image Processing Fails:
- First request may take 1-2 minutes (BLIP model download)
- Check Render service logs for memory/timeout issues
- Consider upgrading to Render Starter plan ($7/month) for better performance

## 💡 Pro Tips

1. **Always-On Backend**: Upgrade to Render Starter ($7/month) to prevent sleeping
2. **MongoDB Free Tier**: 512MB storage is enough for development/testing
3. **Frontend Caching**: Vercel automatically optimizes your Next.js app
4. **Custom Domain**: Both Render and Vercel support custom domains on paid plans

## 🎉 You're Live!

Your VisariaAI is now deployed and accessible worldwide! 
- **Frontend**: Fast, globally distributed via Vercel CDN
- **Backend**: Always available with proper ML model support via Render
- **Database**: Reliable cloud MongoDB via Atlas

Perfect setup for an AI-powered application! 🤖✨