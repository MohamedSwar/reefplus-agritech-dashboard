import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, accessToken, initializing } = useAuth();
  const location = useLocation();
  console.log('protected', user)
  // While checking session, don’t redirect yet
  if (initializing) {
    return <div>Loading...</div>; // You can replace with a spinner
  }

  // Authenticated case
  if (user && accessToken) {
    return <>{children}</>;
  }

  // Not authenticated → go to login
  return <Navigate to="/auth" state={{ from: location }} replace />;
};

export default ProtectedRoute;
