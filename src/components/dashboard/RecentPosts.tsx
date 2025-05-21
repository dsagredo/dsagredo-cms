import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Post } from '../../types';
import Badge from '../ui/Badge';

interface RecentPostsProps {
  posts: Post[];
}

const RecentPosts: React.FC<RecentPostsProps> = ({ posts }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Recent Posts</h2>
      </div>
      
      <div className="divide-y divide-gray-200">
        {posts.length === 0 ? (
          <div className="px-6 py-4 text-gray-500 text-sm">No posts found.</div>
        ) : (
          posts.map(post => (
            <div key={post.id} className="px-6 py-4">
              <div className="flex justify-between items-start">
                <div>
                  <Link 
                    to={`/posts/${post.id}`}
                    className="text-base font-medium text-gray-900 hover:text-blue-600 transition-colors"
                  >
                    {post.title}
                  </Link>
                  
                  <div className="flex flex-wrap gap-2 mt-2">
                    {!post.published && <Badge variant="warning">Draft</Badge>}
                    {post.featured && <Badge variant="primary">Featured</Badge>}
                    
                    {post.categories.slice(0, 1).map(category => (
                      <Badge key={category.id} variant="secondary">
                        {category.name}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="text-sm text-gray-500">
                  {post.publishedAt 
                    ? format(new Date(post.publishedAt), 'MMM d')
                    : 'Draft'
                  }
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
        <Link 
          to="/posts"
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          View all posts
        </Link>
      </div>
    </div>
  );
};

export default RecentPosts;