import { FC } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';
import Button from '../ui/Button';

interface ImageUploadSectionProps {
    coverImage: string;
    fileInputRef: React.RefObject<HTMLInputElement>;
    isUploading: boolean;
    onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onTriggerUpload: () => void;
}

const ImageUploadSection: FC<ImageUploadSectionProps> = ({
    coverImage,
    fileInputRef,
    isUploading,
    onImageChange,
    onTriggerUpload,
}) => {
    return (
        <div>
            <div className="space-y-4">
                <label className="block text-sm font-medium text-slate-300 mb-1">
                    Subir una imagen
                </label>
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={onImageChange}
                    disabled={isUploading}
                />

                {coverImage ? (
                    <div className="relative">
                        <img
                            src={coverImage}
                            alt="Cover"
                            className="w-full h-64 object-cover rounded-lg"
                        />
                        <Button
                            variant="outline"
                            size="sm"
                            className="absolute bottom-4 right-4"
                            onClick={onTriggerUpload}
                            disabled={isUploading}
                            leftIcon={<Upload size={16} />}
                        >
                            Change Image
                        </Button>
                    </div>
                ) : (
                    <div
                        className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-gray-400 transition-colors"
                        onClick={onTriggerUpload}
                    >
                        <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="mt-4">
                            <Button
                                variant="outline"
                                disabled={isUploading}
                                leftIcon={<Upload size={16} />}
                            >
                                {isUploading ? 'Uploading...' : 'Upload Cover Image'}
                            </Button>
                        </div>
                        <p className="mt-2 text-sm text-slate-300">
                            PNG, JPG, GIF up to 10MB
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageUploadSection;
