import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { getAllPosts, deletePost } from '../data/mockData';
import PostCard from '../components/posts/PostCard';
import Button from '../components/ui/Button';
import { PostFilters, Post } from '../types';

const Portfolio: React.FC = () => {
    const [filters, setFilters] = useState<PostFilters>({});

    const handleDeletePost = (id: string) => {
        if (
            window.confirm(
                'Are you sure you want to delete this post? This action cannot be undone.'
            )
        ) {
            try {
                deletePost(id);
                // Force re-render by updating state
                setFilters({ ...filters });
            } catch (error) {
                console.error('Error deleting post:', error);
                alert('Failed to delete post. Please try again.');
            }
        }
    };

    const filteredPosts = getAllPosts().filter((post) => {
        // Filter by search term
        if (
            filters.search &&
            !post.title.toLowerCase().includes(filters.search.toLowerCase())
        ) {
            return false;
        }

        // Filter by published status
        if (
            filters.published !== undefined &&
            post.published !== filters.published
        ) {
            return false;
        }

        // Filter by featured status
        if (
            filters.featured !== undefined &&
            post.featured !== filters.featured
        ) {
            return false;
        }

        return true;
    });

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

            {filteredPosts.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No se encontró ningún portafolio
                    </h3>
                    <Link to="/portfolio/new">
                        <Button variant="primary" leftIcon={<Plus size={16} />}>
                            Crear tu primera portafolio
                        </Button>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPosts.map(
                        (post: Post): JSX.Element => (
                            <PostCard
                                key={post.id}
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
