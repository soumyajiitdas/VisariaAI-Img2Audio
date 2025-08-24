from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes import image_caption
from api.routes import tts
from api.routes import translate
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()

# Configure CORS for production deployment
def get_allowed_origins():
    """Get allowed origins from environment variables"""
    origins = []
    
    # Add frontend URL from environment
    frontend_url = os.getenv("FRONTEND_URL", "http://localhost:3000")
    if frontend_url:
        origins.append(frontend_url)
    
    # Add additional origins if specified
    additional_origins = os.getenv("ADDITIONAL_ORIGINS", "")
    if additional_origins:
        origins.extend([origin.strip() for origin in additional_origins.split(",") if origin.strip()])
    
    # For development, also allow common localhost ports
    if "localhost" in frontend_url or "127.0.0.1" in frontend_url:
        origins.extend([
            "http://localhost:3000",
            "http://127.0.0.1:3000",
            "http://localhost:3001",
            "http://127.0.0.1:3001"
        ])
    
    # Remove duplicates
    return list(set(origins))

allowed_origins = get_allowed_origins()

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
    expose_headers=["*"],
)

app.include_router(image_caption.router)

app.include_router(tts.router)

app.include_router(translate.router)

@app.get("/")
def root():
    return {"message": "VisariaAI backend running"}

@app.get("/health")
def health_check():
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("PORT", 8000)))


