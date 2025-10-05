// src/components/common/ProtectedRoute.tsx

import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface ProtectedRouteProps {
  requireAdmin?: boolean;
}

const ProtectedRoute = ({ requireAdmin = false }: ProtectedRouteProps) => {
  const { user, isAuthenticated, loading } = useAuth();

  // 1. Wait for the auth state to load
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // 2. If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // 3. If admin is required and user is not an admin, redirect to home page
  if (requireAdmin && user?.role !== 'admin') {
    // Or redirect to an "Unauthorized" page
    return <Navigate to="/" />;
  }

  // 4. If all checks pass, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;