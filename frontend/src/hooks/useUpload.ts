import api from '@/http/server-base';
import { useState } from 'react';
import { AxiosRequestConfig } from 'axios';

type FileUploadResponse = {
    media: string;
}

const useUpload = () => {
    const [progress, setProgress] = useState<number>(0);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [uploadedFile, setUploadedFile] = useState<FileUploadResponse | null>(null);
    const [error, setError] = useState<Error | null>(null);

    const uploadFile = async (file: any, type = 'media') => {
        setIsUploading(true);
        setProgress(0);
        setUploadedFile(null);
        setError(null);

        const formData = new FormData();
        formData.append(type, file);

        const config: AxiosRequestConfig = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (progressEvent: any) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                setProgress(percentCompleted);
            },
        }

        try {
            const response: any = await api.post('upload/single', formData, config);

            setUploadedFile(response.data);

            return response?.data?.media;
        } catch (err: any) {
            setError(err);
        } finally {
            setIsUploading(false);
        }
    };

    return { progress, isUploading, uploadedFile, error, uploadFile };
};

export default useUpload;
