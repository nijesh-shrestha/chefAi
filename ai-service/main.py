import io
import os
from contextlib import asynccontextmanager

from dotenv import load_dotenv
from fastapi import FastAPI, File, HTTPException, UploadFile
from PIL import Image, UnidentifiedImageError

from model import classifier

load_dotenv()

CONFIDENCE_THRESHOLD = float(os.getenv("CONFIDENCE_THRESHOLD", "0.5"))
ALLOWED_CONTENT_TYPES = {"image/jpeg", "image/png", "image/webp"}


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Loaded once here, at process startup - never reloaded per-request.
    classifier.load()
    print(f"Model '{classifier.model_name}' loaded and ready.")
    yield


app = FastAPI(title="SmartChef AI - Image Recognition Service", lifespan=lifespan)


@app.get("/health")
async def health():
    return {"status": "ok", "model_loaded": classifier.is_loaded}


@app.post("/predict")
async def predict(image: UploadFile = File(...)):
    if image.content_type not in ALLOWED_CONTENT_TYPES:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported content type '{image.content_type}'. "
            f"Allowed: {', '.join(ALLOWED_CONTENT_TYPES)}",
        )

    try:
        contents = await image.read()
        pil_image = Image.open(io.BytesIO(contents)).convert("RGB")
    except UnidentifiedImageError:
        raise HTTPException(status_code=400, detail="Uploaded file is not a valid image")

    if not classifier.is_loaded:
        raise HTTPException(status_code=503, detail="Model is still loading, try again shortly")

    result = classifier.predict(pil_image)
    result["low_confidence"] = result["confidence"] < CONFIDENCE_THRESHOLD

    return result
