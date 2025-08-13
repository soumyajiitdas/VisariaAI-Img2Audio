from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes import image_caption
from api.routes import tts
from api.routes import translate
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI()

app.include_router(image_caption.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("CORS_ORIGIN", "http://localhost:3000")],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tts.router)

app.include_router(translate.router)

@app.get("/")
def root():
    return {"message": "VisariaAI backend running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("PORT", 8000)))


