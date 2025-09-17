import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const RouteProtection = ({ children, requiresAuth = false }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkAuthentication = () => {
      const token = localStorage.getItem('authToken');
      const userData = localStorage.getItem('userData');
      
      if (token && userData) {
        try {
          const parsedUser = JSON.parse(userData);
          if (parsedUser && parsedUser?.email) {
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem('authToken');
            localStorage.removeItem('userData');
            setIsAuthenticated(false);
          }
        } catch (error) {
          localStorage.removeItem('authToken');
          localStorage.removeItem('userData');
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
      
      setIsLoading(false);
    };

    checkAuthentication();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-muted-foreground text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (requiresAuth && !isAuthenticated) {
    return (
      <Navigate 
        to="/user-login" 
        state={{ 
          from: location?.pathname,
          message: 'Please sign in to access this page'
        }} 
        replace 
      />
    );
  }

  if (!requiresAuth && isAuthenticated && (location?.pathname === '/user-login' || location?.pathname === '/user-registration')) {
    return <Navigate to="/product-discovery-home" replace />;
  }

  return children;
};

export default RouteProtection;