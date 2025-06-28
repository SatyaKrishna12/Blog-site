import { Link } from "react-router-dom";
import { Mail, ArrowLeft } from "lucide-react";

export const Contact = () => {
  return (
    <div className="max-w-2xl mx-auto px-4">
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Home
        </Link>
      </div>

      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Let's Connect</h1>
        <p className="text-lg text-gray-600">
          I'm passionate about creating meaningful digital experiences. Whether you have a project idea, 
          collaboration opportunity, or just want to say hello, I'd love to hear from you!
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <div className="mb-8">
          <Mail className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Get In Touch</h2>
          <p className="text-gray-600 mb-6">
            Ready to discuss your next project or explore opportunities? 
            Drop me a line and let's start a conversation that could lead to something amazing.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-2">📧 Reach me directly at:</p>
            <p className="text-xl font-medium text-gray-800">
              satyakrishna883@gmail.com
            </p>
          </div>
          <p className="text-sm text-gray-500 italic">
            "Great things happen when passionate minds collaborate" ✨
          </p>
        </div>

        <a
          href="mailto:satyakrishna883@gmail.com?subject=Opportunity Discussion - BlogForge Project&body=Hello Satya,%0D%0A%0D%0AI came across your BlogForge project and I'm impressed by your work! I'd love to discuss:%0D%0A%0D%0A• [Your opportunity/project/collaboration idea]%0D%0A• [What caught your attention about my work]%0D%0A• [How we can work together]%0D%0A%0D%0ALooking forward to connecting!%0D%0A%0D%0ABest regards,%0D%0A[Your Name]"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <Mail className="w-5 h-5" />
          Start a Conversation
        </a>
        
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            💼 Open to internship opportunities • 🚀 Ready for new challenges • 🎯 Focused on excellence
          </p>
        </div>
      </div>
    </div>
  );
};
