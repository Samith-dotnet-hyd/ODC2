import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, role }) {
  const { isAuthenticated, role: userRole } = useAuth();

  // 1️⃣ Not logged in → redirect to correct login page
  if (!isAuthenticated) {
    if (role === "doctor") return <Navigate to="/doctorlogin" replace />;
    return <Navigate to="/login" replace />; // patient login
  }

  // 2️⃣ Logged in but wrong role
  if (role && userRole !== role) return <Navigate to="/unauthorized" replace />;

  return children;
}
