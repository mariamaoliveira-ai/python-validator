import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import SubmissionForm from './SubmissionForm'
import { submitValidation } from '../../api/submitValidation'

vi.mock('../../api/submitValidation')

describe('SubmissionForm', () => {

    describe('When user submits valid form', ()=>{

        it('should render name text field, file input and submit button when component loads', ()=>{
            render(<SubmissionForm/>)

            expect(screen.getByRole('textbox', { name: /student name/i })).toBeInTheDocument()
            expect(screen.getByLabelText(/python file/i)).toBeInTheDocument()
            expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument()
        });

        it('should show success message when form is submitted successfully', async ()=>{
            const user = userEvent.setup()
            const mockedSubmit = vi.mocked(submitValidation)

            mockedSubmit.mockResolvedValueOnce({     
                message: 'File received: hello.py',
                execution_status: 'Executed',
            })

            render(<SubmissionForm/>)

            const nameInput = screen.getByRole('textbox', { name: /student name/i })
            const fileInput = screen.getByLabelText(/python file/i)
            const submitButton = screen.getByRole('button', { name: /submit/i })

            await user.type(nameInput, 'John Doe')
            await user.upload(fileInput, new File(['print("Hello World")'], 'hello.py', { type: 'text/x-python' }))
            await user.click(submitButton)

            expect(mockedSubmit).toHaveBeenCalledWith({
                studentName: 'John Doe',
                file: expect.any(File),
            })

            expect(await screen.findByText(/file received: hello.py/i)).toBeInTheDocument()
        });
    });
});