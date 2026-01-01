import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Authcontext = createContext();

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

 const login = (data) => {
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));

  setUser(data.user);
  setIsLogged(true);

  navigate(data.user.isAdmin ? "/admin" : "/");
};


  const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  setUser(null);
  setIsLogged(false);
  navigate("/login");
};

  return (
    <Authcontext.Provider value={{ user, isLogged, login, logout, authLoading }}>
      {children}
    </Authcontext.Provider>
  );
}

export const useAuth = () => useContext(Authcontext);
