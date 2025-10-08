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
        <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div className="animate-slide-up">
                    <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                        Portafolio
                    </h1>
                    <p className="text-slate-400 text-sm">
                        Gestiona tu contenido creativo
                    </p>
                </div>

                <Link to="/portfolio/new" className="animate-slide-up">
                    <Button variant="primary" leftIcon={<Plus size={16} />}>
                        Nueva
                    </Button>
                </Link>
            </div>

            {filteredPosts.length === 0 ? (
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl p-12 text-center animate-scale-in">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-teal-500 flex items-center justify-center">
                        <Plus size={32} className="text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                        No se encontró ningún portafolio
                    </h3>
                    <p className="text-slate-400 mb-6">
                        Comienza creando tu primera pieza de contenido
                    </p>
                    <Link to="/portfolio/new">
                        <Button variant="primary" leftIcon={<Plus size={16} />}>
                            Crear tu primera portafolio
                        </Button>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPosts.map(
                        (post: Post, index: number): JSX.Element => (
                            <div
                                key={post.id}
                                className="animate-slide-up"
                                style={{
                                    animationDelay: `${index * 0.1}s`,
                                }}
                            >
                                <PostCard
                                    post={post}
                                    onDelete={handleDeletePost}
                                />
                            </div>
                        )
                    )}
                </div>
            )}
        </div>
    );
};

export default Portfolio;
