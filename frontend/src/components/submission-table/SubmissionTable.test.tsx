import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import SubmissionTable from './SubmissionTable'

const fakeSubmissions = [
  {
    student_name: 'John Doe',
    file_name: 'solution.py',
    status: 'SUCCESS',
    result_execution: 'Executed successfully',
    created_at: '2024-06-01 10:00:00',
  },
  {
    student_name: 'John Doe',
    file_name: 'solution_2.py',
    status: 'FAILED',
    result_execution: 'An error occurred during execution',
    created_at: '2024-06-02 11:00:00',
  },
];

const emptySubmissions: any[] = [];

describe('SubmissionTable', () => {

    describe('When user loads the page', () =>{
        it('should render table with headers and rows if there are submissions', ()=>{
            render(<SubmissionTable submissions={fakeSubmissions}/>)

            expect(screen.getByRole('table')).toBeInTheDocument()
            expect(screen.getByRole('columnheader', { name: /student name/i })).toBeInTheDocument()
            expect(screen.getByRole('columnheader', { name: /file name/i })).toBeInTheDocument()
            expect(screen.getByRole('columnheader', { name: /status/i })).toBeInTheDocument()
            expect(screen.getByRole('columnheader', { name: /result execution/i })).toBeInTheDocument()
            expect(screen.getByRole('columnheader', { name: /created at/i })).toBeInTheDocument()

            expect(screen.getByRole('row', { name: /john doe solution.py success executed successfully 2024-06-01 10:00:00/i })).toBeInTheDocument()
            expect(screen.getByRole('row', { name: /john doe solution_2.py failed an error occurred during execution 2024-06-02 11:00:00/i })).toBeInTheDocument()
        });

        it('should render text in green if status is SUCCESS and in red if status is FAILURE', ()=>{
            render(<SubmissionTable submissions={fakeSubmissions}/>)

            expect(screen.getByText('SUCCESS')).toHaveClass('text-green-500')
            expect(screen.getByText('FAILED')).toHaveClass('text-red-500')
        });

        it('It show a message if there are no submissions', ()=>{
            render(<SubmissionTable submissions={emptySubmissions}/>)

            expect(screen.getByText(/no submissions found/i)).toBeInTheDocument()
        });
    })
})