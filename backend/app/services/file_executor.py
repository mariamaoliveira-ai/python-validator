import subprocess
import tempfile
import sys
import os
import textwrap

class FileExecutor:

    TIMEOUT_SECONDS = 3
    
    def __init__(self):
        pass

    def executeFile(self, fileContent: bytes):
        inputs = ["2", "3"]
        expectedOutput = "5"
        normalizedSource = textwrap.dedent(fileContent.decode("utf-8")).lstrip()
        
        with tempfile.NamedTemporaryFile(suffix=".py", delete=False) as tempFile:
            tempFile.write(normalizedSource.encode("utf-8"))
            tempPath = tempFile.name

        try:
            stdinData = "\n".join(inputs)+"\n"
            
            result = subprocess.run(
                [sys.executable, tempPath],
                input=stdinData,
                text = True, 
                capture_output= True,
                timeout= self.TIMEOUT_SECONDS
            )
            
            if result.returncode != 0:
                return False
            
            excutedOutput = result.stdout.strip()
            return excutedOutput == expectedOutput.strip()
        
        except(subprocess.TimeoutExpired, Exception):
            return False
        
        finally:
            if os.path.exists(tempPath):
                os.remove(tempPath)