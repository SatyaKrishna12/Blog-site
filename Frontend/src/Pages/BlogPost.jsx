import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Calendar, ArrowLeft } from "lucide-react";
const BaseUrl = import.meta.env.VITE_BASE_URL;


export const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(`${BaseUrl}/posts/${slug}`);
        setPost(response.data);
        setError(null);
        
        // Update document title and meta description
        document.title = `${response.data.title} | BlogForge`;
        const meta = document.querySelector('meta[name="description"]');
        if (meta) {
          meta.setAttribute("content", response.data.excerpt || "");
        }
      } catch (err) {
        console.error('Error fetching post:', err);
        if (err.response?.status === 404) {
          setError('Post not found');
        } else {
          setError('Failed to load post. Please try again later.');
        }
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  const formatDate = (date) =>
    new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(date));

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading post...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="max-w-4xl mx-auto text-center py-20 px-4">
        <h1 className="text-3xl font-bold mb-4">
          {error === 'Post not found' ? 'Post Not Found' : 'Error Loading Post'}
        </h1>
        <p className="text-gray-500 mb-6">
          {error === 'Post not found' 
            ? "The blog post you're looking for doesn't exist or has been removed."
            : error || "Something went wrong while loading the post."
          }
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          {error !== 'Post not found' && (
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Posts
        </Link>
      </div>

      <header className="mb-8">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <Calendar className="w-4 h-4" />
          <span>Published {formatDate(post.createdAt)}</span>
          {post.updatedAt && post.updatedAt !== post.createdAt && (
            <>
              <span>•</span>
              <span>Updated {formatDate(post.updatedAt)}</span>
            </>
          )}
        </div>
        <h1 className="text-4xl font-bold leading-tight text-gray-900">
          {post.title}
        </h1>
      </header>

      <div
        className="blog-content max-w-none text-gray-800 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: post.content }}
        style={{
          fontSize: '18px',
          lineHeight: '1.7'
        }}
      />

    </article>
  );
};
