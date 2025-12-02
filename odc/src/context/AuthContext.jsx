import { createContext, useContext, useState, useEffect } from "react";
import api from "../api";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [role, setRole] = useState(localStorage.getItem("role") || null); 
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  // Automatically attach JWT to axios
  useEffect(() => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common["Authorization"];
    }
  }, [token]);

  //-----------------------------------------
  // LOGIN: Save everything
  //-----------------------------------------
  const login = (token, role, userData) => {
    setToken(token);
    setRole(role);
    setUser(userData);

    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  //-----------------------------------------
  // LOGOUT
  //-----------------------------------------
  const logout = () => {
    setToken(null);
    setRole(null);
    setUser(null);

    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        role,
        user,
        login,
        logout,
        isAuthenticated: !!token,
        isPatient: role === "patient",
        isDoctor: role === "doctor",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
