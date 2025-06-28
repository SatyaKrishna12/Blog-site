import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { PenTool, Eye, Edit, Trash2, Plus } from "lucide-react";
import { toast } from "react-toastify";
const BaseUrl = import.meta.env.VITE_BASE_URL;

export const AdminDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BaseUrl}/posts`);
      setPosts(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Failed to load posts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (slug, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await axios.delete(`${BaseUrl}/posts/${slug}`);
        await fetchPosts();
        toast.success(`Post "${title}" has been deleted successfully!`);
      } catch (err) {
        console.error('Error deleting post:', err);
        toast.error('Failed to delete post. Please try again later.');
      }
    }
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(new Date(date));
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="text-red-500 mb-4">⚠️</div>
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => fetchPosts()} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your blog posts</p>
        </div>
        <Link to="/admin/create">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200">
            <Plus className="w-4 h-4" />
            Create New Post
          </button>
        </Link>
      </div>

      {posts.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <PenTool className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <h2 className="text-xl font-semibold mb-2 text-gray-900">No posts yet</h2>
            <p className="text-gray-600 mb-4">
              Start by creating your first blog post
            </p>
            <Link to="/admin/create">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200">
                Create Your First Post
              </button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {posts.map((post) => (
            <Card key={post._id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="line-clamp-1 text-gray-900">{post.title}</CardTitle>
                    <div className="mt-2">
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>Created: {formatDate(post.createdAt)}</span>
                        <span>•</span>
                        <span>Slug: /{post.slug}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link to={`/blog/${post.slug}`}>
                      <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-3 py-2 rounded-lg transition-colors duration-200">
                        <Eye className="w-4 h-4" />
                      </button>
                    </Link>
                    <Link to={`/admin/edit/${post.slug}`}>
                      <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-3 py-2 rounded-lg transition-colors duration-200">
                        <Edit className="w-4 h-4" />
                      </button>
                    </Link>
                    <button 
                      onClick={() => handleDelete(post.slug, post.title)}
                      className="border border-gray-300 hover:bg-red-50 text-red-600 hover:text-red-700 px-3 py-2 rounded-lg transition-colors duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
