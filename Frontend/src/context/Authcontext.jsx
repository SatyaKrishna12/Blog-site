import { createContext, useContext, useEffect, useState } from "react";
import { getToken, getUser, logout as clearStorage, isTokenExpired } from "../lib/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUser());
  const [token, setToken] = useState(getToken());
  const [authenticated, setAuthenticated] = useState(!!getToken() && !!getUser());

  useEffect(() => {
    if (token && isTokenExpired()) {
      handleLogout();
    }
  }, [token]);

  const handleLogin = (newToken, newUser) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
    setAuthenticated(true);
  };

  const handleLogout = () => {
    clearStorage();
    setToken(null);
    setUser(null);
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, authenticated, login: handleLogin, logout: handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
