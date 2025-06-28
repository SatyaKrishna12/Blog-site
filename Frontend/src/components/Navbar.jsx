import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/Authcontext";
import { LogOut, User } from "lucide-react";

const Navbar = () => {
  const { user, authenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const userNavLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const adminNavLinks = [
    { name: "Home", path: "/" },
    { name: "Admin Dashboard", path: "/admin" },
  ];

  const userIsAdmin = user?.isAdmin || false;
  const navLinks = userIsAdmin ? adminNavLinks : userNavLinks;

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-white border-b border-gray-200 shadow-sm flex items-center justify-between px-4 md:px-8 lg:px-16 xl:px-24 py-4 z-50">
        <Link to="/" className="flex items-center gap-2">
          <div className="text-2xl font-bold text-gray-900">MyBlog</div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <Link
              key={i}
              to={link.path}
              className="relative group text-md font-medium text-gray-700 hover:text-blue-600 transition-colors duration-300"
            >
              {link.name}
              <div className="absolute -bottom-1 left-0 h-0.5 w-0 bg-blue-600 group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          {authenticated ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
              >
                <User className="h-4 w-4" />
                {user?.username}
                <svg className="h-3 w-3 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <polyline points="6,9 12,15 18,9" />
                </svg>
              </button>

              {showUserMenu && (
                <>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </div>
                  <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="text-gray-700 hover:text-blue-600 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300">
                Login
              </Link>
              <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg">
                Sign Up
              </Link>
            </div>
          )}
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-300"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </>
            )}
          </svg>
        </button>

        {isMenuOpen && (
          <>
            <div className="fixed inset-0 bg-black/20 z-30 md:hidden" onClick={() => setIsMenuOpen(false)} />
            <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-40 md:hidden">
              <div className="px-4 py-4 space-y-2">
                {navLinks.map((link, i) => (
                  <Link
                    key={i}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-lg transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="border-t border-gray-200 pt-4 mt-4">
                  {authenticated ? (
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  ) : (
                    <div className="space-y-2">
                      <Link
                        to="/login"
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                      >
                        Login
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-4 py-3 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors duration-200 text-center"
                      >
                        Sign Up
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </nav>

      <div className="h-20"></div>
    </>
  );
};

export default Navbar;
