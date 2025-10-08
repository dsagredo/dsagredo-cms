import { useState, useEffect, FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import PortfolioFormHeader from '../components/portfolio/PortfolioFormHeader';
import PortfolioFormFields from '../components/portfolio/PortfolioFormFields';
import { usePortfolioForm } from '../hooks/usePortfolioForm';
import { useImageUpload } from '../hooks/useImageUpload';
import { getPostById, updatePost, getAllTags } from '../data/mockData';

const EditPost: FC = (): JSX.Element => {
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
    } = usePortfolioForm();

    const { fileInputRef, isUploading, handleImageUpload, triggerUpload } =
        useImageUpload((url) => setCoverImage(url));

    useEffect((): void => {
        if (id) {
            const post = getPostById(id);
            if (post) {
                setFormData({
                    title: post.title,
                    content: post.content,
                    coverImage: post.coverImage || '',
                    demoLink: post.demoLink || '',
                    githubLink: post.githubLink || '',
                    selectedTags: post.tags,
                    isPublished: post.published,
                });
            } else {
                navigate('/portfolio');
            }
            setIsLoading(false);
        }
    }, [id, navigate, setFormData]);

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
            <PortfolioFormHeader
                title="Editar Portafolio"
                onSave={handleSubmit}
                isSubmitting={isSubmitting}
                saveButtonText="Actualizar"
            />

            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <h2 className="text-lg font-semibold text-white">Detalle</h2>
                    </CardHeader>
                    <CardContent>
                        <PortfolioFormFields
                            title={title}
                            setTitle={setTitle}
                            content={content}
                            setContent={setContent}
                            coverImage={coverImage}
                            fileInputRef={fileInputRef}
                            isUploading={isUploading}
                            onImageChange={handleImageUpload}
                            onTriggerUpload={triggerUpload}
                            demoLink={demoLink}
                            setDemoLink={setDemoLink}
                            githubLink={githubLink}
                            setGithubLink={setGithubLink}
                            selectedTags={selectedTags}
                            setSelectedTags={setSelectedTags}
                            availableTags={getAllTags()}
                            isPublished={isPublished}
                            setIsPublished={setIsPublished}
                            isSubmitting={isSubmitting}
                        />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default EditPost;
