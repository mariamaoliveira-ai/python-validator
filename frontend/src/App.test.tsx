import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import App from './App'
import { getSubmissions, submitValidation } from './api/validatorApi'

vi.mock('./api/validatorApi')

const fakeSubmissions = [
  {
    student_name: 'John Doe',
    file_name: 'solution.py',
    status: 'SUCCESS',
    result_execution: 'Executed successfully',
    created_at: '2024-06-01 10:00:00.000000',
  },
  {
    student_name: 'John Doe',
    file_name: 'solution_2.py',
    status: 'FAILED',
    result_execution: 'An error occurred during execution',
    created_at: '2024-06-02 11:00:00.000000',
  },
]

describe('App', () => {
  it('renders the page heading', () => {
    vi.mocked(getSubmissions).mockResolvedValue([])
    render(<App />)
    expect(
      screen.getByRole('heading', { name: /python validator/i })
    ).toBeInTheDocument()
  })

  it('should reload the table with new data when a successful new submission is made', async () => {
    const user = userEvent.setup()
    const mockedGetSubmissions = vi.mocked(getSubmissions)
    const mockedSubmitValidation = vi.mocked(submitValidation)

    mockedGetSubmissions.mockResolvedValueOnce(fakeSubmissions)
    render(<App />)

    expect(await screen.findByRole('row', { name: /john doe solution.py success executed successfully 01-06-2024 10:00:00/i })).toBeInTheDocument()
    expect(await screen.findByRole('row', { name: /john doe solution_2.py failed an error occurred during execution 02-06-2024 11:00:00/i })).toBeInTheDocument()

    const newSubmission = {
      student_name: 'Jane Smith',
      file_name: 'solution_3.py',
      status: 'SUCCESS',
      result_execution: 'Executed successfully',
      created_at: '2024-06-03 12:00:00.000000',
    }


    mockedSubmitValidation.mockResolvedValueOnce({
      message: 'File received: solution_3.py',
      execution_status: 'Executed',
    })

    mockedGetSubmissions.mockResolvedValueOnce([...fakeSubmissions, newSubmission])

    const nameInput = screen.getByRole('textbox', { name: /student name/i })
    const fileInput = screen.getByTestId('file-upload')
    const submitButton = screen.getByRole('button', { name: /submit/i })

    await user.type(nameInput, 'Jane Smith')
    await user.upload(fileInput, new File(['print("Hello World")'], 'solution_3.py', { type: 'text/x-python' }))
    await user.click(submitButton)

    expect(mockedSubmitValidation).toHaveBeenCalledWith({
      studentName: 'Jane Smith',
      file: expect.any(File),
    })

    expect(await screen.findByRole('row', { name: /jane smith solution_3.py success executed successfully 03-06-2024 12:00:00/i })).toBeInTheDocument()
  })

    it('should reload the table with new data when a unsuccessful new submission is made', async () => {
    const user = userEvent.setup()
    const mockedGetSubmissions = vi.mocked(getSubmissions)
    const mockedSubmitValidation = vi.mocked(submitValidation)

    mockedGetSubmissions.mockResolvedValueOnce(fakeSubmissions)
    render(<App />)

    expect(await screen.findByRole('row', { name: /john doe solution.py success executed successfully 01-06-2024 10:00:00/i })).toBeInTheDocument()
    expect(await screen.findByRole('row', { name: /john doe solution_2.py failed an error occurred during execution 02-06-2024 11:00:00/i })).toBeInTheDocument()

    const newSubmission = {
      student_name: 'Jane Smith',
      file_name: 'solution_3.py',
      status: 'FAILED',
      result_execution: 'Execution failed with error: SyntaxError: invalid syntax',
      created_at: '2024-06-03 12:00:00.000000',
    }

    mockedSubmitValidation.mockRejectedValueOnce(new Error('Execution failed with error: SyntaxError: invalid syntax'))

    mockedGetSubmissions.mockResolvedValueOnce([...fakeSubmissions, newSubmission])

    const nameInput = screen.getByRole('textbox', { name: /student name/i })
    const fileInput = screen.getByTestId('file-upload')
    const submitButton = screen.getByRole('button', { name: /submit/i })

    await user.type(nameInput, 'Jane Smith')
    await user.upload(fileInput, new File(['print("Hello World")'], 'solution_3.py', { type: 'text/x-python' }))
    await user.click(submitButton)

    expect(mockedSubmitValidation).toHaveBeenCalledWith({
      studentName: 'Jane Smith',
      file: expect.any(File),
    })

    expect(await screen.findByRole('row', { name: /jane smith solution_3.py failed execution failed with error: SyntaxError: invalid syntax 03-06-2024 12:00:00/i })).toBeInTheDocument()
  })
})