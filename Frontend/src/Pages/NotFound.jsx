import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: Attempted to access", location.pathname);
    document.title = "404 | Page Not Found";
  }, [location.pathname]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">
          Oops! The page you're looking for doesn't exist.
        </p>
        <a
          href="/"
          className="inline-block px-5 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition"
        >
          Return to Home
        </a>
      </div>
    </main>
  );
};

export default NotFound;
