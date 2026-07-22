from datetime import datetime

from pydantic import BaseModel, Field, ValidationError

class CreateFileUpload(BaseModel):
    student_name: str = Field(..., description="Name of the student submitting the file")