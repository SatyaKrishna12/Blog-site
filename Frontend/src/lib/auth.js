// Get JWT token from localStorage
export const getToken = () => localStorage.getItem("token");

// Get user object from localStorage
export const getUser = () => {
  const userStr = localStorage.getItem("user");
  return userStr ? JSON.parse(userStr) : null;
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = getToken();
  const user = getUser();
  return !!(token && user && !isTokenExpired());
};

// Check if user is admin
export const isAdmin = () => {
  const user = getUser();
  return user?.isAdmin || false;
};

// Logout and clear data
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/";
};

// Return auth header for axios/fetch
export const getAuthHeader = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Check if JWT is expired
export const isTokenExpired = () => {
  const token = getToken();
  if (!token) return true;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Date.now() / 1000;
    return payload.exp < currentTime;
  } catch (error) {
    console.error("Invalid token structure");
    return true;
  }
};
