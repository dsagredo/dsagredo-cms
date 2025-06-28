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
    console.log('PostCard', post);
    return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
            <div className="relative h-48 overflow-hidden">
                <img
                    src={
                        post.imagen ||
                        'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                    }
                    alt={post.title}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
                    {post.title}
                </h3>

                <p className="text-sm text-gray-500 mb-2">
                    {post.updatedAt
                        ? `Publicado el ${format(
                              new Date(post.updatedAt),
                              'MMM d, yyyy'
                          )}`
                        : 'No publicado aún'}
                </p>

                <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                    {post.description}
                </p>

                <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                    <div className="flex space-x-2">
                        <Link
                            to={`/portfolio/${post._id}/edit`}
                            className="text-gray-600 hover:text-gray-900 p-1 rounded-full hover:bg-gray-100"
                        >
                            <Edit className="h-4 w-4" />
                        </Link>

                        <button
                            onClick={() => post._id && onDelete(post?._id)}
                            className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50"
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
