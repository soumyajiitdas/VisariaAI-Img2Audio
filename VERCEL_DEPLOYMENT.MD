# Deployment Guide for VisariaAI - Backend on Render + Frontend on Vercel

## Prerequisites
- Vercel account (free tier available)
- GitHub repository with your code
- Basic understanding of environment variables

## Backend Deployment (FastAPI to Render) - RECOMMENDED ✅

### Why Render for Backend?
- **Better for ML Models**: Persistent storage and longer request timeouts
- **No Cold Starts**: Always-on instances for consistent performance  
- **Higher Memory Limits**: Better suited for PyTorch and BLIP model
- **Easier Setup**: Direct GitHub integration with automatic deployments

### 1. Prepare Backend for Render
Your backend is already configured with:
- `main.py` as entry point
- All routes prefixed with `/api` 
- `requirements.txt` with all dependencies

### 2. Create Render Account & Deploy
1. Go to [render.com](https://render.com) and sign up (free tier available)
2. Connect your GitHub account
3. Click "New +" → "Web Service"
4. Connect your repository
5. Configure deployment:
   - **Root Directory**: `backend` (if in subfolder)
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Python Version**: 3.11 or 3.12

### 3. Configure Environment Variables in Render
In your Render service dashboard → Environment:
```
MONGO_URL=your_mongodb_atlas_connection_string
DB_NAME=visaria_ai  
CORS_ORIGINS=https://visaria-ai.vercel.app,https://your-frontend-domain.vercel.app
PORT=10000
```

### 4. Render Service Configuration
```yaml
# render.yaml (optional - for advanced configuration)
services:
  - type: web
    name: visaria-ai-backend
    env: python
    buildCommand: pip install -r requirements.txt
    startCommand: uvicorn main:app --host 0.0.0.0 --port $PORT
    plan: free  # or starter/standard for better performance
```

## Frontend Deployment (Next.js to Vercel)

### 1. Deploy Frontend
1. Push frontend code to GitHub (can be same repo, different folder)
2. Go to Vercel dashboard → New Project
3. Import from GitHub
4. Set root directory to `frontend/` if needed
5. Vercel will auto-detect Next.js and configure build settings

### 2. Configure Frontend Environment Variables in Vercel
In Vercel project settings → Environment Variables, add:
```
NEXT_PUBLIC_API_URL=https://your-backend-domain.vercel.app
```

## Important Notes

### For Backend (Render):
- **MongoDB**: Use MongoDB Atlas (free tier available)
- **Model Loading**: First request downloads BLIP model (~500MB) - cached afterward
- **Memory**: Render provides adequate memory for PyTorch models
- **Performance**: Persistent instances eliminate cold starts
- **Timeouts**: No strict timeout limits like serverless functions

### For Frontend:
- **Environment Variables**: Must use `NEXT_PUBLIC_` prefix for client-side access
- **API Calls**: All backend calls automatically routed through Vercel's proxy

### Performance Optimizations:
1. **Model Caching**: Consider using persistent storage for model files
2. **Image Optimization**: Implement image compression before processing
3. **Streaming**: For large audio files, consider streaming responses

## Troubleshooting

### Common Backend Issues (Render):
- **Build Failures**: Ensure requirements.txt includes all dependencies
- **Model Download**: First deployment may take longer due to model download
- **Memory Usage**: Monitor memory usage for PyTorch models
- **Port Configuration**: Render uses $PORT environment variable

### Common Frontend Issues:
- **CORS Errors**: Check backend CORS_ORIGINS includes frontend domain
- **API Connection**: Verify NEXT_PUBLIC_API_URL points to correct backend
- **Build Errors**: Ensure all dependencies are properly installed

## Alternative: Why Render > Vercel for ML Backends

### Render Advantages for AI/ML:
- **Persistent Storage**: Models stay loaded between requests
- **No Timeout Limits**: Long-running AI processing supported  
- **Better Memory**: Up to 4GB RAM on free tier vs 1GB on Vercel
- **Always-On**: No cold starts = faster response times
- **Docker Support**: More flexibility for complex dependencies

### Vercel Limitations for ML:
- **10s timeout** on free tier (60s on pro) - too short for AI models
- **1GB memory limit** - insufficient for PyTorch models  
- **Cold starts** - models reload on every request
- **Serverless architecture** - not ideal for persistent ML models

## Testing Deployment

### After Deployment:
1. Visit your frontend URL (Vercel)
2. Update API URL to point to your Render backend
3. Upload a test image  
4. Verify caption generation works
5. Test audio playback
6. Check browser console for any errors
7. Test different languages

### Health Checks:
- **Backend**: Visit `https://your-app-name.onrender.com/api/`
- Should return: `{"message": "Hello World"}`
- **Frontend**: Visit your Vercel URL and test full functionality

## Cost Considerations

### Render Pricing:
- **Free Tier**: 750 hours/month, sleeps after 15min inactivity, 512MB RAM
- **Starter Plan**: $7/month, no sleeping, 1GB RAM, priority support
- **Standard Plan**: $25/month, 4GB RAM, faster builds, more resources

### Vercel Pricing (Frontend):
- **Hobby Plan**: Free, 100GB bandwidth, perfect for frontend
- **Pro Plan**: $20/month, 1TB bandwidth (if you need more traffic)

### Recommendations:
- **Start with Render Free + Vercel Free** for testing
- **Upgrade Render to Starter** ($7) if you need always-on backend  
- **Frontend stays free** on Vercel unless high traffic

## Security Notes
- Never expose API keys in frontend code
- Use environment variables for all secrets
- Consider rate limiting for production use
- Implement proper error handling to avoid exposing system details

Your application is now ready for deployment! 🚀