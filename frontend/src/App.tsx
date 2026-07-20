import './App.css'
import SubmissionForm from './components/submission-form/SubmissionForm'

function App() {
  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <h1 className="text-3xl font-bold text-slate-900">Python Validator</h1>
      <SubmissionForm />
    </div>
  )
}

export default App
