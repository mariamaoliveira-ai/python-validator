import './App.css'
import { useEffect, useState } from 'react'
import SubmissionForm from './components/submission-form/SubmissionForm'
import SubmissionTable from './components/submission-table/SubmissionTable'
import { getSubmissions, type Submission } from './api/validatorApi'

function App() {
  const [submissions, setSubmissions] = useState<Submission[]>([])

  function fetchSubmissions() {
    getSubmissions().then(setSubmissions)
  }

  useEffect(() => {
    fetchSubmissions()
  }, [])

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <h1 className="text-3xl font-bold text-slate-900">Python Validator</h1>
      <SubmissionForm onSubmitComplete={fetchSubmissions} />
      <SubmissionTable submissions={submissions} />
    </div>
  )
}

export default App
