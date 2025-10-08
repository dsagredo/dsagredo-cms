import { useState, useRef } from 'react';
import { uploadMedia } from '../data/mockData';

export const useImageUpload = (onUploadComplete?: (url: string) => void) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        setError(null);

        try {
            const uploadedMedia = await uploadMedia(file);
            onUploadComplete?.(uploadedMedia.url);
        } catch (err) {
            console.error('Error uploading image:', err);
            setError('Failed to upload image. Please try again.');
        } finally {
            setIsUploading(false);
        }
    };

    const triggerUpload = () => {
        fileInputRef.current?.click();
    };

    return {
        fileInputRef,
        isUploading,
        error,
        handleImageUpload,
        triggerUpload,
    };
};
