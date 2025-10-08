import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import PortfolioFormHeader from '../components/portfolio/PortfolioFormHeader';
import PortfolioFormFields from '../components/portfolio/PortfolioFormFields';
import { usePortfolioForm } from '../hooks/usePortfolioForm';
import { useImageUpload } from '../hooks/useImageUpload';
import { createPost, getAllTags } from '../data/mockData';

const NewPortfolio: FC = () => {
    const navigate = useNavigate();
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
    } = usePortfolioForm();

    const { fileInputRef, isUploading, handleImageUpload, triggerUpload } =
        useImageUpload((url) => setCoverImage(url));

    const handleSubmit = async () => {
        if (!title.trim() || !content.trim()) {
            return;
        }

        setIsSubmitting(true);
        try {
            const newPost = createPost(title, content, coverImage);
            const updatedPost = {
                ...newPost,
                published: isPublished,
                demoLink: demoLink || undefined,
                githubLink: githubLink || undefined,
                tags: selectedTags,
            };
            console.log('Created post:', updatedPost);
            navigate('/portfolio');
        } catch (error) {
            console.error('Error creating post:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-6">
            <PortfolioFormHeader
                title="Nuevo Portafolio"
                onSave={handleSubmit}
                isSubmitting={isSubmitting}
                saveButtonText="Guardar"
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

export default NewPortfolio;
