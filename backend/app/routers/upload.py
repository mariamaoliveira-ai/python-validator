from datetime import datetime

from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile

from ..schemas.file_validation import CreateFileUpload
from ..services.file_executor import FileExecutor

router = APIRouter()

def getExecutor() -> FileExecutor:
    """Dependency to provide FileExecutor singleton"""
    return FileExecutor()


def getMetadata(
    student_name: str = Form(...)
) -> CreateFileUpload:
    return CreateFileUpload(
        student_name=student_name
    )

@router.post("/upload_file")
def upload_file(
    metadata: CreateFileUpload = Depends(getMetadata),
    file: UploadFile = File(...),
    executor: FileExecutor = Depends(getExecutor),
):
    
    result = executor.execute_file()
    
    if result:
        return {
        "message": f"File received: {file.filename}",
        "execution_status": "Executed"
        }
    else:
        raise HTTPException(
            status_code = 400,
            detail={
                "message": "Submission Failed",
                 "execution_status": "Failed"
            }
        )
  