import pytest
from app.services.file_executor import FileExecutor

@pytest.fixture
def fileExecutor():
    return FileExecutor()


def test_ExecuteFileSuccess(fileExecutor):
    
    pythonCode = b"""
        num1 = int(input())
        num2 = int(input())
        result = num1 + num2
        print(result)
    """

    result = fileExecutor.executeFile(pythonCode)
    
    assert result is True
    
    
def test_ExecuteFileFailure(fileExecutor):
    
    pythonCode = b"""
        num1 = int(input())
        num2 = int(input())
        result = num1 - num2
        print(result)
    """
    
    result = fileExecutor.executeFile(pythonCode)
    assert result is False
    
    
def test_ExecuteFileFailureByTimeOut(fileExecutor):
    pythonCode = b"""
        while True:
            pass
    """
    
    result = fileExecutor.executeFile(pythonCode)
    assert result is False
    
  
