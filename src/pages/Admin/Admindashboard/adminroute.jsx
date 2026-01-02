import { Navigate } from "react-router-dom";
import { useAuth } from "../../Context/authcontext";

export default function AdminRoute({ children }) {
  const { isLogged, user, authLoading } = useAuth();

  if (authLoading) return <div>Authenticating...</div>;

  if (!isLogged) return <Navigate to="/login" />;

  if (!user?.isAdmin) return <Navigate to="/" />;

  return children;
}
