from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes import image_caption
from api.routes import tts
from api.routes import translate

app = FastAPI()

app.include_router(image_caption.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tts.router)

app.include_router(translate.router)

@app.get("/")
def root():
    return {"message": "VisariaAI backend running"}


