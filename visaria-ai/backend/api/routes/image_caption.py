# api/routes/image_caption.py
from fastapi import APIRouter, UploadFile, File
from fastapi.responses import JSONResponse
from models.blip_model import generate_caption

router = APIRouter()

@router.post("/caption")
async def caption_image(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        return JSONResponse(content={"error": "Invalid file type"}, status_code=400)
    
    image_bytes = await file.read()
    try:
        caption = generate_caption(image_bytes)
        return {"caption": caption}
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
