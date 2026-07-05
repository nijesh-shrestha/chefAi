import io

from PIL import Image


def make_test_image_bytes():
    image = Image.new("RGB", (10, 10), color="red")
    buffer = io.BytesIO()
    image.save(buffer, format="JPEG")
    buffer.seek(0)
    return buffer


def test_health_reports_model_loaded(client):
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok", "model_loaded": True}


def test_predict_rejects_unsupported_content_type(client):
    files = {"image": ("notes.txt", b"just some text", "text/plain")}

    response = client.post("/predict", files=files)

    assert response.status_code == 400
    assert "Unsupported content type" in response.json()["detail"]


def test_predict_rejects_corrupt_image(client):
    files = {"image": ("broken.jpg", b"not actually a jpeg", "image/jpeg")}

    response = client.post("/predict", files=files)

    assert response.status_code == 400
    assert "not a valid image" in response.json()["detail"]


def test_predict_returns_food_and_confidence(client):
    files = {"image": ("food.jpg", make_test_image_bytes(), "image/jpeg")}

    response = client.post("/predict", files=files)

    assert response.status_code == 200
    data = response.json()
    assert data["food"] == "pizza"
    assert data["confidence"] == 0.97
    assert data["low_confidence"] is False


def test_predict_flags_low_confidence(client, monkeypatch):
    from model import classifier

    monkeypatch.setattr(
        classifier,
        "predict",
        lambda image, top_k=1: {"food": "unknown dish", "confidence": 0.2},
    )

    files = {"image": ("food.jpg", make_test_image_bytes(), "image/jpeg")}
    response = client.post("/predict", files=files)

    assert response.status_code == 200
    assert response.json()["low_confidence"] is True
