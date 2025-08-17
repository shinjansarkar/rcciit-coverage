import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface AdminGuardProps {
  children: ReactNode;
}

const AdminGuard = ({ children }: AdminGuardProps) => {
  // In a real app, check if user is authenticated and has admin privileges
  // For now, we'll allow access for demo purposes
  const isAuthenticated = true; // Replace with actual auth check
  const isAdmin = true; // Replace with actual admin check

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default AdminGuard;