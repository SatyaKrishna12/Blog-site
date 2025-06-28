import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/Card";
import { RichTextEditor } from "../../components/RichTextEditor";
import { generateSlug } from "../../lib/slug";
import { ArrowLeft, Save } from "lucide-react";
import { Link } from "react-router-dom";

export const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const generatedSlug = generateSlug(title);

  // Function to check if content contains images
  const containsImages = (htmlContent) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlContent;
    const images = tempDiv.querySelectorAll('img');
    return images.length > 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      alert("Please fill in both title and content.");
      return;
    }

    // Check if content contains images
    if (containsImages(content)) {
      alert("Images are not allowed in blog posts. Please remove any images and try again.");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const postData = {
        title: title.trim(),
        content: content,
        slug: generatedSlug
      };

      const response = await axios.post('http://localhost:5000/api/posts', postData);
      
      alert(`Post "${title}" has been created successfully!`);
      
      navigate(`/blog/${response.data.slug}`);
    } catch (error) {
      console.error('Error creating post:', error);
      
      if (error.response?.status === 400 && error.response?.data?.message?.includes('Slug already exists')) {
        alert("A post with this title already exists. Please choose a different title or modify it slightly.");
      } else {
        alert("Failed to create post. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <CardTitle>Create New Blog Post</CardTitle>
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
                <p className="text-sm text-gray-500">
                  URL will be: <code className="bg-gray-100 px-1 py-0.5 rounded">/blog/{generatedSlug}</code>
                </p>
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
                {isSubmitting ? "Creating..." : "Create Post"}
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
