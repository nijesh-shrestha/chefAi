import os
from transformers import pipeline
from PIL import Image

MODEL_NAME = os.getenv("MODEL_NAME", "nateraw/food")


class FoodClassifier:
    """Wraps a Hugging Face image-classification pipeline.

    Loaded exactly once, at application startup, and reused for every
    request - never reconstructed per-request.
    """

    def __init__(self, model_name: str = MODEL_NAME):
        self.model_name = model_name
        self._pipeline = None

    def load(self):
        if self._pipeline is None:
            self._pipeline = pipeline("image-classification", model=self.model_name)
        return self

    @property
    def is_loaded(self) -> bool:
        return self._pipeline is not None

    def predict(self, image: Image.Image, top_k: int = 1):
        if self._pipeline is None:
            raise RuntimeError("Model has not been loaded yet")

        results = self._pipeline(image, top_k=top_k)
        # results: [{"label": "pizza", "score": 0.98}, ...]
        top = results[0]
        return {
            "food": top["label"].replace("_", " "),
            "confidence": round(float(top["score"]), 4),
        }


# Singleton instance shared across the app's lifespan
classifier = FoodClassifier()
