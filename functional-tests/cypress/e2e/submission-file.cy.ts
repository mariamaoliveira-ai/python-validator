describe('File Upload Success Flow', () => {
  const testDataValid = {
    studentName: 'John Doe',
    filename: 'sum_two_numbers.py',
  };

  const testDataInValid = {
    studentName: 'John Doe',
    filename: 'sum_two_numbers_wrong.py',
  };

  beforeEach(() => {
    cy.visit('/');
  });

  it('should display success message after uploading and submitting a valid Python file', () => {
    // Fill in student name
    cy.get('#student-input').type(testDataValid.studentName);

    // Upload the valid Python file
    cy.get('#file-upload').selectFile(`cypress/fixtures/${testDataValid.filename}`);

    // Submit the form
    cy.get('[name="submit"]').click();

    // Verify success message appears
    cy.get('[role="alert"]').should('be.visible');
    cy.get('[role="alert"]').should('contain', 'File executed successfully and passed all tests.');
  });


  it('should display error message after uploading and submitting an invalid Python file', () => {
    // Fill in student name
    cy.get('#student-input').type(testDataInValid.studentName);

    // Upload the invalid Python file
    cy.get('#file-upload').selectFile(`cypress/fixtures/${testDataInValid.filename}`);

    // Submit the form
    cy.get('[name="submit"]').click();

    // Verify error message appears
    cy.get('[role="alert"]').should('be.visible');
    cy.get('[role="alert"]').should('contain', 'Submission Failed');
  });

  it('should reload the table with new data when submission is made', () => {
    // Fill in student name
    cy.get('#student-input').type(testDataValid.studentName);

    // Upload the valid Python file
    cy.get('#file-upload').selectFile(`cypress/fixtures/${testDataValid.filename}`);

    // Submit the form
    cy.get('[name="submit"]').click();

    // Verify success message appears
    cy.get('[role="alert"]').should('be.visible');
    cy.get('[role="alert"]').should('contain', 'File executed successfully and passed all tests.');

    // Verify that the new submission appears in the table
    cy.get('table').contains('th', testDataValid.studentName).should('be.visible');
    cy.get('table').contains('td', testDataValid.filename).should('be.visible');
    cy.get('table').contains('td', 'SUCCESS').should('be.visible');
    cy.get('table').contains('td', 'File executed successfully and passed all tests.').should('be.visible');
    cy.get('table').contains('td', /\d{2}-\d{2}-\d{4} \d{2}:\d{2}:\d{2}/).should('be.visible');
  });
});