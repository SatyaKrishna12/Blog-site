import { Link } from "react-router-dom";
import { Mail, ArrowLeft, Code, Briefcase, GraduationCap, Award } from "lucide-react";

export const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Home
        </Link>
      </div>

      <div className="prose prose-lg max-w-none">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">About Satya Krishna</h1>
        <p className="text-xl text-blue-600 font-medium mb-8">Full-Stack Developer | MERN Stack Enthusiast | Open to Internships</p>
        
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <GraduationCap className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-semibold text-gray-800">Who I Am</h2>
          </div>
          <p className="text-gray-700 leading-relaxed mb-6">
            I'm Satya Krishna, a passionate full-stack developer with a strong foundation in modern web technologies. 
            Currently seeking internship opportunities to apply my skills in real-world projects and contribute to 
            innovative solutions. I love creating user-centric applications that solve problems and enhance digital experiences.
          </p>
          
          <p className="text-gray-700 leading-relaxed mb-6">
            My journey in software development has been driven by curiosity and a desire to build applications 
            that make a difference. I'm particularly interested in the MERN stack and enjoy working on both 
            frontend user interfaces and backend architecture.
          </p>
          
          <div className="bg-white rounded-lg p-4">
            <p className="text-gray-600 italic text-center">
              "Code is poetry written in logic, and I'm here to create beautiful solutions." ✨
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Code className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-semibold text-gray-800">Technical Skills & Expertise</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                Frontend Development
              </h3>
              <div className="space-y-2 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">React.js & JSX</span>
                  <span className="text-blue-600 font-medium">Advanced</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">JavaScript ES6+</span>
                  <span className="text-blue-600 font-medium">Advanced</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">HTML5 & CSS3</span>
                  <span className="text-blue-600 font-medium">Expert</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tailwind CSS</span>
                  <span className="text-blue-600 font-medium">Advanced</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Responsive Design</span>
                  <span className="text-blue-600 font-medium">Expert</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                Backend Development
              </h3>
              <div className="space-y-2 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Node.js & Express</span>
                  <span className="text-purple-600 font-medium">Advanced</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">MongoDB & Mongoose</span>
                  <span className="text-purple-600 font-medium">Advanced</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">RESTful APIs</span>
                  <span className="text-purple-600 font-medium">Advanced</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">JWT Authentication</span>
                  <span className="text-purple-600 font-medium">Intermediate</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Database Design</span>
                  <span className="text-purple-600 font-medium">Intermediate</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium text-gray-800 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-600 rounded-full"></span>
              Tools & Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {['Git & GitHub', 'VS Code', 'Postman', 'npm/yarn', 'Vite', 'React Router', 'Axios', 'Lucide Icons'].map((tool) => (
                <span key={tool} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>

       

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-md p-8 text-white">
          <h2 className="text-2xl font-semibold mb-4">Ready for Your Next Intern?</h2>
          <p className="text-blue-100 mb-6">
            I'm actively seeking internship opportunities where I can contribute my skills, learn from experienced developers, 
            and grow as a professional. Let's discuss how I can add value to your team!
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              <Mail className="w-4 h-4 mr-2" />
              Let's Connect
            </Link>
            <Link
              to="/"
              className="inline-flex items-center justify-center px-6 py-3 border border-white text-white rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              View My Work
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
