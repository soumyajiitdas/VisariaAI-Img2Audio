from fastapi import APIRouter, Form
from googletrans import Translator

router = APIRouter()
translator = Translator()

@router.post("/translate")
async def translate_caption(text: str = Form(...), target_lang: str = Form(...)):
    try:
        translated = translator.translate(text, dest=target_lang)
        return {"translated_text": translated.text}
    except Exception as e:
        return {"error": str(e)}