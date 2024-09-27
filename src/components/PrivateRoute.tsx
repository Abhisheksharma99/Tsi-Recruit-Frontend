import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';

interface PrivateRouteProps {
  allowedRoles: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ allowedRoles }) => {
  const auth = useAppSelector((state) => state.auth);

  // If user is not authenticated, redirect to login
  if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If user's role is not allowed, redirect to unauthorized page
  if (!allowedRoles.includes(auth.user?.role ?? '')) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Render child components if user is authenticated and authorized
  return <Outlet />;
};

export default PrivateRoute;
