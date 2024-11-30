import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  if (!token) {
    return <Navigate to="/" />;  // Redirect if not logged in
  }

  if (role && userRole !== role) {
    return <Navigate to="/" />;  // Redirect if role doesn't match
  }

  return children;
};

export default ProtectedRoute;