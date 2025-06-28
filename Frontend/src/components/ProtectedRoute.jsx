import { Navigate } from 'react-router-dom';
import { isAuthenticated, isAdmin } from '../lib/auth';

// Protected route that requires authentication
export const ProtectedRoute = ({ children }) => {
  const authenticated = isAuthenticated();
  
  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Admin-only route that requires admin privileges
export const AdminRoute = ({ children }) => {
  const authenticated = isAuthenticated();
  const userIsAdmin = isAdmin();
  
  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (!userIsAdmin) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};
