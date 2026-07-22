import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.database import Base
from app.models.submission import SubmissionModel

SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"

@pytest.fixture
def db_session():
    engine = create_engine(SQLALCHEMY_DATABASE_URL)
    Base.metadata.create_all(bind=engine)
    TestingSessionLocal = sessionmaker(bind=engine)
    session = TestingSessionLocal()
    try:
        yield session
    finally:
        session.close()
        

def test_shouldSaveSubmissionDetailsInDatabase(db_session):
    
    new_submission = SubmissionModel(
        student_name = "Aluno Mock",
        file_name = "solucao.py",
        status = "SUCCESS",
        result_execution = "Resultado da execução do código"
    )
    
    db_session.add(new_submission)
    db_session.commit()
    db_session.refresh(new_submission)
    
    assert new_submission.id is not None
    assert new_submission.student_name == "Aluno Mock"
    assert new_submission.status == "SUCCESS"