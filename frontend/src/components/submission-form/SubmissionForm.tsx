import { Alert, Box, Button, CircularProgress, Stack, TextField, Typography } from '@mui/material'


import { useEffect, useState } from 'react'
import { submitValidation } from '../../api/validatorApi'


function SubmissionForm({ onSubmitComplete }: { onSubmitComplete?: () => void }) {
    const [isLoading, setIsLoading] = useState(false)
    const [studentName, setStudentName] = useState('')
    const [file, setFile] = useState<File | null>(null)
    const [fileInputKey, setFileInputKey] = useState(0)
    const [responseMessage, setResponseMessage] = useState('')
    const [statusMessage, setStatusMessage] = useState<'success' | 'error'>('success')


    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        try{
            setIsLoading(true)
            const response = await submitValidation({ studentName, file: file! })
            setStatusMessage('success')
            setResponseMessage(response.message)
        }catch(error){
            setStatusMessage('error')
            setResponseMessage(`Submission Failed: ${error}`)
        }finally{
            setIsLoading(false)
            setStudentName('')
            setFile(null)
            setFileInputKey(k => k + 1)
            onSubmitComplete?.()
        }
    }
    

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2}>
                {responseMessage && (
                    <Alert 
                        severity={statusMessage}
                        onClose={() => setResponseMessage('')}
                    >
                    {responseMessage}
                    </Alert>
                )}

                <TextField 
                    id="student-input" 
                    label="Student Name" 
                    variant="filled" 
                    name="studentName"
                    value={studentName}
                    onChange={(event) => setStudentName(event.target.value)}
                />
                <div>
                    <Typography variant="body1" component="label" htmlFor="file-upload">
                        Python File
                    </Typography>
                    <input 
                    id="file-upload" 
                    type="file" 
                    accept=".py"
                    onChange={(event) => setFile(event.target.files ? event.target.files[0] : null)}
                    key={fileInputKey}
                    />
                </div>
                <Button 
                    variant="contained"
                    type="submit"
                    name="submit"
                     disabled={isLoading}
                    startIcon={isLoading ? <CircularProgress size={16} color="inherit" /> : undefined}
                >
                    {isLoading ? 'Submitting...' : 'Submit'}
                </Button>
            </Stack>
        </Box>
    )

}

export default SubmissionForm;