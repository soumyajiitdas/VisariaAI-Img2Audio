from fastapi import APIRouter, UploadFile, File
from models.blip_model import generate_caption

router = APIRouter()

@router.post("/caption")
async def generate_image_caption(file: UploadFile = File(...)):
    try:
        image_bytes = await file.read()
        caption = generate_caption(image_bytes)
        return {"caption": caption}
    except Exception as e:
        return {"error": str(e)}
