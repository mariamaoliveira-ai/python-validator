from fastapi.testclient import TestClient
from unittest.mock import patch
from app.main import app

client = TestClient(app)

@patch("app.routers.upload.FileExecutor.executeFile")
def test_UploadFileWhenValidPayload(mockProcessFile):
    mockProcessFile.return_value = True
    
    metadata = {
        "student_name": "Maria"
    }
    
    fileContent = b"print('Hello, World!')"
    files = {
        "file": ("my_python_file.py", fileContent, "text/x-python")
    }

    response = client.post("/upload_file", data=metadata, files=files)

    assert response.status_code == 200
    assert response.json() == {
        "message": "File received: my_python_file.py",
        "execution_status": "Executed"
    }
    mockProcessFile.assert_called_once()


@patch("app.routers.upload.FileExecutor.executeFile")
def test_UploadFileWhenInvalidPayload(mockProcessFile):
    mockProcessFile.return_value = False
    payload = {
        "student_name": "Maria"
    }
    fileContent = b"print('Hello, World!')"
    files = {
        "file": ("my_python_file.py", fileContent, "text/x-python")
    }

    response = client.post("/upload_file", data=payload, files=files)

    assert response.status_code == 400
    assert response.json() == {
        "detail": {
            "message": "Submission Failed",
            "execution_status": "Failed"
        }
    }