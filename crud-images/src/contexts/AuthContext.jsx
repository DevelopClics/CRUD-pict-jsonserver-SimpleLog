import { createContext, useContext, useState, useEffect } from "react";
import {
  logout as logoutService,
  getCurrentUser,
} from "../services/authService";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  // Au montage, on récupère user depuis localStorage
  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
  }, []);

  const login = (user) => {
    setCurrentUser(user);
  };

  const logout = async () => {
    await logoutService();
    setCurrentUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
