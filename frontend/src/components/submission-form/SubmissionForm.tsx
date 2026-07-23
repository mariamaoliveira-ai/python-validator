import { Alert, Box, Button, Stack, TextField, Typography } from '@mui/material'


import { useState } from 'react'
import { submitValidation } from '../../api/validatorApi'


function SubmissionForm({ onSubmitComplete }: { onSubmitComplete?: () => void }) {
    const [studentName, setStudentName] = useState('')
    const [file, setFile] = useState<File | null>(null)
    const [responseMessage, setResponseMessage] = useState('')
    const [statusMessage, setStatusMessage] = useState<'success' | 'error'>('success')

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        try{
            const response = await submitValidation({ studentName, file: file! })
            setStatusMessage('success')
            setResponseMessage(response.message)
        }catch(error){
            setStatusMessage('error')
            setResponseMessage(`Submission Failed: ${error}`)
        }finally{
            onSubmitComplete?.()
        }
    }
    

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2}>
                <TextField 
                    id="student-input" 
                    label="Student Name" 
                    variant="filled" 
                    name="studentName"
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
                    />
                </div>
                <Button 
                    variant="contained"
                    type="submit"
                    name="submit">
                    Submit
                </Button>

                {responseMessage && (
                    <Alert severity={statusMessage}>{responseMessage}</Alert>
                )}
            </Stack>
        </Box>
    )

}

export default SubmissionForm;