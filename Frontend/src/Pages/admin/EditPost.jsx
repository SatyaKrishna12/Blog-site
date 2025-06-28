import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { RichTextEditor } from "../../components/RichTextEditor";
import { generateSlug } from "../../lib/slug";
import { ArrowLeft, Save } from "lucide-react";

export const EditPost = () => {
  const { slug } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [originalSlug, setOriginalSlug] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const generatedSlug = generateSlug(title);
  const slugChanged = generatedSlug !== originalSlug;

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      
      try {
        const response = await axios.get(`http://localhost:5000/api/posts/${slug}`);
        const post = response.data;
        
        setTitle(post.title);
        setContent(post.content);
        setOriginalSlug(post.slug);
      } catch (error) {
        console.error('Error fetching post:', error);
        if (error.response?.status === 404) {
          alert("The post you're trying to edit doesn't exist.");
        } else {
          alert("Failed to load the post. Please try again.");
        }
        navigate("/admin");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [slug, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      alert("Please fill in both title and content.");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const postData = {
        title: title.trim(),
        content: content,
        slug: slugChanged ? generatedSlug : originalSlug,
        updatedAt: new Date().toISOString()
      };

      const response = await axios.put(`http://localhost:5000/api/posts/${originalSlug}`, postData);
      
      alert(`Post "${title}" has been updated successfully!`);
      navigate(`/blog/${response.data.slug}`);
    } catch (error) {
      console.error('Error updating post:', error);
      
      if (error.response?.status === 400 && error.response?.data?.message?.includes('Slug already exists')) {
        alert("A post with this title already exists. Please choose a different title or modify it slightly.");
      } else {
        alert("Failed to update post. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-gray-600">Loading post...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/admin">
          <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-200">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Edit Blog Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Post Title
              </label>
              <input
                id="title"
                type="text"
                placeholder="Enter your blog post title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200"
                required
              />
              {title && (
                <div className="text-sm text-gray-600">
                  <p>Current URL: <code className="bg-gray-100 px-1 py-0.5 rounded">/blog/{originalSlug}</code></p>
                  {slugChanged && (
                    <p className="text-orange-600 mt-1">
                      New URL will be: <code className="bg-orange-50 px-1 py-0.5 rounded">/blog/{generatedSlug}</code>
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                Content
              </label>
              <RichTextEditor
                value={content}
                onChange={setContent}
                placeholder="Write your blog post content here..."
              />
            </div>

            <div className="flex gap-4">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200"
              >
                <Save className="w-4 h-4" />
                {isSubmitting ? "Updating..." : "Update Post"}
              </button>
              <Link to="/admin">
                <button 
                  type="button"
                  className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-2 rounded-lg transition-colors duration-200"
                >
                  Cancel
                </button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
