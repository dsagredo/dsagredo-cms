import { useState, useEffect, FC, FormEvent, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, X, Upload, Image as ImageIcon } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import TagInput from '../components/ui/TagInput';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { getPostById, updatePost, getAllTags, uploadMedia } from '../data/mockData';
import { Tag } from '../types';

const EditPost: FC = (): JSX.Element => {
  const fileInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const [isPublished, setIsPublished] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
    const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const uploadedMedia = await uploadMedia(file);
            setCoverImage(uploadedMedia.url);
        } catch (error) {
            console.error('Error uploading image:', error);
        } finally {
            setIsUploading(false);
        }
    };

    useEffect((): void => {
        if (id) {
            const post = getPostById(id);
            if (post) {
                setTitle(post.title);
                setContent(post.content);
                setCoverImage(post.coverImage || '');
                setSelectedTags(post.tags);
                setIsPublished(post.published);
            } else {
                navigate('/portfolio');
            }
            setIsLoading(false);
        }
    }, [id, navigate]);

    const handleSubmit = async (e: FormEvent): Promise<void> => {
        e.preventDefault();
  if (!title.trim() || !content.trim() || !id) {
            return;
        }

        setIsSubmitting(true);
        try {
            const updatedPost = updatePost(id, {
                title,
                content,
                coverImage,
                tags: selectedTags,
                published: isPublished,
            });
            console.log('Updated post:', updatedPost);
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

            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <h2 className="text-lg font-semibold text-white">
                            Detalle
                        </h2>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-slate-300">
                                Estado
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
                            <div className="space-y-4">
                                <label className="block text-sm font-medium text-slate-300 mb-1">
                                    Subir una imagen
                                </label>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleImageUpload}
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
                                            onClick={() =>
                                                fileInputRef.current?.click()
                                            }
                                            disabled={isUploading}
                                            leftIcon={<Upload size={16} />}
                                        >
                                            Change Image
                                        </Button>
                                    </div>
                                ) : (
                                    <div
                                        className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-gray-400 transition-colors"
                                        onClick={() =>
                                            fileInputRef.current?.click()
                                        }
                                    >
                                        <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                                        <div className="mt-4">
                                            <Button
                                                variant="outline"
                                                disabled={isUploading}
                                                leftIcon={<Upload size={16} />}
                                            >
                                                {isUploading
                                                    ? 'Uploading...'
                                                    : 'Upload Cover Image'}
                                            </Button>
                                        </div>
                                        <p className="mt-2 text-sm text-slate-300">
                                            PNG, JPG, GIF up to 10MB
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">
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
                            <label className="block text-sm font-medium text-slate-300 mb-1">
                                Descripción
                            </label>
                            <textarea
                                className="w-full h-64 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Write your post content here..."
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                                disabled={isSubmitting}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default EditPost;
