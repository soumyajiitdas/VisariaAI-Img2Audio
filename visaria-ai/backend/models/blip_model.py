from transformers import BlipProcessor, BlipForConditionalGeneration
from PIL import Image
import torch
from io import BytesIO

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Initialize processor and model as None
processor = None
model = None

def _load_blip_model():
    global processor, model
    if processor is None or model is None:
        print("Loading BLIP model and processor...")
        processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
        model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base").to(device)
        print("BLIP model and processor loaded.")

def generate_caption(image_bytes):
    _load_blip_model() # Ensure model is loaded
    image = Image.open(BytesIO(image_bytes)).convert("RGB")
    inputs = processor(image, return_tensors="pt").to(device)
    out = model.generate(**inputs, max_new_tokens=30)
    caption = processor.decode(out[0], skip_special_tokens=True)
    return caption





