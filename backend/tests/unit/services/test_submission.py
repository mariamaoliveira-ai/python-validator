import pytest
from unittest.mock import MagicMock
from app.services.submission import SubmissionService

def test_shouldSaveSubmissionOnExecutionSuccess():
    
    mockDB = MagicMock()
    mockExecutor = MagicMock()
    mockExecutor.executeFile.return_value = True
    
    service = SubmissionService(db=mockDB, executor=mockExecutor)

    result = service.processSubmission(
        studentName = "Aluno Mock",
        fileName = "solution.py",
        fileBytes = b"print('5')"
    )
    
    assert mockDB.add.called
    assert mockDB.commit.called
    assert mockDB.refresh.called
    assert result.status == "SUCCESS"
    assert result.student_name == "Aluno Mock" 
    
    
def test_shouldSaveSubmissionOnExecutionFailure():
    
    mockDB = MagicMock()
    mockExecutor = MagicMock()
    mockExecutor.executeFile.side_effect = Exception("execution failed")
    
    service = SubmissionService(db=mockDB, executor=mockExecutor)

    result = service.processSubmission(
        studentName = "Aluno Mock",
        fileName = "solution.py",
        fileBytes = b"print('5')"
    )
    
    assert mockDB.add.called
    assert mockDB.commit.called
    assert mockDB.refresh.called
    assert result.status == "FAILED"
    assert result.student_name == "Aluno Mock" 
    assert result.result_execution == "execution failed"