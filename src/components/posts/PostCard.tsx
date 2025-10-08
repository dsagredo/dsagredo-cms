import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Edit, Trash2 } from 'lucide-react';
import { Post } from '../../types';

interface PostCardProps {
    post: Post;
    onDelete: (id: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onDelete }): JSX.Element => {
    return (
        <div className="group bg-white/5 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/10 hover:border-blue-400/30 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1">
            <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <img
                    src={
                        post.coverImage ||
                        'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                    }
                    alt={post.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
            </div>

            <div className="p-5">
                <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-blue-400 transition-colors">
                    {post.title}
                </h3>

                <p className="text-xs text-slate-400 mb-3 flex items-center gap-1">
                    {post.publishedAt
                        ? `Publicado el ${format(
                              new Date(post.publishedAt),
                              'MMM d, yyyy'
                          )}`
                        : 'Aún no publicado'}
                </p>

                <p className="text-sm text-slate-300 mb-4 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                </p>

                <div className="flex justify-between items-center pt-4 border-t border-white/10">
                    <div className="flex space-x-2">
                        <Link
                            to={`/portfolio/${post.id}/edit`}
                            className="text-slate-300 hover:text-blue-400 p-2 rounded-lg hover:bg-blue-400/10 transition-all duration-200 transform hover:scale-110"
                        >
                            <Edit className="h-4 w-4" />
                        </Link>

                        <button
                            onClick={() => onDelete(post.id)}
                            className="text-slate-300 hover:text-red-400 p-2 rounded-lg hover:bg-red-400/10 transition-all duration-200 transform hover:scale-110"
                        >
                            <Trash2 className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
