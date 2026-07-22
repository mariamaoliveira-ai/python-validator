import { API_BASE_URL } from './constants';

export type ValidationRequest = {
    studentName: string;
    file: File;
};

export type ValidationResponse = {
    message: string;
    execution_status: string;
};

export async function submitValidation(
    payload: ValidationRequest): Promise<ValidationResponse> {
    const formData = new FormData();
    formData.append('student_name', payload.studentName);
    formData.append('file', payload.file);

    const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
         const errorBody = await response.json().catch(() => null);
        throw new Error(errorBody?.detail.message ?? `HTTP error! status: ${response.status}`);
    }

    return response.json() as Promise<ValidationResponse>;

}
