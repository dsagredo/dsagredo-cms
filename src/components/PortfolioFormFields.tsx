import { FC } from 'react';
import Input from './ui/Input';
import TagInput from './ui/TagInput';
import ImageUploadSection from './ImageUploadSection';
import { Tag } from '../types';

interface PortfolioFormFieldsProps {
    title: string;
    setTitle: (value: string) => void;
    content: string;
    setContent: (value: string) => void;
    coverImage: string;
    fileInputRef: React.RefObject<HTMLInputElement>;
    isUploading: boolean;
    onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onTriggerUpload: () => void;
    demoLink: string;
    setDemoLink: (value: string) => void;
    githubLink: string;
    setGithubLink: (value: string) => void;
    selectedTags: Tag[];
    setSelectedTags: (tags: Tag[]) => void;
    availableTags: Tag[];
    isPublished: boolean;
    setIsPublished: (value: boolean) => void;
    isSubmitting: boolean;
}

const PortfolioFormFields: FC<PortfolioFormFieldsProps> = ({
    title,
    setTitle,
    content,
    setContent,
    coverImage,
    fileInputRef,
    isUploading,
    onImageChange,
    onTriggerUpload,
    demoLink,
    setDemoLink,
    githubLink,
    setGithubLink,
    selectedTags,
    setSelectedTags,
    availableTags,
    isPublished,
    setIsPublished,
    isSubmitting,
}) => {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-300">Estado</label>
                <div className="flex items-center space-x-2">
                    <label className="toggle-switch">
                        <input
                            type="checkbox"
                            checked={isPublished}
                            onChange={(e) => setIsPublished(e.target.checked)}
                            disabled={isSubmitting}
                        />
                        <span className="slider"></span>
                    </label>
                </div>
            </div>

            <Input
                label="Título"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                required
                disabled={isSubmitting}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                    label="Demo Link"
                    placeholder="https://example.com"
                    type="url"
                    value={demoLink}
                    onChange={(e) => setDemoLink(e.target.value)}
                    fullWidth
                    disabled={isSubmitting}
                />

                <Input
                    label="GitHub Link"
                    placeholder="https://github.com/username/repo"
                    type="url"
                    value={githubLink}
                    onChange={(e) => setGithubLink(e.target.value)}
                    fullWidth
                    disabled={isSubmitting}
                />
            </div>

            <ImageUploadSection
                coverImage={coverImage}
                fileInputRef={fileInputRef}
                isUploading={isUploading}
                onImageChange={onImageChange}
                onTriggerUpload={onTriggerUpload}
            />

            <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                    Tags
                </label>
                <TagInput
                    selectedTags={selectedTags}
                    availableTags={availableTags}
                    onTagsChange={setSelectedTags}
                    disabled={isSubmitting}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                    Descripción
                </label>
                <textarea
                    className="w-full h-64 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    disabled={isSubmitting}
                />
            </div>
        </div>
    );
};

export default PortfolioFormFields;
