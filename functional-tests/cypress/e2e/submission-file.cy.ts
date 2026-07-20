describe('File Upload Success Flow', () => {
  const testData = {
    studentName: 'John Doe',
    filename: 'sum_two_numbers.py',
  };

  beforeEach(() => {
    cy.visit('/');
  });

  it('should display success message after uploading and submitting a valid Python file', () => {
    // Fill in student name
    cy.get('#student-input').type(testData.studentName);

    // Upload the valid Python file
    cy.get('#file-upload').selectFile(`cypress/fixtures/${testData.filename}`);

    // Submit the form
    cy.get('[name="submit"]').click();

    // Verify success message appears
    cy.get('[role="alert"]').should('be.visible');
    cy.get('[role="alert"]').should('contain', 'File received');
  });
});