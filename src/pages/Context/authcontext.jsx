import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      setUser(JSON.parse(user));
      setIsLogged(true);
    }
    setAuthLoading(false);
  }, []);

  const login = ({ token, user }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    setIsLogged(true);
    navigate(user.isAdmin ? "/admin" : "/");
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setIsLogged(false);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, isLogged, login, logout, authLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
