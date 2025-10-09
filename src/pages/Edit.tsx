import { useState, useEffect, FC, ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForms } from '../hooks/useForms';
import { useImageUpload } from '../hooks/useImageUpload';
import { getAllTags } from '../data/mockData';
import Button from '../components/Button';
import { Save, X } from 'lucide-react';
import Tags from '../components/Tags';
import Input from '../components/Input';
import UploadImage from '../components/UploadImage';
import { getPortfolioProjectById } from '../services/portfolioApi';

const Edit: FC = (): JSX.Element => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [isLoading, setIsLoading] = useState(true);

    const {
        title,
        setTitle,
        content,
        setContent,
        coverImage,
        setCoverImage,
        demoLink,
        setDemoLink,
        githubLink,
        setGithubLink,
        selectedTags,
        setSelectedTags,
        isPublished,
        setIsPublished,
        isSubmitting,
        setIsSubmitting,
        setFormData,
    } = useForms();

    const { fileInputRef, isUploading, handleImageUpload, triggerUpload } =
        useImageUpload((url: string): void => setCoverImage(url));

    useEffect((): void => {
        const loadProject = async (): Promise<void> => {
            if (id) {
                try {
                    const project = await getPortfolioProjectById(id);
                    if (project) {
                        setFormData({
                            title: project.title,
                            content: project.description,
                            coverImage: project.imagen || '',
                            demoLink: project.demo || '',
                            githubLink: project.github || '',
                            selectedTags: project.tags,
                            isPublished: project.published,
                        });
                    }
                } catch (error) {
                    console.error('Error loading project:', error);
                } finally {
                    setIsLoading(false);
                }
            }
        };
        loadProject();
    }, [navigate]);

    const handleSubmit = async (): Promise<void> => {
        if (!title.trim() || !content.trim() || !id) {
            return;
        }

        setIsSubmitting(true);
        try {
            const updatedPostData = updatePost(id, {
                title,
                content,
                coverImage,
                demoLink,
                githubLink,
                tags: selectedTags,
                published: isPublished,
            });
            console.log('Updated post:', updatedPostData);
            navigate('/portfolio');
        } catch (error) {
            console.error('Error updating post:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col lg:flex-row items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">{title}</h1>
                </div>

                <div className="flex space-x-3">
                    <Button
                        title="Cancelar"
                        className="bg-white"
                        variant="outline"
                        leftIcon={<X size={16} />}
                        onClick={(): void => navigate('/home')}
                        disabled={isSubmitting}
                    />
                    <Button
                        title="Actualizar"
                        variant="primary"
                        leftIcon={<Save size={16} />}
                        onClick={handleSubmit}
                        isLoading={isSubmitting}
                    />
                </div>
            </div>

            <div className="space-y-6">
                <div className="bg-white/5 rounded-lg shadow-md overflow-hidden">
                    <h2 className=" px-6 py-4 border-b border-gray-200 text-lg font-semibold text-white">
                        Detalle
                    </h2>
                    <div className="px-6 py-4">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium text-slate-300">
                                    Estado
                                </label>
                                <div className="flex items-center space-x-2">
                                    <label className="toggle-switch">
                                        <input
                                            type="checkbox"
                                            checked={isPublished}
                                            onChange={(
                                                e: ChangeEvent<HTMLInputElement>
                                            ): void =>
                                                setIsPublished(e.target.checked)
                                            }
                                            disabled={isSubmitting}
                                        />
                                        <span className="slider"></span>
                                    </label>
                                </div>
                            </div>

                            <Input
                                label="Título"
                                value={title}
                                onChange={(
                                    e: ChangeEvent<HTMLInputElement>
                                ): void => setTitle(e.target.value)}
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
                                    onChange={(
                                        e: ChangeEvent<HTMLInputElement>
                                    ): void => setDemoLink(e.target.value)}
                                    fullWidth
                                    disabled={isSubmitting}
                                />

                                <Input
                                    label="GitHub Link"
                                    placeholder="https://github.com/username/repo"
                                    type="url"
                                    value={githubLink}
                                    onChange={(
                                        e: ChangeEvent<HTMLInputElement>
                                    ): void => setGithubLink(e.target.value)}
                                    fullWidth
                                    disabled={isSubmitting}
                                />
                            </div>

                            <UploadImage
                                coverImage={coverImage}
                                fileInputRef={fileInputRef}
                                isUploading={isUploading}
                                onImageChange={handleImageUpload}
                                onTriggerUpload={triggerUpload}
                            />

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-1">
                                    Tags
                                </label>
                                <Tags
                                    selectedTags={selectedTags}
                                    availableTags={getAllTags()}
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
                                    onChange={(
                                        e: ChangeEvent<HTMLTextAreaElement>
                                    ): void => setContent(e.target.value)}
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Edit;
