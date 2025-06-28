import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Calendar, ArrowRight, Search, X } from "lucide-react";

export const BlogHome = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/posts');
        setPosts(response.data);
        setFilteredPosts(response.data); // Initialize filtered posts
        setError(null);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to load posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Filter posts based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
  }, [searchQuery, posts]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const formatDate = (date) =>
    new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);

  const stripHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };

  const getExcerpt = (content, maxLength = 150) => {
    const cleanText = stripHtmlTags(content);
    return cleanText.length > maxLength 
      ? cleanText.substring(0, maxLength) + '...' 
      : cleanText;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Welcome to MyBlog</h1>
        <p className="text-lg text-gray-600 mb-8">
          Discover insights, tutorials, and stories from our community
        </p>
        
        {/* Search Bar */}
        <div className="max-w-md mx-auto relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search posts..."
              className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
          {searchQuery && (
            <p className="text-sm text-gray-600 mt-2">
              {filteredPosts.length > 0 
                ? `Found ${filteredPosts.length} post${filteredPosts.length === 1 ? '' : 's'} for "${searchQuery}"`
                : `No posts found for "${searchQuery}"`
              }
            </p>
          )}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600">Loading posts...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <div className="text-red-500 mb-4">⚠️</div>
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">📝</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts yet</h3>
          <p className="text-gray-600">Check back soon for new content!</p>
        </div>
      ) : filteredPosts.length === 0 && searchQuery ? (
        <div className="text-center py-12">
          <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts found</h3>
          <p className="text-gray-600 mb-4">
            No posts match your search for "{searchQuery}"
          </p>
          <button
            onClick={clearSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <div
              key={post._id}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col justify-between"
            >
              <div className="text-sm text-gray-500 flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4" />
                {formatDate(new Date(post.createdAt))}
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {post.title}
              </h2>
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                {post.excerpt || getExcerpt(post.content)}
              </p>
              <Link
                to={`/blog/${post.slug}`}
                className="text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center"
              >
                Read more
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
