# models/blip_model.py
from transformers import BlipProcessor, BlipForConditionalGeneration
from PIL import Image
import torch
from io import BytesIO

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Load processor and model once
processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base").to(device)

def generate_caption(image_bytes):
    image = Image.open(BytesIO(image_bytes)).convert("RGB")
    inputs = processor(image, return_tensors="pt").to(device)
    out = model.generate(**inputs, max_new_tokens=30)
    caption = processor.decode(out[0], skip_special_tokens=True)
    return caption





