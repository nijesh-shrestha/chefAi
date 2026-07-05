import pytest
from fastapi.testclient import TestClient

from model import classifier


def fake_pipeline(image, top_k=1):
    return [{"label": "pizza", "score": 0.97}]


@pytest.fixture
def client():
    # Setting _pipeline directly means classifier.load() (called during the
    # app's startup lifespan) sees the model as already loaded and skips the
    # real, network-heavy Hugging Face download.
    classifier._pipeline = fake_pipeline

    from main import app

    with TestClient(app) as test_client:
        yield test_client

    classifier._pipeline = None
