import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import PostCard from '../components/posts/PostCard';
import Button from '../components/ui/Button';
import { Post } from '../types';
import { deletePost, getAllPortfolio } from '../service/api';

const Portfolio: React.FC = () => {
    const [isPortafolio, setPortfolio] = useState<Post[]>([]);
    console.log('isPortafolio ', isPortafolio);

    const handleDeletePost = (id: string) => {
        if (
            window.confirm(
                'Are you sure you want to delete this post? This action cannot be undone.'
            )
        ) {
            try {
                deletePost(id);
                setPortfolio(isPortafolio.filter((post) => post._id !== id));
            } catch (error) {
                console.error('Error deleting post:', error);
                alert('Failed to delete post. Please try again.');
            }
        }
    };

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // Simulate fetching posts from an API or data source
                const posts = await getAllPortfolio();
                setPortfolio(posts);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div>
                    <h1 className="text-2xl font-bold text-white">
                        Portafolio
                    </h1>
                </div>

                <Link to="/portfolio/new">
                    <Button variant="primary" leftIcon={<Plus size={16} />}>
                        Nueva
                    </Button>
                </Link>
            </div>

            {isPortafolio.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No se encontró ningún portafolio
                    </h3>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {isPortafolio.map(
                        (post: Post): JSX.Element => (
                            <PostCard
                                key={post._id}
                                post={post}
                                onDelete={handleDeletePost}
                            />
                        )
                    )}
                </div>
            )}
        </div>
    );
};

export default Portfolio;
