import { useState, useEffect, FC, FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, X } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import TagInput from '../components/ui/TagInput';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { updatePost, getAllTags } from '../data/mockData';
import { Tag } from '../types';

const EditPost: FC = (): JSX.Element => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const [isPublished, setIsPublished] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    /*useEffect((): void => {
        if (id) {
            const post = getPostById(id);
            if (post) {
                setTitle(post.title);
                setDescription(post.description);
                setSelectedTags(post.tags);
                setIsPublished(post.published);
            } else {
                navigate('/portfolio');
            }
            setIsLoading(false);
        }
    }, [id, navigate]);*/

    const handleSubmit = async (e: FormEvent): Promise<void> => {
        e.preventDefault();

        if (!title.trim() || !description.trim() || !id) {
            return;
        }

        setIsSubmitting(true);
        try {
            const updatedPost = updatePost(id, {
                title,
                description,
                tags: selectedTags,
                published: isPublished,
            });
            console.log('Updated post:', updatedPost);
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
                    <h1 className="text-2xl font-bold text-white">
                        Editar Portafolio
                    </h1>
                </div>

                <div className="flex space-x-3">
                    <Button
                        className="bg-white"
                        variant="outline"
                        leftIcon={<X size={16} />}
                        onClick={() => navigate('/portfolio')}
                        disabled={isSubmitting}
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant="primary"
                        leftIcon={<Save size={16} />}
                        onClick={handleSubmit}
                        isLoading={isSubmitting}
                    >
                        Actualizar
                    </Button>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <Card>
                    <CardHeader>
                        <h2 className="text-lg font-semibold text-gray-900">
                            Detalle
                        </h2>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-gray-700">
                                Status
                            </label>
                            <div className="flex items-center space-x-2">
                                <label className="toggle-switch">
                                    <input
                                        type="checkbox"
                                        checked={isPublished}
                                        onChange={(e) =>
                                            setIsPublished(e.target.checked)
                                        }
                                        disabled={isSubmitting}
                                    />
                                    <span className="slider"></span>
                                </label>
                                <span className="text-sm text-gray-500">
                                    {isPublished}
                                </span>
                            </div>
                        </div>
                        <Input
                            label="Title"
                            placeholder="Enter post title"
                            value={title}
                            onChange={(e): void => setTitle(e.target.value)}
                            fullWidth
                            required
                            disabled={isSubmitting}
                        />

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Tags
                            </label>
                            <TagInput
                                selectedTags={selectedTags}
                                availableTags={getAllTags()}
                                onTagsChange={setSelectedTags}
                                disabled={isSubmitting}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Content
                            </label>
                            <textarea
                                className="w-full h-64 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Write your post content here..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                disabled={isSubmitting}
                            />
                        </div>
                    </CardContent>
                </Card>
            </form>
        </div>
    );
};

export default EditPost;
